"use client";

import { Gauge } from "lucide-react";
import type { MemorizationLevelValue } from "@/types/memorization";
import { MEMORIZATION_LEVELS, getLevelInfo } from "@/lib/memorization";

interface MemorizationLevelSelectorProps {
  current: MemorizationLevelValue;
  onChange: (level: MemorizationLevelValue) => void;
}

export function MemorizationLevelSelector({
  current,
  onChange,
}: MemorizationLevelSelectorProps) {
  const activeLevel = getLevelInfo(current);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          <Gauge className="h-4 w-4" aria-hidden="true" />
          <span>Nivel</span>
        </span>
        <span className="text-xs font-medium text-amber-800 dark:text-amber-400">
          {activeLevel.label}
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Nivel de dificultad"
        className="grid grid-cols-4 gap-1.5"
      >
        {MEMORIZATION_LEVELS.map((level) => {
          const isActive = level.value === current;

          return (
            <button
              key={level.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`Nivel ${level.value}: ${level.label}`}
              onClick={() => onChange(level.value)}
              className={`min-h-[44px] rounded-xl border text-sm font-bold transition-all active:scale-95 ${
                isActive
                  ? "border-amber-700 bg-amber-100 text-amber-900 dark:border-amber-500 dark:bg-amber-950/60 dark:text-amber-300"
                  : "border-stone-200 bg-white text-stone-500 hover:border-amber-600/60 hover:text-stone-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-amber-500/60"
              }`}
            >
              {level.value}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-stone-500 dark:text-stone-400">
        {activeLevel.description}
      </p>
    </div>
  );
}
