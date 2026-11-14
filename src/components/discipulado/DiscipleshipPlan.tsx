"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DISCIPLESHIP_PLAN } from "@/data/plan-discipulado";
import { useDiscipleshipProgress } from "@/hooks/useDiscipleshipProgress";
import { ProgressBar } from "@/components/discipulado/ProgressBar";
import { DayCheckbox } from "@/components/discipulado/DayCheckbox";

/** Lista de los 7 días del plan con su progreso y marca de completado. */
export function DiscipleshipPlan() {
  const { isCompleted, toggleDay, isLoaded, completedCount, total, percent } =
    useDiscipleshipProgress();

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar
        completed={completedCount}
        total={total}
        percent={percent}
        isLoaded={isLoaded}
      />

      <ol className="flex flex-col gap-3" aria-label="Días del plan de discipulado">
        {DISCIPLESHIP_PLAN.map((day) => {
          const checked = isCompleted(day.day);

          return (
            <li key={day.day}>
              <div
                className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
                  checked
                    ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20"
                    : "border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 font-serif text-lg font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-400"
                >
                  {day.day}
                </span>

                <Link
                  href={`/discipulado/${day.day}`}
                  className="flex min-h-[44px] min-w-0 flex-1 items-center justify-between gap-2"
                >
                  <span className="min-w-0">
                    <span className="block font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                      {day.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-stone-500 dark:text-stone-400">
                      {day.reference}
                    </span>
                  </span>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-stone-400"
                    aria-hidden="true"
                  />
                </Link>

                <DayCheckbox
                  day={day.day}
                  checked={checked}
                  disabled={!isLoaded}
                  onToggle={() => toggleDay(day.day)}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
