"use client";

import { useState } from "react";
import { Check, CircleCheck, CircleX, Eye, RotateCcw } from "lucide-react";
import { RECITE_SUCCESS_THRESHOLD, computeAccuracy } from "@/lib/memorization";

interface ReciteModeProps {
  text: string;
  onSuccess: () => void;
}

/** Modo Recitar: el usuario escribe el versículo de memoria y se calcula el acierto. */
export function ReciteMode({ text, onSuccess }: ReciteModeProps) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const accuracy = computeAccuracy(text, value);
  const passed = accuracy >= RECITE_SUCCESS_THRESHOLD;

  function handleCheck() {
    setChecked(true);
    if (accuracy >= RECITE_SUCCESS_THRESHOLD) {
      onSuccess();
    }
  }

  function handleReveal() {
    setValue(text.trim());
    setChecked(true);
  }

  function handleReset() {
    setValue("");
    setChecked(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Escribe el versículo de memoria. Se ignoran mayúsculas y signos. Necesitas
        al menos{" "}
        <strong className="text-stone-700 dark:text-stone-300">
          {RECITE_SUCCESS_THRESHOLD}%
        </strong>{" "}
        de acierto.
      </p>

      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={5}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="Escribe el versículo de memoria"
        placeholder="Escribe aquí el versículo…"
        className={`w-full resize-y rounded-2xl border-2 bg-white p-4 font-serif text-lg leading-loose text-stone-900 outline-hidden transition-colors placeholder:text-stone-400 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-600 ${
          checked
            ? passed
              ? "border-emerald-500"
              : "border-rose-500"
            : "border-stone-200 focus:border-amber-600 dark:border-stone-800"
        }`}
      />

      {/* Medidor de acierto */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-medium text-stone-500 dark:text-stone-400">
          <span>Acierto</span>
          <span className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
            {accuracy}%
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800"
          role="progressbar"
          aria-valuenow={accuracy}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Porcentaje de acierto"
        >
          <div
            className={`h-full rounded-full transition-all ${
              passed
                ? "bg-emerald-500"
                : accuracy > 0
                  ? "bg-amber-500"
                  : "bg-stone-300 dark:bg-stone-700"
            }`}
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </div>

      {checked && (
        <p
          role="status"
          className={`flex items-center gap-2 text-sm font-semibold ${
            passed
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-rose-700 dark:text-rose-400"
          }`}
        >
          {passed ? (
            <>
              <CircleCheck className="h-4 w-4" aria-hidden="true" />
              ¡Bien! Alcanzaste {accuracy}% y subiste tu nivel de dominio.
            </>
          ) : (
            <>
              <CircleX className="h-4 w-4" aria-hidden="true" />
              Obtuviste {accuracy}%. Repasa el versículo e inténtalo otra vez.
            </>
          )}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCheck}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
        >
          <Check className="h-4 w-4" aria-hidden="true" />
          Comprobar
        </button>

        <button
          type="button"
          onClick={handleReveal}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          Ver respuesta
        </button>

        <button
          type="button"
          onClick={handleReset}
          aria-label="Reiniciar recitación"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-600 shadow-2xs transition-colors hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
