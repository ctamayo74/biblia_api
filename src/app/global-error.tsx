"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
// `global-error` reemplaza el layout raíz, por lo que debe importar sus propios estilos.
import "./globals.css";

/**
 * Boundary de error para fallos del layout raíz.
 *
 * Debe definir sus propias etiquetas `<html>` y `<body>`, y no admite
 * `metadata`; el título se declara con el componente `<title>` de React.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50 px-4 py-16 text-center text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
        <title>Error | Palabra Diaria</title>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
          <AlertTriangle className="h-8 w-8" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">Algo salió mal</h1>

        <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
          La aplicación encontró un problema inesperado. Puedes reintentar o
          recargar la página en unos segundos.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reintentar
        </button>
      </body>
    </html>
  );
}
