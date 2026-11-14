"use client";

import { DayCheckbox } from "@/components/discipulado/DayCheckbox";
import { useDiscipleshipProgress } from "@/hooks/useDiscipleshipProgress";

interface DayCompletionProps {
  /** Número del día a completar. */
  day: number;
}

/** Marca de completado de un día concreto, persistida en localStorage. */
export function DayCompletion({ day }: DayCompletionProps) {
  const { isCompleted, toggleDay, isLoaded, completedCount, total } =
    useDiscipleshipProgress();
  const checked = isCompleted(day);

  return (
    <section
      aria-label={`Progreso del día ${day}`}
      className="flex flex-col gap-3 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between dark:border-stone-800 dark:bg-stone-900"
    >
      <div className="min-w-0">
        <p className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
          {checked ? "¡Día completado!" : "¿Terminaste este día?"}
        </p>
        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
          {completedCount} de {total} días completados
        </p>
      </div>

      <DayCheckbox
        day={day}
        checked={checked}
        disabled={!isLoaded}
        onToggle={() => toggleDay(day)}
      />
    </section>
  );
}
