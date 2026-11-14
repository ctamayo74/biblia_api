"use client";

import { Check } from "lucide-react";

interface DayCheckboxProps {
  /** Número del día que representa el control. */
  day: number;
  /** Si el día está marcado como completado. */
  checked: boolean;
  /** Acción al pulsar el control. */
  onToggle: () => void;
  /** Deshabilita el control mientras se carga el progreso. */
  disabled?: boolean;
}

/** Control accesible para marcar un día del plan como completado. */
export function DayCheckbox({
  day,
  checked,
  onToggle,
  disabled = false,
}: DayCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={
        checked
          ? `Día ${day} completado. Pulsa para marcarlo como pendiente`
          : `Marcar el día ${day} como completado`
      }
      disabled={disabled}
      onClick={onToggle}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
        checked
          ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
          : "border-stone-300 bg-white text-stone-600 hover:border-emerald-500 hover:text-emerald-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
          checked
            ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-stone-950"
            : "border-stone-300 dark:border-stone-600"
        }`}
      >
        {checked && <Check className="h-3.5 w-3.5" />}
      </span>
      <span className="hidden sm:inline">
        {checked ? "Completado" : "Completar"}
      </span>
    </button>
  );
}
