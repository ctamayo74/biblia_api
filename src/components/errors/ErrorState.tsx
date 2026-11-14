"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  /** Error capturado por el boundary de la ruta. */
  error: Error & { digest?: string };
  /** Reinicia el boundary para volver a intentar el render. */
  reset: () => void;
  /** Título contextual del fallo (por defecto, uno genérico). */
  title?: string;
}

/**
 * UI de error amigable y reutilizable para los boundaries de ruta.
 *
 * Registra el error en consola para depuración, pero **nunca** expone
 * detalles técnicos al usuario. Ofrece reintentar y volver al inicio.
 */
export function ErrorState({
  error,
  reset,
  title = "Algo salió mal",
}: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
        <AlertTriangle className="h-8 w-8" aria-hidden="true" />
      </div>

      <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        {title}
      </h1>

      <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
        No pudimos cargar el contenido en este momento. Revisa tu conexión e
        inténtalo de nuevo en unos segundos.
      </p>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reintentar
        </button>

        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:border-amber-600 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-500"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
