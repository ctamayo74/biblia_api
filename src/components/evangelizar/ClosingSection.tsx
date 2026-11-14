import Link from "next/link";
import {
  BookOpen,
  Brain,
  HeartHandshake,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { JourneyClosing } from "@/types/evangelism";

interface ClosingSectionProps {
  closing: JourneyClosing;
}

/** Icono asociado a cada destino de "Siguientes pasos". */
const NEXT_STEP_ICONS: Record<string, LucideIcon> = {
  "/discipulado": Sprout,
  "/leer": BookOpen,
  "/memorizar": Brain,
};

/** Cierre del recorrido: invitación a orar y siguientes pasos. */
export function ClosingSection({ closing }: ClosingSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Invitación a orar */}
      <section
        aria-labelledby="oracion-final"
        className="flex flex-col gap-4 rounded-3xl border border-amber-200/80 bg-amber-50/70 p-6 shadow-xs sm:p-8 dark:border-amber-900/60 dark:bg-amber-950/30"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-400">
            <HeartHandshake className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2
            id="oracion-final"
            className="font-serif text-xl font-bold text-stone-900 sm:text-2xl dark:text-stone-100"
          >
            {closing.title}
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">
          {closing.intro}
        </p>

        <blockquote className="rounded-2xl border border-amber-200/70 bg-white/70 p-5 font-serif text-lg leading-loose text-stone-900 dark:border-amber-900/50 dark:bg-stone-900/40 dark:text-stone-100">
          &ldquo;{closing.prayer}&rdquo;
        </blockquote>

        <p className="text-xs text-stone-500 dark:text-stone-400">
          Puedes orar con tus propias palabras. Lo importante es la sinceridad
          del corazón.
        </p>
      </section>

      {/* Siguientes pasos */}
      <section aria-labelledby="siguientes-pasos" className="flex flex-col gap-4">
        <div>
          <h2
            id="siguientes-pasos"
            className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100"
          >
            Siguientes pasos
          </h2>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Este es solo el comienzo. Te acompañamos a seguir creciendo.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {closing.nextSteps.map((next) => {
            const Icon = NEXT_STEP_ICONS[next.href] ?? Sprout;

            return (
              <li key={next.href}>
                <Link
                  href={next.href}
                  className="group flex min-h-[44px] items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 transition-all hover:border-amber-600/50 hover:shadow-xs active:scale-98 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                      {next.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-stone-500 dark:text-stone-400">
                      {next.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
