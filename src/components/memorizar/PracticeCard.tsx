"use client";

import { useState } from "react";
import { BookOpen, PenLine, TextCursorInput } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  MASTERY_LABELS,
  MAX_MASTERY_LEVEL,
  formatShortDate,
} from "@/lib/memorization";
import type { MemorizationMode, MemorizedVerse } from "@/types/memorization";
import { ReadingMode } from "@/components/memorizar/ReadingMode";
import { FillBlankMode } from "@/components/memorizar/FillBlankMode";
import { ReciteMode } from "@/components/memorizar/ReciteMode";

interface PracticeCardProps {
  verse: MemorizedVerse;
  onPractice: (options: { mastered: boolean }) => void;
}

interface ModeOption {
  value: MemorizationMode;
  label: string;
  icon: LucideIcon;
}

const MODE_OPTIONS: ModeOption[] = [
  { value: "leer", label: "Leer", icon: BookOpen },
  { value: "completar", label: "Completar", icon: TextCursorInput },
  { value: "recitar", label: "Recitar", icon: PenLine },
];

/** Tarjeta de práctica de un versículo con sus tres modos. */
export function PracticeCard({ verse, onPractice }: PracticeCardProps) {
  const [mode, setMode] = useState<MemorizationMode>("leer");

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-stone-200/90 bg-white p-5 shadow-xs sm:p-6 dark:border-stone-800 dark:bg-stone-900">
      {/* Encabezado del versículo */}
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-200/80 pb-4 dark:border-stone-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Práctica
          </span>
          <h2 className="mt-0.5 font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            {verse.reference}
          </h2>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Última práctica: {formatShortDate(verse.lastPracticedAt)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            {MASTERY_LABELS[verse.masteryLevel]} · {verse.masteryLevel}/
            {MAX_MASTERY_LEVEL}
          </span>
          <span className="inline-flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: MAX_MASTERY_LEVEL }).map((_, index) => (
              <span
                key={index}
                className={`h-2 w-6 rounded-full ${
                  index < verse.masteryLevel
                    ? "bg-amber-600 dark:bg-amber-400"
                    : "bg-stone-200 dark:bg-stone-700"
                }`}
              />
            ))}
          </span>
        </div>
      </header>

      {/* Selector de modo */}
      <div
        role="radiogroup"
        aria-label="Modos de práctica"
        className="grid grid-cols-3 gap-2"
      >
        {MODE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isActive = option.value === mode;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setMode(option.value)}
              className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-all active:scale-95 ${
                isActive
                  ? "border-amber-700 bg-amber-700 text-stone-50 shadow-xs dark:border-amber-500 dark:bg-amber-600 dark:text-stone-950"
                  : "border-stone-200 bg-white text-stone-600 hover:border-amber-600/60 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-500/60"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs font-semibold">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido del modo activo */}
      <div className="border-t border-stone-200/80 pt-5 dark:border-stone-800">
        {mode === "leer" && (
          <ReadingMode
            text={verse.text}
            onPracticed={() => onPractice({ mastered: false })}
          />
        )}

        {mode === "completar" && (
          <FillBlankMode
            verseId={verse.id}
            text={verse.text}
            masteryLevel={verse.masteryLevel}
            onSuccess={() => onPractice({ mastered: true })}
          />
        )}

        {mode === "recitar" && (
          <ReciteMode
            text={verse.text}
            onSuccess={() => onPractice({ mastered: true })}
          />
        )}
      </div>
    </section>
  );
}
