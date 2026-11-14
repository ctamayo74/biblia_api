import Link from "next/link";
import { BookOpen, Brain, ChevronRight } from "lucide-react";
import type { SearchVerseMatch } from "@/types/bible";

interface SearchResultItemProps {
  verse: SearchVerseMatch;
}

/** Tarjeta de un resultado de búsqueda: referencia, fragmento y acciones. */
export function SearchResultItem({ verse }: SearchResultItemProps) {
  const chapterHref = `/leer/${verse.bookId}/${verse.chapterId}`;

  return (
    <li>
      <article className="flex flex-col gap-3 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs transition-colors hover:border-amber-600/50 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50">
        <Link
          href={chapterHref}
          className="group flex min-h-[44px] flex-col gap-1.5"
        >
          <span className="flex items-center justify-between gap-2">
            <span className="font-serif text-sm font-bold text-amber-800 dark:text-amber-400">
              {verse.reference}
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
          <span className="line-clamp-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {verse.text.trim()}
          </span>
        </Link>

        <div className="flex flex-wrap gap-2 border-t border-stone-200/70 pt-3 dark:border-stone-800">
          <Link
            href={chapterHref}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:border-amber-600 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-amber-500"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Leer capítulo
          </Link>

          <Link
            href={`/memorizar?ref=${encodeURIComponent(verse.id)}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-2 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
          >
            <Brain className="h-4 w-4" aria-hidden="true" />
            Memorizar
          </Link>
        </div>
      </article>
    </li>
  );
}
