/**
 * Skeletons del detalle de un día de discipulado (`/discipulado/[dia]`).
 */

/** Esqueleto del pasaje de lectura del día. */
export function PassageSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-4 rounded-3xl border border-stone-200/90 bg-stone-100/50 p-6 animate-pulse sm:p-8 dark:border-stone-800 dark:bg-stone-900/40"
    >
      <div className="h-6 w-32 rounded-full bg-stone-200 dark:bg-stone-800" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-5 w-full rounded bg-stone-200 dark:bg-stone-800"
          />
        ))}
      </div>
    </div>
  );
}

/** Esqueleto completo de `/discipulado/[dia]`, imitando su diseño real. */
export function DiscipleshipDaySkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10"
    >
      {/* Migas de pan */}
      <div className="flex items-center gap-1.5 animate-pulse">
        <div className="h-4 w-16 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-20 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-12 rounded bg-stone-200 dark:bg-stone-800" />
      </div>

      {/* Encabezado del día */}
      <header className="flex flex-col gap-1.5 border-b border-stone-200 pb-4 animate-pulse dark:border-stone-800">
        <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-8 w-64 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-800" />
      </header>

      {/* Pasaje */}
      <PassageSkeleton />

      {/* Reflexión, oración y acción */}
      {[0, 1, 2].map((section) => (
        <div
          key={section}
          className="flex gap-4 rounded-2xl border border-stone-200/90 bg-white p-5 animate-pulse dark:border-stone-800 dark:bg-stone-900"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-stone-200 dark:bg-stone-800" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-5 w-32 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-full rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>
      ))}

      {/* Marca de completado y notas */}
      <div className="h-24 rounded-2xl border border-stone-200/90 bg-white p-5 animate-pulse dark:border-stone-800 dark:bg-stone-900" />
      <div className="h-40 rounded-2xl border border-stone-200/90 bg-white p-5 animate-pulse dark:border-stone-800 dark:bg-stone-900" />
    </div>
  );
}
