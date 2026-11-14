import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { ChevronRight, Home, BookOpen } from "lucide-react";
import { getChapter, getBook } from "@/lib/bible";
import { ChapterReader } from "@/components/ChapterReader";
import { VersionSelector } from "@/components/VersionSelector";

interface ChapterPageProps {
  params: Promise<{ bookId: string; chapterId: string }>;
  searchParams: Promise<{ bibleId?: string }>;
}

function ChapterLoadingSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-[65ch] flex-col gap-6 animate-pulse py-4">
      <div className="h-4 w-48 rounded bg-stone-200 dark:bg-stone-800" />
      <div className="h-8 w-64 mx-auto rounded bg-stone-200 dark:bg-stone-800" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-5 w-full rounded bg-stone-200 dark:bg-stone-800" />
        ))}
      </div>
    </div>
  );
}

async function ChapterContent({
  params,
  searchParams,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
  searchParams: Promise<{ bibleId?: string }>;
}) {
  await connection();
  const { bookId, chapterId } = await params;
  const { bibleId: queryBibleId } = await searchParams;
  const bibleId = queryBibleId || process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";
  const queryParam = queryBibleId ? `?bibleId=${encodeURIComponent(queryBibleId)}` : "";

  const [chapter, book] = await Promise.all([
    getChapter(bibleId, chapterId),
    getBook(bibleId, bookId),
  ]);

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb de navegación */}
      <nav
        aria-label="Migas de pan"
        className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400"
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
        <Link
          href={`/leer/${bookId}${queryParam}`}
          className="flex min-h-[44px] items-center hover:text-stone-900 dark:hover:text-stone-100"
        >
          <span>{book.name}</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
        <span className="font-semibold text-stone-800 dark:text-stone-200">
          {chapter.reference}
        </span>
      </nav>

      {/* Selector de versión */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 dark:border-stone-800">
        <VersionSelector currentBibleId={bibleId} />
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
          {book.name}
        </span>
      </div>

      {/* Encabezado del capítulo */}
      <header className="text-center pt-2">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
          {chapter.reference}
        </h1>
        <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
          {chapter.verseCount} versículos
        </p>
      </header>

      {/* Visor interactivo de lectura con control de tamaño y botones de navegación */}
      <ChapterReader
        chapter={chapter}
        bibleId={bibleId}
        bookId={bookId}
      />
    </div>
  );
}

export default function ChapterPage({
  params,
  searchParams,
}: ChapterPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <Suspense fallback={<ChapterLoadingSkeleton />}>
        <ChapterContent params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
