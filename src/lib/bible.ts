import "server-only";
import type {
  Bible,
  Book,
  Chapter,
  Passage,
  Verse,
  SearchResult,
  BibleApiResponse,
} from "@/types/bible";

/**
 * Obtiene la configuración de API.Bible desde las variables de entorno.
 * Lanza un error descriptivo si falta la clave secreta en el servidor.
 */
function getApiConfig(): { apiKey: string; baseUrl: string } {
  const rawApiKey = process.env.BIBLE_API_KEY;
  const rawBaseUrl = process.env.BIBLE_API_BASE_URL || "https://rest.api.bible/v1";

  const apiKey = rawApiKey?.trim();
  let baseUrl = rawBaseUrl.trim().replace(/\/+$/, "");

  // Auto-corrección por si se ingresó /v.1 con punto por error
  baseUrl = baseUrl.replace(/\/v\.1\b/, "/v1");

  if (!apiKey) {
    throw new Error(
      "Configuración incompleta: La variable de entorno BIBLE_API_KEY no está definida en el servidor."
    );
  }

  return { apiKey, baseUrl };
}

/**
 * Cliente HTTP base para realizar peticiones autenticadas a API.Bible.
 */
async function fetchBibleApi<T>(
  endpoint: string,
  searchParams?: Record<string, string | boolean | undefined>,
  revalidateSeconds = 86400 // Cache de 24 horas por defecto (el texto bíblico no cambia)
): Promise<T> {
  const { apiKey, baseUrl } = getApiConfig();

  const url = new URL(`${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "api-key": apiKey,
      Accept: "application/json",
    },
    next: {
      revalidate: revalidateSeconds,
    },
  });

  if (!response.ok) {
    let errorDetail = response.statusText;
    try {
      const errorJson = await response.json();
      errorDetail =
        errorJson.message ||
        errorJson.error ||
        JSON.stringify(errorJson) ||
        errorDetail;
    } catch {
      // Si la respuesta de error no es JSON, conservar statusText
    }

    throw new Error(
      `Error al consultar API.Bible [${response.status} ${response.statusText}] para ${url.pathname}: ${errorDetail}`
    );
  }

  const json = (await response.json()) as BibleApiResponse<T>;
  return json.data;
}

/**
 * Obtiene el catálogo de Biblias disponibles filtradas por idioma (por defecto español "spa").
 */
export async function getBibles(language = "spa"): Promise<Bible[]> {
  return fetchBibleApi<Bible[]>("/bibles", {
    language,
  });
}

/**
 * Obtiene la lista de libros de una traducción bíblica específica.
 */
export async function getBooks(bibleId: string): Promise<Book[]> {
  if (!bibleId.trim()) {
    throw new Error("El parámetro 'bibleId' es obligatorio.");
  }
  return fetchBibleApi<Book[]>(`/bibles/${encodeURIComponent(bibleId)}/books`, {
    "include-chapters": true,
  });
}

/**
 * Obtiene el contenido de un capítulo con texto limpio.
 */
export async function getChapter(
  bibleId: string,
  chapterId: string
): Promise<Chapter> {
  if (!bibleId.trim() || !chapterId.trim()) {
    throw new Error("Los parámetros 'bibleId' y 'chapterId' son obligatorios.");
  }

  return fetchBibleApi<Chapter>(
    `/bibles/${encodeURIComponent(bibleId)}/chapters/${encodeURIComponent(chapterId)}`,
    {
      "content-type": "text",
      "include-verse-numbers": false,
      "include-notes": false,
    }
  );
}

/**
 * Obtiene un pasaje bíblico continuo (ej. Juan 3:16-17) con texto limpio.
 */
export async function getPassage(
  bibleId: string,
  passageId: string
): Promise<Passage> {
  if (!bibleId.trim() || !passageId.trim()) {
    throw new Error("Los parámetros 'bibleId' y 'passageId' son obligatorios.");
  }

  return fetchBibleApi<Passage>(
    `/bibles/${encodeURIComponent(bibleId)}/passages/${encodeURIComponent(passageId)}`,
    {
      "content-type": "text",
      "include-verse-numbers": false,
      "include-notes": false,
    }
  );
}

/**
 * Obtiene un versículo individual específico con texto limpio.
 */
export async function getVerse(
  bibleId: string,
  verseId: string
): Promise<Verse> {
  if (!bibleId.trim() || !verseId.trim()) {
    throw new Error("Los parámetros 'bibleId' y 'verseId' son obligatorios.");
  }

  return fetchBibleApi<Verse>(
    `/bibles/${encodeURIComponent(bibleId)}/verses/${encodeURIComponent(verseId)}`,
    {
      "content-type": "text",
      "include-verse-numbers": false,
      "include-notes": false,
    }
  );
}

/**
 * Realiza una búsqueda de concordancias o palabras en una versión bíblica.
 */
export async function searchBible(
  bibleId: string,
  query: string
): Promise<SearchResult> {
  if (!bibleId.trim() || !query.trim()) {
    throw new Error("Los parámetros 'bibleId' y 'query' son obligatorios.");
  }

  return fetchBibleApi<SearchResult>(
    `/bibles/${encodeURIComponent(bibleId)}/search`,
    {
      query: query.trim(),
    },
    3600 // Búsquedas con cache de 1 hora
  );
}
