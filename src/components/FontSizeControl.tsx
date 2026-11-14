"use client";

import { Minus, Plus, Type } from "lucide-react";

export type FontSizeLevel = "sm" | "md" | "lg" | "xl";

interface FontSizeControlProps {
  currentSize: FontSizeLevel;
  onChange: (size: FontSizeLevel) => void;
}

const SIZE_LEVELS: FontSizeLevel[] = ["sm", "md", "lg", "xl"];

export function FontSizeControl({ currentSize, onChange }: FontSizeControlProps) {
  const currentIndex = SIZE_LEVELS.indexOf(currentSize);

  function handleDecrease() {
    if (currentIndex > 0) {
      onChange(SIZE_LEVELS[currentIndex - 1]);
    }
  }

  function handleIncrease() {
    if (currentIndex < SIZE_LEVELS.length - 1) {
      onChange(SIZE_LEVELS[currentIndex + 1]);
    }
  }

  return (
    <div
      role="group"
      aria-label="Controles de tamaño de texto"
      className="inline-flex items-center rounded-xl border border-stone-200 bg-white p-1 shadow-2xs dark:border-stone-800 dark:bg-stone-900"
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={currentIndex === 0}
        aria-label="Disminuir tamaño de letra"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-stone-300 dark:hover:bg-stone-800"
      >
        <span className="font-serif text-xs font-bold">A-</span>
      </button>

      <div className="flex h-6 items-center px-1 text-stone-300 dark:text-stone-700">
        <span className="h-4 w-px bg-current" />
      </div>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={currentIndex === SIZE_LEVELS.length - 1}
        aria-label="Aumentar tamaño de letra"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-stone-300 dark:hover:bg-stone-800"
      >
        <span className="font-serif text-base font-bold">A+</span>
      </button>
    </div>
  );
}
