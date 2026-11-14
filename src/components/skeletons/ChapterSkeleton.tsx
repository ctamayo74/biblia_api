/**
 * Skeletons del capítulo (`/leer/[bookId]/[chapterId]`): encabezado y texto.
 */

/** Esqueleto del encabezado y el cuerpo del capítulo. */
export function ChapterLoadingSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-[65ch] flex-col gap-6 animate-pulse py-4">
      <div className="h-4 w-48 rounded bg-stone-200 dark:bg-stone-800" />
      <div className="mx-auto h-8 w-64 rounded bg-stone-200 dark:bg-stone-800" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-5 w-full rounded bg-stone-200 dark:bg-stone-800"
          />
        ))}
      </div>
    </div>
  );
}

/** Esqueleto completo del capítulo, imitando su diseño real. */
export function ChapterSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10"
    >
      <ChapterLoadingSkeleton />
    </div>
  );
}
