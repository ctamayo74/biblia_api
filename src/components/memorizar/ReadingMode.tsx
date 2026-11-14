"use client";

import { BookOpenCheck, Check } from "lucide-react";

interface ReadingModeProps {
  text: string;
  onPracticed: () => void;
}

/** Modo Leer: muestra el versículo completo para repasarlo. */
export function ReadingMode({ text, onPracticed }: ReadingModeProps) {
  return (
    <div className="flex flex-col gap-5">
      <blockquote className="rounded-2xl border border-stone-200 bg-stone-100/60 p-5 font-serif text-lg leading-loose text-stone-900 sm:text-xl dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-100">
        &ldquo;{text.trim()}&rdquo;
      </blockquote>

      <p className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
        <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
        Lee el versículo en voz alta un par de veces antes de practicar.
      </p>

      <button
        type="button"
        onClick={onPracticed}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
      >
        <Check className="h-4 w-4" aria-hidden="true" />
        Marcar como practicado
      </button>
    </div>
  );
}
