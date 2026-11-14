interface ProgressIndicatorProps {
  /** Índice del paso actual (0-based). Igual a `total` cuando se muestra el cierre. */
  current: number;
  /** Número de pasos del recorrido (sin contar el cierre). */
  total: number;
  /** Indica si se está mostrando el cierre (oración y siguientes pasos). */
  isClosing: boolean;
}

/** Barra de progreso del recorrido con contador de pasos. */
export function ProgressIndicator({
  current,
  total,
  isClosing,
}: ProgressIndicatorProps) {
  const percent = isClosing
    ? 100
    : Math.round(((current + 1) / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
        <span className="text-amber-700 dark:text-amber-400">
          {isClosing ? "Oración final" : `Paso ${current + 1} de ${total}`}
        </span>
        <span className="text-stone-400 dark:text-stone-500">{percent}%</span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso del recorrido"
        className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
      >
        <div
          className="h-full rounded-full bg-amber-600 transition-all duration-300 dark:bg-amber-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, index) => (
          <li
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              isClosing || index < current
                ? "bg-amber-600 dark:bg-amber-500"
                : index === current
                  ? "bg-amber-400 dark:bg-amber-600"
                  : "bg-stone-200 dark:bg-stone-800"
            }`}
          />
        ))}
      </ol>
    </div>
  );
}
