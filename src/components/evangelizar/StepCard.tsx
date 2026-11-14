import { ShareButton } from "@/components/ShareButton";
import type { JourneyStep } from "@/types/evangelism";

interface StepCardProps {
  step: JourneyStep;
  /** Número del paso (1-based) para mostrarlo al usuario. */
  stepNumber: number;
  /** Total de pasos del recorrido. */
  totalSteps: number;
}

/** Tarjeta de un paso: título, explicación pastoral, versículo y compartir. */
export function StepCard({ step, stepNumber, totalSteps }: StepCardProps) {
  const hasText = step.text.length > 0;

  return (
    <article
      aria-label={`Paso ${stepNumber} de ${totalSteps}: ${step.title}`}
      className="flex flex-col gap-6 rounded-3xl border border-stone-200/90 bg-stone-100/70 p-6 shadow-xs sm:p-8 dark:border-stone-800 dark:bg-stone-900/60"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-900 dark:bg-rose-950/60 dark:text-rose-300">
          Paso {stepNumber} de {totalSteps}
        </span>
        <span className="text-xs font-medium tracking-wide text-stone-500 dark:text-stone-400">
          NTV
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="font-serif text-xl font-bold text-stone-900 sm:text-2xl dark:text-stone-100">
          {step.title}
        </h2>
        <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">
          {step.message}
        </p>
      </div>

      <div className="space-y-3 border-l-2 border-amber-600/50 pl-4">
        {hasText ? (
          <blockquote className="font-serif text-lg leading-relaxed text-stone-900 sm:text-xl sm:leading-loose dark:text-stone-100">
            &ldquo;{step.text}&rdquo;
          </blockquote>
        ) : (
          <p className="text-sm italic text-stone-500 dark:text-stone-400">
            No pudimos cargar el texto en este momento. Puedes leer {step.reference}{" "}
            directamente en tu Biblia.
          </p>
        )}

        <cite className="block font-serif text-base font-bold not-italic text-amber-800 dark:text-amber-400">
          {step.reference}
        </cite>
      </div>

      <div className="pt-1">
        <ShareButton
          reference={step.reference}
          text={hasText ? step.text : step.reference}
          label="Compartir este paso"
          className="w-full sm:w-auto"
        />
      </div>
    </article>
  );
}
