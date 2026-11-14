/**
 * Skeletons del detalle de un libro (`/leer/[bookId]`): cuadrícula de capítulos.
 */

/** Cuadrícula de números de capítulo. */
export function ChaptersGridSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-6 w-48 rounded bg-stone-200 dark:bg-stone-800" />
      <div className="h-10 w-64 rounded-xl bg-stone-200 dark:bg-stone-800" />
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3 md:grid-cols-8">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="h-12 rounded-xl border border-stone-200/60 bg-stone-100 dark:border-stone-800 dark:bg-stone-900"
          />
        ))}
      </div>
    </div>
  );
}

/** Esqueleto completo de `/leer/[bookId]`, imitando su diseño real. */
export function BookChaptersSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10"
    >
      <ChaptersGridSkeleton />
    </div>
  );
}
