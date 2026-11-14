"use client";

import { Loader2, Search } from "lucide-react";
import { CURATED_VERSES } from "@/data/verses";
import type { VerseCategory } from "@/data/verses";

interface VersePickerProps {
  currentVerseId: string;
  onSelect: (verseId: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const CATEGORY_LABELS: Record<VerseCategory, string> = {
  evangelio: "Evangelio",
  crecimiento: "Crecimiento",
  memorizar: "Para memorizar",
};

const CATEGORY_ORDER: VerseCategory[] = ["memorizar", "evangelio", "crecimiento"];

export function VersePicker({
  currentVerseId,
  onSelect,
  disabled = false,
  isLoading = false,
}: VersePickerProps) {
  const isCurated = CURATED_VERSES.some((verse) => verse.id === currentVerseId);

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="memorizar-verse-select"
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span>Versículo</span>
      </label>

      <div className="relative inline-flex items-center">
        <select
          id="memorizar-verse-select"
          value={currentVerseId}
          disabled={disabled || isLoading}
          onChange={(event) => onSelect(event.target.value)}
          className="min-h-[44px] w-full appearance-none rounded-xl border border-stone-300 bg-white py-2 pl-3.5 pr-9 text-sm font-medium text-stone-800 shadow-2xs transition-colors hover:border-amber-600 focus:border-amber-600 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-500"
        >
          {!isCurated && (
            <option value={currentVerseId}>{currentVerseId}</option>
          )}

          {CATEGORY_ORDER.map((category) => (
            <optgroup key={category} label={CATEGORY_LABELS[category]}>
              {CURATED_VERSES.filter((verse) => verse.category === category).map(
                (verse) => (
                  <option key={verse.id} value={verse.id}>
                    {verse.referenceName}
                  </option>
                )
              )}
            </optgroup>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 flex items-center text-stone-400">
          {isLoading ? (
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
