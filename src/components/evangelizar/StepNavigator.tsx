"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { ProgressIndicator } from "@/components/evangelizar/ProgressIndicator";
import { StepCard } from "@/components/evangelizar/StepCard";
import { ClosingSection } from "@/components/evangelizar/ClosingSection";
import type { JourneyClosing, JourneyStep } from "@/types/evangelism";

interface StepNavigatorProps {
  steps: JourneyStep[];
  closing: JourneyClosing;
}

/**
 * Navegador del recorrido de evangelismo: avanza y retrocede entre pasos,
 * muestra el indicador de progreso y, al final, el cierre con la oración.
 */
export function StepNavigator({ steps, closing }: StepNavigatorProps) {
  const total = steps.length;
  const [index, setIndex] = useState(0);

  const isClosing = index >= total;
  const isFirst = index === 0;
  const isLastStep = index === total - 1;
  const step = isClosing ? null : steps[index];

  function goPrevious() {
    setIndex((current) => Math.max(0, current - 1));
  }

  function goNext() {
    setIndex((current) => Math.min(total, current + 1));
  }

  function restart() {
    setIndex(0);
  }

  return (
    <section
      aria-label="Recorrido para compartir el evangelio"
      className="flex flex-col gap-6"
    >
      <ProgressIndicator current={index} total={total} isClosing={isClosing} />

      <div aria-live="polite">
        {step ? (
          <StepCard step={step} stepNumber={index + 1} totalSteps={total} />
        ) : (
          <ClosingSection closing={closing} />
        )}
      </div>

      <nav
        aria-label="Navegación entre pasos"
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        {isClosing ? (
          <>
            <button
              type="button"
              onClick={goPrevious}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-2xs transition-all hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver al último paso
            </button>

            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Volver al inicio
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={goPrevious}
              disabled={isFirst}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-2xs transition-all hover:bg-stone-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Anterior
            </button>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
            >
              {isLastStep ? "Finalizar" : "Siguiente"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </>
        )}
      </nav>
    </section>
  );
}
