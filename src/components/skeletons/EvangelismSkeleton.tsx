/**
 * Skeletons de la guía de evangelismo (`/evangelizar`): progreso y paso actual.
 */

/** Esqueleto del recorrido (barra de progreso, tarjeta de paso y navegación). */
export function JourneySkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6 animate-pulse">
      <div className="h-8 rounded-full bg-stone-200 dark:bg-stone-800" />
      <div className="flex flex-col gap-6 rounded-3xl border border-stone-200/90 bg-stone-100/50 p-6 sm:p-8 dark:border-stone-800 dark:bg-stone-900/40">
        <div className="h-6 w-32 rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="h-7 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="space-y-3">
          <div className="h-5 w-full rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-5 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
        </div>
        <div className="h-11 w-48 rounded-xl bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="h-11 flex-1 rounded-xl bg-stone-200 dark:bg-stone-800" />
        <div className="h-11 flex-1 rounded-xl bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

/** Esqueleto completo de `/evangelizar`, imitando su diseño real. */
export function EvangelismSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10"
    >
      <header className="border-b border-stone-200 pb-4 dark:border-stone-800">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-10 w-10 rounded-lg bg-stone-200 dark:bg-stone-800" />
          <div className="space-y-2">
            <div className="h-7 w-40 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-56 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>
      </header>

      <div className="h-4 w-full max-w-xl rounded bg-stone-200 animate-pulse dark:bg-stone-800" />

      <JourneySkeleton />
    </div>
  );
}
