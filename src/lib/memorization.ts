import type {
  MasteryLevel,
  MemorizationStore,
  MemorizedVerse,
} from "@/types/memorization";

/** Clave de localStorage donde se guarda la lista y la racha. */
export const MEMORIZATION_STORAGE_KEY = "palabra-diaria:memorizar";

/** Nivel de dominio máximo alcanzable. */
export const MAX_MASTERY_LEVEL: MasteryLevel = 3;

/** Porcentaje mínimo de acierto para considerar acertado el modo Recitar. */
export const RECITE_SUCCESS_THRESHOLD = 80;

/** Estado inicial de un usuario nuevo. */
export const EMPTY_STORE: MemorizationStore = {
  verses: [],
  streak: 0,
  lastPracticeDate: null,
};

/** Etiquetas legibles de cada nivel de dominio. */
export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  0: "Nuevo",
  1: "Aprendiendo",
  2: "Casi dominado",
  3: "Dominado",
};

/** Patrón de referencia de API.Bible: LIBRO.CAPÍTULO.VERSÍCULO (ej. ROM.8.28, 1CO.10.13). */
const VERSE_ID_PATTERN = /^(?:[1-3][A-Z]{2}|[A-Z]{3})\.\d{1,3}\.\d{1,3}$/;

/** Normaliza una referencia escrita por el usuario (mayúsculas y sin espacios). */
export function normalizeVerseId(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

/** Valida el formato de una referencia de versículo (ej. "ROM.8.28"). */
export function isValidVerseId(referenceId: string): boolean {
  return VERSE_ID_PATTERN.test(referenceId);
}

/** Divide el texto bíblico en palabras, descartando espacios vacíos. */
export function tokenizeVerse(text: string): string[] {
  return text.split(/\s+/).filter((word) => word.length > 0);
}

/** Normaliza una palabra (sin tildes, mayúsculas ni signos) para comparaciones. */
export function normalizeWord(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "");
}

/** Genera un entero sin signo estable a partir de una cadena. */
function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Generador pseudoaleatorio determinista (mulberry32) a partir de una semilla. */
export function createSeededRandom(seed: string): () => number {
  let state = hashString(seed) || 1;
  return function random(): number {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let temp = Math.imul(state ^ (state >>> 15), 1 | state);
    temp = (temp + Math.imul(temp ^ (temp >>> 7), 61 | temp)) ^ temp;
    return ((temp ^ (temp >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Selecciona de forma determinista los índices de las palabras a ocultar.
 * Garantiza al menos una palabra oculta cuando la proporción es mayor que cero.
 */
export function getHiddenWordIndices(
  words: string[],
  ratio: number,
  seed: string
): number[] {
  if (words.length === 0 || ratio <= 0) {
    return [];
  }

  const targetCount =
    ratio >= 1
      ? words.length
      : Math.min(words.length, Math.max(1, Math.round(words.length * ratio)));

  const indices = words.map((_, index) => index);
  const random = createSeededRandom(seed);

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [indices[index], indices[swapIndex]] = [indices[swapIndex], indices[index]];
  }

  return indices.slice(0, targetCount).sort((a, b) => a - b);
}

/** Proporción de palabras a ocultar en el modo Completar según el dominio. */
export function getHiddenRatioForMastery(level: MasteryLevel): number {
  return Math.min(0.75, 0.3 + level * 0.15);
}

/**
 * Calcula el porcentaje de acierto (0-100) entre el texto esperado y el escrito.
 * Usa la subsecuencia común más larga sobre palabras normalizadas, por lo que
 * ignora mayúsculas, signos y es tolerante a palabras faltantes o de más.
 */
export function computeAccuracy(expected: string, given: string): number {
  const expectedWords = tokenizeVerse(expected)
    .map(normalizeWord)
    .filter(Boolean);
  const givenWords = tokenizeVerse(given).map(normalizeWord).filter(Boolean);

  if (expectedWords.length === 0 || givenWords.length === 0) {
    return 0;
  }

  const rows = expectedWords.length + 1;
  const cols = givenWords.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () =>
    new Array<number>(cols).fill(0)
  );

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      matrix[row][col] =
        expectedWords[row - 1] === givenWords[col - 1]
          ? matrix[row - 1][col - 1] + 1
          : Math.max(matrix[row - 1][col], matrix[row][col - 1]);
    }
  }

  const longest = matrix[rows - 1][cols - 1];
  return Math.round((2 * longest) / (expectedWords.length + givenWords.length) * 100);
}

/** Fecha de hoy en formato ISO corto (UTC). */
export function getDateKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** Diferencia en días completos entre dos claves ISO cortas. */
function daysBetween(fromKey: string, toKey: string): number {
  const from = Date.parse(`${fromKey}T00:00:00Z`);
  const to = Date.parse(`${toKey}T00:00:00Z`);

  if (Number.isNaN(from) || Number.isNaN(to)) {
    return Number.NaN;
  }

  return Math.round((to - from) / 86400000);
}

/** Indica si ya se practicó hoy. */
export function hasPracticedToday(
  store: MemorizationStore,
  date: Date = new Date()
): boolean {
  return store.lastPracticeDate === getDateKey(date);
}

/**
 * Registra una práctica de un versículo.
 * - Actualiza la racha según los días consecutivos.
 * - Si `mastered` es verdadero, sube el nivel de dominio (máximo 3).
 */
export function recordPractice(
  store: MemorizationStore,
  verseId: string,
  options: { mastered: boolean },
  now: Date = new Date()
): MemorizationStore {
  const today = getDateKey(now);
  const alreadyToday = store.lastPracticeDate === today;

  let streak = store.streak;
  if (!alreadyToday) {
    const gap = store.lastPracticeDate
      ? daysBetween(store.lastPracticeDate, today)
      : Number.POSITIVE_INFINITY;
    streak = gap === 1 ? store.streak + 1 : 1;
  }

  const verses = store.verses.map((verse) => {
    if (verse.id !== verseId) {
      return verse;
    }

    const nextLevel = options.mastered
      ? (Math.min(MAX_MASTERY_LEVEL, verse.masteryLevel + 1) as MasteryLevel)
      : verse.masteryLevel;

    return {
      ...verse,
      masteryLevel: nextLevel,
      lastPracticedAt: now.toISOString(),
    };
  });

  return { verses, streak, lastPracticeDate: today };
}

/** Comprueba que un objeto tenga la forma de un versículo memorizado. */
function isMemorizedVerse(value: unknown): value is MemorizedVerse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<MemorizedVerse>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.reference === "string" &&
    typeof candidate.text === "string"
  );
}

/** Normaliza un versículo leído de localStorage. */
function sanitizeVerse(verse: MemorizedVerse): MemorizedVerse {
  const level = Math.min(
    MAX_MASTERY_LEVEL,
    Math.max(0, Math.floor(Number(verse.masteryLevel) || 0))
  ) as MasteryLevel;

  return {
    id: verse.id,
    reference: verse.reference,
    text: verse.text,
    startedAt:
      typeof verse.startedAt === "string"
        ? verse.startedAt
        : new Date().toISOString(),
    masteryLevel: level,
    lastPracticedAt:
      typeof verse.lastPracticedAt === "string" ? verse.lastPracticedAt : null,
  };
}

/** Valida y normaliza el estado leído de localStorage. */
export function parseStore(raw: string): MemorizationStore {
  try {
    const parsed = JSON.parse(raw) as Partial<MemorizationStore>;

    const verses = Array.isArray(parsed.verses)
      ? parsed.verses.filter(isMemorizedVerse).map(sanitizeVerse)
      : [];

    const streak =
      typeof parsed.streak === "number" && Number.isFinite(parsed.streak)
        ? Math.max(0, Math.floor(parsed.streak))
        : 0;

    return {
      verses,
      streak,
      lastPracticeDate:
        typeof parsed.lastPracticeDate === "string"
          ? parsed.lastPracticeDate
          : null,
    };
  } catch {
    return EMPTY_STORE;
  }
}

/** Formatea una fecha ISO en un texto corto en español (ej. "14 nov 2026"). */
export function formatShortDate(isoDate: string | null): string {
  if (!isoDate) {
    return "Sin practicar";
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "Sin practicar";
  }

  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
