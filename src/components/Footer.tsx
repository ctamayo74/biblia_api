export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-stone-200/80 bg-stone-100/50 py-6 text-center text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-400">
      <div className="mx-auto max-w-5xl px-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
        <p>
          &copy; {currentYear} Palabra Diaria. Todos los derechos reservados.
        </p>
        <p className="font-medium text-stone-600 dark:text-stone-300">
          Texto bíblico obtenido de{" "}
          <a
            href="https://scripture.api.bible"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
          >
            API.Bible
          </a>
        </p>
      </div>
    </footer>
  );
}
