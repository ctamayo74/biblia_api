"use client";

import { BookOpenCheck, Trash2 } from "lucide-react";
import {
  MASTERY_LABELS,
  MAX_MASTERY_LEVEL,
  formatShortDate,
} from "@/lib/memorization";
import type { MemorizedVerse } from "@/types/memorization";

interface VerseListProps {
  verses: MemorizedVerse[];
  selectedId: string | null;
  onSelect: (verseId: string) => void;
  onRemove: (verseId: string) => void;
}

/** Puntos que representan visualmente el nivel de dominio (0-3). */
function MasteryDots({ level }: { level: number }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      aria-label={`Nivel de dominio ${level} de ${MAX_MASTERY_LEVEL}`}
    >
      {Array.from({ length: MAX_MASTERY_LEVEL }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 rounded-full ${
            index < level
              ? "bg-amber-600 dark:bg-amber-400"
              : "bg-stone-300 dark:bg-stone-700"
          }`}
        />
      ))}
    </span>
  );
}

/** Lista de versículos en memorización con su nivel de dominio y última práctica. */
export function VerseList({
  verses,
  selectedId,
  onSelect,
  onRemove,
}: VerseListProps) {
  if (verses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 p-6 text-center dark:border-stone-700">
        <BookOpenCheck
          className="mx-auto h-8 w-8 text-stone-400 dark:text-stone-600"
          aria-hidden="true"
        />
        <p className="mt-2 text-sm font-semibold text-stone-700 dark:text-stone-300">
          Tu lista está vacía
        </p>
        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
          Agrega un versículo por referencia o usa el botón «Memorizar» del inicio.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2" aria-label="Versículos en memorización">
      {verses.map((verse) => {
        const isSelected = verse.id === selectedId;

        return (
          <li key={verse.id}>
            <div
              className={`group flex items-center gap-2 rounded-2xl border p-3 transition-colors ${
                isSelected
                  ? "border-amber-600 bg-amber-50/70 dark:border-amber-500 dark:bg-amber-950/30"
                  : "border-stone-200 bg-white hover:border-amber-600/50 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(verse.id)}
                aria-current={isSelected ? "true" : undefined}
                className="flex min-h-[44px] flex-1 flex-col items-start gap-1 text-left"
              >
                <span className="font-serif text-sm font-bold text-stone-900 dark:text-stone-100">
                  {verse.reference}
                </span>
                <span className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                  <MasteryDots level={verse.masteryLevel} />
                  <span>{MASTERY_LABELS[verse.masteryLevel]}</span>
                </span>
                <span className="text-[11px] text-stone-400 dark:text-stone-500">
                  Última práctica: {formatShortDate(verse.lastPracticedAt)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onRemove(verse.id)}
                aria-label={`Quitar ${verse.reference} de la lista`}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-stone-400 transition-colors hover:bg-rose-50 hover:text-rose-600 active:scale-95 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
