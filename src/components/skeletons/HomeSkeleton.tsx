/**
 * Skeletons de la portada (versículo del día y accesos rápidos).
 * Se reutilizan en el `loading.tsx` raíz y en el `Suspense` de la página.
 */

/** Esqueleto de la tarjeta del versículo del día. */
export function VerseCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-6 rounded-3xl border border-stone-200/90 bg-stone-100/50 p-6 animate-pulse sm:p-8 dark:border-stone-800 dark:bg-stone-900/40"
    >
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-12 rounded bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="space-y-3">
        <div className="h-6 w-full rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-6 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="ml-auto h-4 w-32 rounded bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <div className="h-11 flex-1 rounded-xl bg-stone-200 dark:bg-stone-800" />
        <div className="h-11 w-28 rounded-xl bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

/** Esqueleto completo de la portada, imitando su diseño real. */
export function HomeSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-6 animate-pulse sm:px-6 sm:py-10"
    >
      {/* Encabezado principal */}
      <section className="flex flex-col items-center gap-2 text-center">
        <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-8 w-72 max-w-full rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-64 max-w-full rounded bg-stone-200 dark:bg-stone-800" />
      </section>

      {/* Tarjeta del versículo del día */}
      <VerseCardSkeleton />

      {/* Accesos rápidos */}
      <section className="flex flex-col gap-4">
        <div className="h-6 w-52 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-2xl border border-stone-200/90 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="h-11 w-11 rounded-xl bg-stone-200 dark:bg-stone-800" />
              <div className="space-y-2">
                <div className="h-5 w-24 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-3 w-full rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-3 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
