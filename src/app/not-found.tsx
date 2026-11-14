import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o cambió de dirección.",
};

/** Página 404 global, con enlace de regreso al inicio. */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </div>

      <span className="font-serif text-5xl font-bold text-stone-300 dark:text-stone-700">
        404
      </span>

      <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        No encontramos esta página
      </h1>

      <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
        Puede que el enlace esté roto o que la página se haya movido. Vuelve al
        inicio para seguir leyendo la Palabra.
      </p>

      <Link
        href="/"
        className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        Volver al inicio
      </Link>
    </div>
  );
}
