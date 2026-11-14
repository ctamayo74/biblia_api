"use client";

import { ListOrdered, PenLine, TextCursorInput } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MemorizationMode } from "@/types/memorization";
import { MEMORIZATION_MODES } from "@/lib/memorization";

interface MemorizationModeSelectorProps {
  current: MemorizationMode;
  onChange: (mode: MemorizationMode) => void;
}

const MODE_ICONS: Record<MemorizationMode, LucideIcon> = {
  completar: TextCursorInput,
  ordenar: ListOrdered,
  escribir: PenLine,
};

export function MemorizationModeSelector({
  current,
  onChange,
}: MemorizationModeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Modos de práctica"
      className="grid grid-cols-3 gap-2"
    >
      {MEMORIZATION_MODES.map((mode) => {
        const Icon = MODE_ICONS[mode.value];
        const isActive = mode.value === current;

        return (
          <button
            key={mode.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(mode.value)}
            className={`flex min-h-[44px] flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-all active:scale-95 ${
              isActive
                ? "border-amber-700 bg-amber-700 text-stone-50 shadow-xs dark:border-amber-500 dark:bg-amber-600 dark:text-stone-950"
                : "border-stone-200 bg-white text-stone-600 hover:border-amber-600/60 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-500/60"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-semibold">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
