"use client";

import { Flame } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
  practicedToday: boolean;
}

/** Contador visible de la racha de días consecutivos. */
export function StreakBadge({ streak, practicedToday }: StreakBadgeProps) {
  return (
    <div
      role="status"
      aria-label={`Racha de ${streak} días consecutivos`}
      className="flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 dark:border-amber-900/60 dark:bg-amber-950/30"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-400">
        <Flame className="h-6 w-6" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="font-serif text-2xl font-bold leading-none text-stone-900 dark:text-stone-100">
          {streak}
        </p>
        <p className="mt-1 text-xs font-medium text-stone-600 dark:text-stone-400">
          {streak === 1 ? "día de racha" : "días de racha"}
          {practicedToday ? " · ¡ya practicaste hoy!" : " · practica hoy para mantenerla"}
        </p>
      </div>
    </div>
  );
}
