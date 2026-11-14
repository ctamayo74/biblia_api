/**
 * Skeletons de la ruta de lectura (`/leer`): cuadrícula de libros y página completa.
 */

/** Cuadrícula de tarjetas de libros (Antiguo/Nuevo Testamento). */
export function BooksGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2.5 animate-pulse sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="h-16 rounded-xl border border-stone-200/60 bg-stone-100 dark:border-stone-800 dark:bg-stone-900"
        />
      ))}
    </div>
  );
}

/** Esqueleto completo de `/leer`, imitando su diseño real. */
export function BooksSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 animate-pulse sm:px-6 sm:py-10"
    >
      {/* Encabezado */}
      <header className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-stone-200 dark:bg-stone-800" />
        <div className="space-y-2">
          <div className="h-7 w-48 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 w-56 rounded bg-stone-200 dark:bg-stone-800" />
        </div>
      </header>

      <div className="flex flex-col gap-8">
        {/* Selector de versión */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 dark:border-stone-800">
          <div className="h-10 w-40 rounded-xl bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Antiguo y Nuevo Testamento */}
        {[0, 1].map((section) => (
          <section key={section} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-44 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-4 w-16 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
            <BooksGridSkeleton />
          </section>
        ))}
      </div>
    </div>
  );
}
