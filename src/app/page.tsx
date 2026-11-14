import Link from "next/link";
import { BookOpen, Brain, Share2, Sprout, Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      {/* Encabezado Principal */}
      <section className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Escritura Diaria
        </span>
        <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
          Palabra Diaria
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-stone-600 sm:text-base dark:text-stone-400">
          Conéctate con la Escritura cada día a través de la lectura, memorización y discipulado.
        </p>
      </section>

      {/* Tarjeta del Versículo Destacado */}
      <section
        aria-label="Versículo del día"
        className="rounded-2xl border border-stone-200/90 bg-stone-100/60 p-6 shadow-xs sm:p-8 dark:border-stone-800 dark:bg-stone-900/60"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
            Versículo de Hoy
          </span>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            NTV
          </span>
        </div>

        <blockquote className="mt-4 font-serif text-lg leading-relaxed text-stone-800 sm:text-xl dark:text-stone-200">
          &ldquo;Tu palabra es una lámpara que guía mis pies y una luz para mi camino.&rdquo;
        </blockquote>

        <p className="mt-3 text-right text-xs font-semibold text-amber-800 sm:text-sm dark:text-amber-400">
          Salmos 119:105
        </p>
      </section>

      {/* Accesos Rápidos a Módulos */}
      <section aria-label="Módulos principales" className="grid grid-cols-2 gap-3 sm:gap-4">
        <Link
          href="/leer"
          className="group flex min-h-[44px] flex-col justify-between rounded-xl border border-stone-200/80 bg-white p-4 transition-all hover:border-amber-600/50 hover:shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Leer
            </h2>
            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Libros y capítulos completos
            </p>
          </div>
        </Link>

        <Link
          href="/memorizar"
          className="group flex min-h-[44px] flex-col justify-between rounded-xl border border-stone-200/80 bg-white p-4 transition-all hover:border-amber-600/50 hover:shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400">
            <Brain className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Memorizar
            </h2>
            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Práctica interactiva diaria
            </p>
          </div>
        </Link>

        <Link
          href="/evangelizar"
          className="group flex min-h-[44px] flex-col justify-between rounded-xl border border-stone-200/80 bg-white p-4 transition-all hover:border-amber-600/50 hover:shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400">
            <Share2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Evangelizar
            </h2>
            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Tarjetas para compartir
            </p>
          </div>
        </Link>

        <Link
          href="/discipulado"
          className="group flex min-h-[44px] flex-col justify-between rounded-xl border border-stone-200/80 bg-white p-4 transition-all hover:border-amber-600/50 hover:shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400">
            <Sprout className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Discipulado
            </h2>
            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Lecciones y fundamentos
            </p>
          </div>
        </Link>
      </section>

      {/* Acceso a Buscador */}
      <Link
        href="/buscar"
        className="flex min-h-[44px] items-center justify-between rounded-xl border border-dashed border-stone-300 bg-stone-50/50 px-4 py-3 text-sm text-stone-600 transition-colors hover:border-amber-600/60 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-900/30 dark:text-stone-400 dark:hover:border-amber-500/60 dark:hover:text-stone-100"
      >
        <span className="flex items-center gap-2">
          <Search className="h-4 w-4" aria-hidden="true" />
          <span>Buscar pasajes o temas...</span>
        </span>
        <span className="text-xs text-stone-400 dark:text-stone-500">Abrir</span>
      </Link>
    </div>
  );
}
