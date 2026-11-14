import type { Metadata } from "next";
import { Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "Discipulado",
  description: "Lecciones y fundamentos prácticos para crecer en la fe y conocimiento de Dios.",
};

export default function DiscipuladoPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="border-b border-stone-200 pb-4 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
            <Sprout className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
              Discipulado
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Crecimiento espiritual paso a paso para la vida diaria.
            </p>
          </div>
        </div>
      </header>

      {/* Placeholder temporal */}
      <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 p-8 text-center sm:p-12 dark:border-stone-800">
        <Sprout className="h-10 w-10 text-stone-400 dark:text-stone-600" aria-hidden="true" />
        <h2 className="mt-3 text-base font-semibold text-stone-800 dark:text-stone-200">
          Módulo de Discipulado en Construcción
        </h2>
        <p className="mt-1 max-w-sm text-sm text-stone-500 dark:text-stone-400">
          Aquí encontrarás lecciones cortas con pasajes bíblicos incrustados y preguntas de aplicación práctica.
        </p>
      </section>
    </div>
  );
}
