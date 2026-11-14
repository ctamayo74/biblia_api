import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { ChevronRight, Home, BookOpen } from "lucide-react";
import { getBook, getBookChapters } from "@/lib/bible";
import { VersionSelector } from "@/components/VersionSelector";
import { ChaptersGridSkeleton } from "@/components/skeletons/BookChaptersSkeleton";

interface BookPageProps {
  params: Promise<{ bookId: string }>;
  searchParams: Promise<{ bibleId?: string }>;
}

async function BookContent({
  params,
  searchParams,
}: {
  params: Promise<{ bookId: string }>;
  searchParams: Promise<{ bibleId?: string }>;
}) {
  await connection();
  const { bookId } = await params;
  const { bibleId: queryBibleId } = await searchParams;
  const bibleId = queryBibleId || process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";

  const [book, allChapters] = await Promise.all([
    getBook(bibleId, bookId),
    getBookChapters(bibleId, bookId),
  ]);

  // Filtrar capítulos numéricos regulares
  const chapters = allChapters.filter((c) => c.number !== "intro");
  const queryParam = bibleId ? `?bibleId=${encodeURIComponent(bibleId)}` : "";

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb de navegación */}
      <nav
        aria-label="Migas de pan"
        className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400"
      >
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100"
        >
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Inicio</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
        <Link
          href={`/leer${queryParam}`}
          className="flex min-h-[44px] items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Leer</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
        <span className="font-semibold text-stone-800 dark:text-stone-200">
          {book.name}
        </span>
      </nav>

      {/* Selector de versión */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 dark:border-stone-800">
        <VersionSelector currentBibleId={bibleId} />
      </div>

      {/* Título del libro */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
          {book.name}
        </h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Selecciona un capítulo para comenzar la lectura ({chapters.length} capítulos disponibles)
        </p>
      </div>

      {/* Cuadrícula de Capítulos */}
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3 md:grid-cols-8">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/leer/${bookId}/${chapter.id}${queryParam}`}
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl border border-stone-200/90 bg-white text-base font-semibold text-stone-800 shadow-2xs transition-all hover:border-amber-600 hover:bg-amber-50 hover:text-amber-900 active:scale-95 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-500 dark:hover:bg-amber-950/40 dark:hover:text-amber-300"
          >
            {chapter.number}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function BookPage({ params, searchParams }: BookPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <Suspense fallback={<ChaptersGridSkeleton />}>
        <BookContent params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
