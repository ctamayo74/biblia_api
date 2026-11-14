import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { BookOpen } from "lucide-react";
import { getBooks } from "@/lib/bible";
import { partitionBooks } from "@/lib/canon";
import { VersionSelector } from "@/components/VersionSelector";
import { BooksGridSkeleton } from "@/components/skeletons/BooksSkeleton";
import type { Book } from "@/types/bible";

interface LeerPageProps {
  searchParams: Promise<{ bibleId?: string }>;
}

function BooksGrid({ books, bibleId }: { books: Book[]; bibleId: string }) {
  const queryParam = bibleId ? `?bibleId=${encodeURIComponent(bibleId)}` : "";

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/leer/${book.id}${queryParam}`}
          className="flex min-h-[48px] flex-col justify-center rounded-xl border border-stone-200/90 bg-white p-3 transition-all hover:border-amber-600/60 hover:bg-amber-50/40 hover:shadow-2xs active:scale-98 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/60 dark:hover:bg-amber-950/20"
        >
          <span className="text-xs font-bold text-amber-800 dark:text-amber-400">
            {book.abbreviation || book.id}
          </span>
          <span className="truncate text-sm font-semibold text-stone-800 dark:text-stone-200">
            {book.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

async function BooksContent({
  searchParams,
}: {
  searchParams: Promise<{ bibleId?: string }>;
}) {
  await connection();
  const { bibleId: queryBibleId } = await searchParams;
  const bibleId = queryBibleId || process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";

  const books = await getBooks(bibleId);
  const { oldTestament, newTestament, otherBooks } = partitionBooks(books);

  return (
    <div className="flex flex-col gap-8">
      {/* Selector de versión */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 dark:border-stone-800">
        <VersionSelector currentBibleId={bibleId} />
      </div>

      {/* Antiguo Testamento */}
      <section aria-labelledby="antiguo-testamento-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            id="antiguo-testamento-heading"
            className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100"
          >
            Antiguo Testamento
          </h2>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            {oldTestament.length} libros
          </span>
        </div>
        <BooksGrid books={oldTestament} bibleId={bibleId} />
      </section>

      {/* Nuevo Testamento */}
      <section aria-labelledby="nuevo-testamento-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            id="nuevo-testamento-heading"
            className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100"
          >
            Nuevo Testamento
          </h2>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            {newTestament.length} libros
          </span>
        </div>
        <BooksGrid books={newTestament} bibleId={bibleId} />
      </section>

      {/* Otros libros (en caso de ediciones con deuterocanónicos) */}
      {otherBooks.length > 0 && (
        <section aria-labelledby="otros-libros-heading" className="space-y-3">
          <h2
            id="otros-libros-heading"
            className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100"
          >
            Otros Libros
          </h2>
          <BooksGrid books={otherBooks} bibleId={bibleId} />
        </section>
      )}
    </div>
  );
}

export default function LeerPage({ searchParams }: LeerPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
          <BookOpen className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
            Lectura Bíblica
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Selecciona un libro para explorar sus capítulos
          </p>
        </div>
      </header>

      <Suspense fallback={<BooksGridSkeleton />}>
        <BooksContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
