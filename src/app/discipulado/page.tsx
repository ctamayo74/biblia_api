import type { Metadata } from "next";
import { Sprout } from "lucide-react";
import { DiscipleshipPlan } from "@/components/discipulado/DiscipleshipPlan";

export const metadata: Metadata = {
  title: "Discipulado",
  description:
    "Plan de 7 días para nuevos creyentes: lectura bíblica, reflexión, oración y una acción práctica cada día.",
};

export default function DiscipuladoPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="border-b border-stone-200 pb-4 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            <Sprout className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
              Discipulado
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Un plan de 7 días para empezar a caminar con Jesús.
            </p>
          </div>
        </div>
      </header>

      <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">
        Cada día incluye un pasaje para leer, una pregunta para reflexionar, una
        oración corta y una acción práctica. Ve a tu ritmo y marca los días que
        completes.
      </p>

      <DiscipleshipPlan />
    </div>
  );
}
