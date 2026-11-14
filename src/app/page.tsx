import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Brain, Share2, Sprout } from "lucide-react";
import { getVerse } from "@/lib/bible";
import { getDailyVerseReference } from "@/lib/daily";
import { VerseCard } from "@/components/VerseCard";

function VerseCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-6 rounded-3xl border border-stone-200/90 bg-stone-100/50 p-6 animate-pulse sm:p-8 dark:border-stone-800 dark:bg-stone-900/40"
    >
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 rounded-full bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-12 rounded bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="space-y-3">
        <div className="h-6 w-full rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-6 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-32 ml-auto rounded bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <div className="h-11 flex-1 rounded-xl bg-stone-200 dark:bg-stone-800" />
        <div className="h-11 w-28 rounded-xl bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

async function DailyVerseSection() {
  await connection();
  const bibleId = process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";
  const dailyRef = getDailyVerseReference();

  const verse = await getVerse(bibleId, dailyRef.id);

  return (
    <VerseCard
      verse={verse}
      category={dailyRef.category}
      theme={dailyRef.theme}
      versionName="NTV"
    />
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10">
      {/* Encabezado Principal */}
      <section className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Palabra Diaria
        </span>
        <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
          Un versículo para cada día
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-stone-600 sm:text-base dark:text-stone-400">
          Medita, memoriza y comparte la Escritura hoy con tu comunidad.
        </p>
      </section>

      {/* Tarjeta del Versículo del Día con Suspense para Partial Prerendering */}
      <Suspense fallback={<VerseCardSkeleton />}>
        <DailyVerseSection />
      </Suspense>

      {/* Accesos Rápidos Principales (3 tarjetas) */}
      <section aria-label="Secciones recomendadas" className="flex flex-col gap-4">
        <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
          Explora por propósito
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {/* Tarjeta: Evangelizar */}
          <Link
            href="/evangelizar"
            className="group flex min-h-[44px] flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 transition-all hover:border-amber-600/50 hover:shadow-xs active:scale-98 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition-colors group-hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400">
              <Share2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                Evangelizar
              </h3>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Tarjetas con pasajes de fe y esperanza listas para enviar por WhatsApp.
              </p>
            </div>
          </Link>

          {/* Tarjeta: Discipulado */}
          <Link
            href="/discipulado"
            className="group flex min-h-[44px] flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 transition-all hover:border-amber-600/50 hover:shadow-xs active:scale-98 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Sprout className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                Discipulado
              </h3>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Lecciones esenciales de fe con preguntas prácticas de aplicación.
              </p>
            </div>
          </Link>

          {/* Tarjeta: Memorizar */}
          <Link
            href="/memorizar"
            className="group flex min-h-[44px] flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 transition-all hover:border-amber-600/50 hover:shadow-xs active:scale-98 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-colors group-hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400">
              <Brain className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                Memorizar
              </h3>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Juego interactivo para memorizar versículos palabra por palabra.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
