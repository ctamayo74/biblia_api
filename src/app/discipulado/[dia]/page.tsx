import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Footprints,
  HandHeart,
  Home,
  MessageCircleQuestion,
  Sprout,
} from "lucide-react";
import { getPassage } from "@/lib/bible";
import {
  DISCIPLESHIP_PLAN,
  DISCIPLESHIP_TOTAL_DAYS,
  getDiscipleshipDay,
} from "@/data/plan-discipulado";
import type { DiscipleshipDay } from "@/types/discipleship";
import { GuideSection } from "@/components/discipulado/GuideSection";
import { DayCompletion } from "@/components/discipulado/DayCompletion";
import { DayNotes } from "@/components/discipulado/DayNotes";
import { PassageSkeleton } from "@/components/skeletons/DiscipleshipDaySkeleton";

interface DayPageProps {
  params: Promise<{ dia: string }>;
}

export function generateStaticParams() {
  return DISCIPLESHIP_PLAN.map((day) => ({ dia: String(day.day) }));
}

export async function generateMetadata({
  params,
}: DayPageProps): Promise<Metadata> {
  const { dia } = await params;
  const day = getDiscipleshipDay(Number(dia));

  if (!day) {
    return { title: "Día no encontrado" };
  }

  return {
    title: `Día ${day.day}: ${day.title}`,
    description: `Plan de discipulado, día ${day.day} — ${day.reference}.`,
  };
}

async function DayPassage({ day }: { day: DiscipleshipDay }) {
  await connection();
  const bibleId = process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";
  const passage = await getPassage(bibleId, day.passageId);

  const paragraphs = passage.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  return (
    <article
      aria-label={`Lectura del día: ${day.reference}`}
      className="flex flex-col gap-5 rounded-3xl border border-stone-200/90 bg-stone-100/70 p-6 shadow-xs sm:p-8 dark:border-stone-800 dark:bg-stone-900/60"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
          Lectura del día
        </span>
        <span className="text-xs font-medium tracking-wide text-stone-500 dark:text-stone-400">
          NTV
        </span>
      </div>

      <div className="space-y-4 font-serif text-lg leading-relaxed text-stone-900 sm:text-xl sm:leading-loose dark:text-stone-100">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-justify">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-stone-200/70 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800">
        <cite className="font-serif text-base font-bold not-italic text-emerald-800 dark:text-emerald-400">
          {passage.reference}
        </cite>

        <Link
          href={`/leer/${day.bookId}/${day.chapterId}`}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:border-amber-600 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-amber-500"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Leer en el lector
        </Link>
      </div>
    </article>
  );
}

export default async function DayPage({ params }: DayPageProps) {
  const { dia } = await params;
  const day = getDiscipleshipDay(Number(dia));

  if (!day) {
    notFound();
  }

  const previous = getDiscipleshipDay(day.day - 1);
  const next = getDiscipleshipDay(day.day + 1);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      {/* Migas de pan */}
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
          href="/discipulado"
          className="flex min-h-[44px] items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100"
        >
          <Sprout className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Discipulado</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
        <span className="font-semibold text-stone-800 dark:text-stone-200">
          Día {day.day}
        </span>
      </nav>

      {/* Encabezado del día */}
      <header className="flex flex-col gap-1.5 border-b border-stone-200 pb-4 dark:border-stone-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Día {day.day} de {DISCIPLESHIP_TOTAL_DAYS}
        </span>
        <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
          {day.title}
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {day.reference}
        </p>
      </header>

      {/* Pasaje del día (fetch en el servidor) */}
      <Suspense fallback={<PassageSkeleton />}>
        <DayPassage day={day} />
      </Suspense>

      {/* Reflexión, oración y acción práctica */}
      <GuideSection
        icon={MessageCircleQuestion}
        title="Para reflexionar"
        accent="amber"
      >
        {day.reflection}
      </GuideSection>

      <GuideSection icon={HandHeart} title="Oración" accent="emerald">
        {day.prayer}
      </GuideSection>

      <GuideSection icon={Footprints} title="Acción práctica" accent="sky">
        {day.action}
      </GuideSection>

      {/* Marca de completado y notas personales */}
      <DayCompletion day={day.day} />
      <DayNotes day={day.day} />

      {/* Navegación entre días */}
      <nav
        aria-label="Navegación entre días"
        className="flex items-center justify-between gap-3 border-t border-stone-200/80 pt-6 dark:border-stone-800"
      >
        {previous ? (
          <Link
            href={`/discipulado/${previous.day}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:border-amber-600 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Día {previous.day}</span>
          </Link>
        ) : (
          <span className="min-h-[44px]" />
        )}

        {next ? (
          <Link
            href={`/discipulado/${next.day}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:border-amber-600 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-500"
          >
            <span>Día {next.day}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            href="/discipulado"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-800 active:scale-95 dark:bg-emerald-600 dark:text-stone-950 dark:hover:bg-emerald-500"
          >
            <Sprout className="h-4 w-4" aria-hidden="true" />
            <span>Volver al plan</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
