import type { Metadata } from "next";
import { Search } from "lucide-react";
import { SearchForm } from "@/components/buscar/SearchForm";

export const metadata: Metadata = {
  title: "Buscar",
  description:
    "Busca palabras o frases en la Biblia y encuentra el versículo y su capítulo al instante.",
};

const DEFAULT_BIBLE_ID = process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";

export default function BuscarPage() {
  const bibleId = process.env.BIBLE_DEFAULT_ID || DEFAULT_BIBLE_ID;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="border-b border-stone-200 pb-4 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
            <Search className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
              Buscar en la Biblia
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Encuentra versículos por palabra o frase.
            </p>
          </div>
        </div>
      </header>

      <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">
        Escribe lo que quieras encontrar y verás los versículos coincidentes.
        Desde cada resultado puedes abrir el capítulo completo o enviarlo a
        memorizar.
      </p>

      <SearchForm bibleId={bibleId} />
    </div>
  );
}
