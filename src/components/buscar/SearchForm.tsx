"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Loader2,
  Search,
  SearchX,
  Sparkles,
} from "lucide-react";
import type { SearchResult, SearchVerseMatch } from "@/types/bible";
import { SearchResultItem } from "@/components/buscar/SearchResultItem";

interface SearchFormProps {
  bibleId: string;
}

type SearchStatus = "idle" | "loading" | "success" | "empty" | "error";

/** Retardo del debounce antes de consultar la API (ms). */
const DEBOUNCE_MS = 400;

/** Longitud mínima de la consulta para buscar. */
const MIN_QUERY_LENGTH = 2;

/**
 * Formulario de búsqueda con debounce de 400 ms.
 *
 * Cada cambio de consulta reinicia un temporizador y cancela la petición
 * anterior con `AbortController` para evitar resultados obsoletos.
 */
export function SearchForm({ bibleId }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchVerseMatch[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const term = query.trim();

    if (term.length < MIN_QUERY_LENGTH) {
      /* eslint-disable react-hooks/set-state-in-effect -- reinicio de la búsqueda al vaciar la consulta */
      setResults([]);
      setStatus("idle");
      setErrorMessage(null);
      /* eslint-enable react-hooks/set-state-in-effect */
      return;
    }

    const controller = new AbortController();

    // Estado "buscando…" al iniciar la consulta
    setStatus("loading");
    setErrorMessage(null);

    const handle = window.setTimeout(() => {
      void (async () => {
        try {
          const response = await fetch(
            `/api/search?bibleId=${encodeURIComponent(bibleId)}&q=${encodeURIComponent(term)}`,
            { signal: controller.signal }
          );
          const json = (await response.json()) as {
            data?: SearchResult;
            error?: string;
          };

          if (!response.ok || !json.data) {
            throw new Error(json.error || "No se pudo completar la búsqueda.");
          }

          const verses = json.data.verses ?? [];
          setResults(verses);
          setStatus(verses.length === 0 ? "empty" : "success");
        } catch (caught) {
          if (caught instanceof Error && caught.name === "AbortError") {
            return;
          }
          setErrorMessage(
            caught instanceof Error
              ? caught.message
              : "Ocurrió un error inesperado. Inténtalo de nuevo."
          );
          setStatus("error");
        }
      })();
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(handle);
      controller.abort();
    };
  }, [query, bibleId]);

  const trimmedQuery = query.trim();

  return (
    <div className="flex flex-col gap-6">
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-2"
      >
        <label
          htmlFor="search-input"
          className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400"
        >
          Buscar en la Biblia
        </label>

        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-stone-500"
            aria-hidden="true"
          />
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej. amor, esperanza, salmo 23…"
            autoComplete="off"
            spellCheck={false}
            aria-describedby="search-hint"
            className="min-h-[44px] w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-10 text-sm text-stone-800 shadow-2xs transition-colors placeholder:text-stone-400 hover:border-amber-600/60 focus:border-amber-600 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:placeholder:text-stone-600 dark:hover:border-amber-500/60"
          />
          {status === "loading" && (
            <Loader2
              className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
          )}
        </div>

        <p id="search-hint" className="text-xs text-stone-500 dark:text-stone-400">
          Escribe al menos {MIN_QUERY_LENGTH} letras. La búsqueda se actualiza
          automáticamente.
        </p>
      </form>

      <section
        aria-live="polite"
        aria-busy={status === "loading"}
        className="min-h-[140px]"
      >
        {status === "idle" && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
            <Sparkles
              className="h-8 w-8 text-stone-400 dark:text-stone-600"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
              {trimmedQuery.length > 0
                ? `Sigue escribiendo (mínimo ${MIN_QUERY_LENGTH} letras)`
                : "Busca una palabra o frase"}
            </p>
            <p className="mt-1 max-w-sm text-xs text-stone-500 dark:text-stone-400">
              Encontrarás el versículo y podrás ir al capítulo o memorizarlo.
            </p>
          </div>
        )}

        {status === "loading" && (
          <div
            role="status"
            className="flex items-center justify-center gap-3 rounded-2xl border border-stone-200/90 bg-stone-100/60 p-8 text-sm font-medium text-stone-600 dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-300"
          >
            <Loader2
              className="h-5 w-5 animate-spin text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
            Buscando…
          </div>
        )}

        {status === "empty" && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
            <SearchX
              className="h-8 w-8 text-stone-400 dark:text-stone-600"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
              Sin resultados para «{trimmedQuery}»
            </p>
            <p className="mt-1 max-w-sm text-xs text-stone-500 dark:text-stone-400">
              Prueba con otra palabra o revisa la ortografía.
            </p>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">No se pudo completar la búsqueda</p>
              <p className="mt-0.5 text-xs">{errorMessage}</p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              {results.length} {results.length === 1 ? "resultado" : "resultados"}
            </p>
            <ul className="flex flex-col gap-3" aria-label="Resultados de búsqueda">
              {results.map((verse) => (
                <SearchResultItem key={verse.id} verse={verse} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
