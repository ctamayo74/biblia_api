import { Trophy } from "lucide-react";

interface ProgressBarProps {
  /** Días completados. */
  completed: number;
  /** Total de días del plan. */
  total: number;
  /** Porcentaje de progreso (0-100). */
  percent: number;
  /** Indica si ya se cargó el progreso desde localStorage. */
  isLoaded?: boolean;
}

/** Barra de progreso global del plan de discipulado. */
export function ProgressBar({
  completed,
  total,
  percent,
  isLoaded = true,
}: ProgressBarProps) {
  const isComplete = completed >= total;

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-200">
          {isComplete && (
            <Trophy
              className="h-4 w-4 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
          )}
          Tu progreso
        </span>
        <span
          className="text-sm font-bold text-amber-700 dark:text-amber-400"
          aria-hidden={!isLoaded}
        >
          {completed} de {total} días
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso del plan de discipulado"
        className="h-2.5 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isComplete
              ? "bg-emerald-500 dark:bg-emerald-400"
              : "bg-amber-600 dark:bg-amber-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {isComplete && (
        <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
          ¡Completaste el plan de 7 días! Sigue creciendo cada día.
        </p>
      )}
    </div>
  );
}
