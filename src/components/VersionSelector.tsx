"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BookMarked, Loader2 } from "lucide-react";
import type { Bible } from "@/types/bible";

interface VersionSelectorProps {
  currentBibleId: string;
}

const STORAGE_KEY = "biblia_version";

export function VersionSelector({ currentBibleId }: VersionSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [bibles, setBibles] = useState<Bible[]>([]);
  const [selectedBibleId, setSelectedBibleId] = useState<string>(currentBibleId);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cargar lista de versiones desde el endpoint proxy /api/bibles
  useEffect(() => {
    let isMounted = true;

    async function loadBibles() {
      try {
        const response = await fetch("/api/bibles?language=spa");
        if (!response.ok) {
          throw new Error("Error al obtener versiones");
        }
        const json = await response.json();
        if (isMounted && json.data) {
          setBibles(json.data);
        }
      } catch (error) {
        console.error("No se pudieron cargar las versiones bíblicas:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBibles();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sincronizar con localStorage en el montaje inicial
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const queryBibleId = searchParams.get("bibleId");

    if (queryBibleId) {
      setSelectedBibleId(queryBibleId);
      localStorage.setItem(STORAGE_KEY, queryBibleId);
    } else if (saved && saved !== currentBibleId) {
      setSelectedBibleId(saved);
      // Aplicar a la URL si no estaba presente
      const params = new URLSearchParams(searchParams.toString());
      params.set("bibleId", saved);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [currentBibleId, pathname, router, searchParams]);

  function handleVersionChange(newId: string) {
    if (!newId || newId === selectedBibleId) return;

    setSelectedBibleId(newId);
    localStorage.setItem(STORAGE_KEY, newId);

    const params = new URLSearchParams(searchParams.toString());
    params.set("bibleId", newId);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
      <label
        htmlFor="bible-version-select"
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400"
      >
        <BookMarked className="h-4 w-4" aria-hidden="true" />
        <span>Traducción</span>
      </label>

      <div className="relative inline-flex items-center">
        <select
          id="bible-version-select"
          value={selectedBibleId}
          disabled={isLoading || isPending}
          onChange={(e) => handleVersionChange(e.target.value)}
          className="min-h-[44px] w-full appearance-none rounded-xl border border-stone-300 bg-white py-2 pl-3.5 pr-9 text-sm font-medium text-stone-800 shadow-2xs transition-colors hover:border-amber-600 focus:border-amber-600 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-500 sm:w-auto"
        >
          {bibles.length > 0 ? (
            bibles.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.abbreviation || "Biblia"})
              </option>
            ))
          ) : (
            <option value={currentBibleId}>
              {isLoading ? "Cargando versiones..." : "Versión Predeterminada"}
            </option>
          )}
        </select>

        <div className="pointer-events-none absolute right-3 flex items-center text-stone-400">
          {isLoading || isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-amber-700 dark:text-amber-400" />
          ) : (
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
