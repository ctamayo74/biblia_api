"use client";

import { Flame, Trophy, Target } from "lucide-react";

interface MemorizationStreakProps {
  streak: number;
  bestStreak: number;
  masteredCount: number;
  practicedToday: boolean;
}

export function MemorizationStreak({
  streak,
  bestStreak,
  masteredCount,
  practicedToday,
}: MemorizationStreakProps) {
  return (
    <section
      aria-label="Tu progreso de memorización"
      className="grid grid-cols-3 gap-2 sm:gap-3"
    >
      <div className="flex flex-col items-center rounded-2xl border border-amber-200/80 bg-amber-50/70 p-3 text-center dark:border-amber-900/60 dark:bg-amber-950/30">
        <Flame
          className={`h-5 w-5 ${streak > 0 ? "text-amber-600 dark:text-amber-400" : "text-stone-400 dark:text-stone-600"}`}
          aria-hidden="true"
        />
        <span className="mt-1 font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
          {streak}
        </span>
        <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
          {streak === 1 ? "día de racha" : "días de racha"}
        </span>
      </div>

      <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-3 text-center dark:border-stone-800 dark:bg-stone-900">
        <Trophy className="h-5 w-5 text-amber-700 dark:text-amber-500" aria-hidden="true" />
        <span className="mt-1 font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
          {bestStreak}
        </span>
        <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
          mejor racha
        </span>
      </div>

      <div className="flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-3 text-center dark:border-stone-800 dark:bg-stone-900">
        <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <span className="mt-1 font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
          {masteredCount}
        </span>
        <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
          versículos logrados
        </span>
      </div>

      <p className="col-span-3 text-center text-xs text-stone-500 dark:text-stone-400">
        {practicedToday
          ? "¡Ya practicaste hoy! Tu racha está a salvo."
          : "Completa una práctica hoy para mantener tu racha."}
      </p>
    </section>
  );
}
