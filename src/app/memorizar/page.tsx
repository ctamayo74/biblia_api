import { Suspense } from "react";
import type { Metadata } from "next";
import { Brain } from "lucide-react";
import { connection } from "next/server";
import { getVerse } from "@/lib/bible";
import { getDailyVerseReference } from "@/lib/daily";
import { MemorizationPractice } from "@/components/memorizar/MemorizationPractice";
import type { PracticeVerse } from "@/types/memorization";

export const metadata: Metadata = {
  title: "Memorizar Versículos",
  description:
    "Entrena tu memoria y guarda la Palabra de Dios en tu corazón con ejercicios por modos y niveles.",
};

const DEFAULT_BIBLE_ID = process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";

/**
 * Carga el versículo solicitado; si la referencia no es válida,
 * reintenta con el versículo del día como respaldo.
 */
async function loadPracticeVerse(
  bibleId: string,
  verseId: string
): Promise<PracticeVerse> {
  const fallbackId = getDailyVerseReference().id;

  try {
    const verse = await getVerse(bibleId, verseId);
    return { id: verse.id, reference: verse.reference, content: verse.content };
  } catch (error) {
    if (verseId === fallbackId) {
      throw error;
    }

    const fallbackVerse = await getVerse(bibleId, fallbackId);
    return {
      id: fallbackVerse.id,
      reference: fallbackVerse.reference,
      content: fallbackVerse.content,
    };
  }
}

type LoadResult =
  | { ok: true; verse: PracticeVerse }
  | { ok: false; message: string };

/** Resuelve el versículo inicial sin lanzar errores hacia el render. */
async function resolveInitialVerse(
  bibleId: string,
  verseId: string
): Promise<LoadResult> {
  try {
    return { ok: true, verse: await loadPracticeVerse(bibleId, verseId) };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "No se pudo cargar el versículo para practicar.",
    };
  }
}

async function MemorizationSection({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  await connection();
  const { ref } = await searchParams;
  const bibleId = DEFAULT_BIBLE_ID;
  const verseId = ref?.trim() || getDailyVerseReference().id;
  const result = await resolveInitialVerse(bibleId, verseId);

  if (!result.ok) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
      >
        <p className="font-semibold">No pudimos cargar el versículo.</p>
        <p className="mt-1">{result.message}</p>
      </div>
    );
  }

  return <MemorizationPractice initialVerse={result.verse} bibleId={bibleId} />;
}

function MemorizationSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6 animate-pulse">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 rounded-2xl bg-stone-200 dark:bg-stone-800"
          />
        ))}
      </div>
      <div className="h-11 w-full rounded-xl bg-stone-200 dark:bg-stone-800" />
      <div className="h-72 rounded-3xl bg-stone-200 dark:bg-stone-800" />
    </div>
  );
}

export default function MemorizarPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="border-b border-stone-200 pb-4 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
            <Brain className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
              Memorizar
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Retén la Escritura con modos, niveles y una racha diaria.
            </p>
          </div>
        </div>
      </header>

      <Suspense fallback={<MemorizationSkeleton />}>
        <MemorizationSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
