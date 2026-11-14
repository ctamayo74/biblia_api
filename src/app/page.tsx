import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Encabezado */}
        <header className="text-center pt-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Palabra Diaria
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Lectura, memorización y discipulado en tu día a día
          </p>
        </header>

        {/* Tarjeta del Versículo del Día (Placeholder) */}
        <section
          aria-label="Versículo del día"
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Versículo de Hoy
          </span>
          <blockquote className="mt-2 text-base font-medium italic leading-relaxed text-zinc-800 dark:text-zinc-200">
            &ldquo;Lámpara es a mis pies tu palabra, y lumbrera a mi camino.&rdquo;
          </blockquote>
          <p className="mt-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Salmos 119:105
          </p>
        </section>

        {/* Accesos Rápidos */}
        <nav aria-label="Secciones principales" className="grid grid-cols-2 gap-3">
          <Link
            href="/leer"
            className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <span className="text-xl" role="img" aria-hidden="true">📖</span>
            <span className="text-sm font-semibold">Leer</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Libros y capítulos</span>
          </Link>

          <Link
            href="/memorizar"
            className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <span className="text-xl" role="img" aria-hidden="true">🧠</span>
            <span className="text-sm font-semibold">Memorizar</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Práctica interactiva</span>
          </Link>

          <Link
            href="/evangelizar"
            className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <span className="text-xl" role="img" aria-hidden="true">💬</span>
            <span className="text-sm font-semibold">Evangelizar</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Tarjetas para compartir</span>
          </Link>

          <Link
            href="/discipulado"
            className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <span className="text-xl" role="img" aria-hidden="true">🌱</span>
            <span className="text-sm font-semibold">Discipulado</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Lecciones guiadas</span>
          </Link>
        </nav>

        {/* Buscador */}
        <Link
          href="/buscar"
          className="flex items-center justify-between rounded-xl border border-dashed border-zinc-300 p-3 text-sm text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500"
        >
          <span>🔍 Buscar pasajes o palabras...</span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">Ir</span>
        </Link>
      </div>

      <footer className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
        Palabra Diaria • Alimentado por API.Bible
      </footer>
    </main>
  );
}
