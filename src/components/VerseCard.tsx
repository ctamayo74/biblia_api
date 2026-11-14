import Link from "next/link";
import { Brain } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import type { Verse } from "@/types/bible";
import type { VerseCategory } from "@/data/verses";

interface VerseCardProps {
  verse: Verse;
  category?: VerseCategory;
  theme?: string;
  versionName?: string;
}

const CATEGORY_LABELS: Record<VerseCategory, { label: string; badgeClass: string }> = {
  evangelio: {
    label: "Evangelio",
    badgeClass: "bg-rose-100 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300",
  },
  crecimiento: {
    label: "Crecimiento",
    badgeClass: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  memorizar: {
    label: "Para Memorizar",
    badgeClass: "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300",
  },
};

export function VerseCard({
  verse,
  category = "memorizar",
  theme,
  versionName = "NTV",
}: VerseCardProps) {
  const categoryConfig = CATEGORY_LABELS[category];
  const cleanContent = verse.content.trim();

  return (
    <article
      aria-label={`Versículo del día: ${verse.reference}`}
      className="flex flex-col gap-6 rounded-3xl border border-stone-200/90 bg-stone-100/70 p-6 shadow-xs sm:p-8 dark:border-stone-800 dark:bg-stone-900/60"
    >
      {/* Metadatos superiores */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-700/10 px-3 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-400/10 dark:text-amber-300">
            Versículo de Hoy
          </span>
          {categoryConfig && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryConfig.badgeClass}`}
            >
              {categoryConfig.label}
            </span>
          )}
        </div>
        <span className="text-xs font-medium tracking-wide text-stone-500 dark:text-stone-400">
          {versionName}
        </span>
      </div>

      {/* Contenido bíblico en tipografía serif editorial */}
      <div className="space-y-3">
        <blockquote className="font-serif text-xl leading-relaxed text-stone-900 sm:text-2xl sm:leading-loose dark:text-stone-100">
          &ldquo;{cleanContent}&rdquo;
        </blockquote>

        <div className="flex flex-col items-end">
          <cite className="font-serif text-base font-bold not-italic text-amber-800 sm:text-lg dark:text-amber-400">
            {verse.reference}
          </cite>
          {theme && (
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {theme}
            </span>
          )}
        </div>
      </div>

      {/* Acciones principales */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <Link
          href={`/memorizar?ref=${encodeURIComponent(verse.id)}`}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
        >
          <Brain className="h-4 w-4" aria-hidden="true" />
          <span>Memorizar este versículo</span>
        </Link>

        <ShareButton
          reference={verse.reference}
          text={cleanContent}
          className="w-full sm:w-auto"
        />
      </div>
    </article>
  );
}
