import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Accent = "amber" | "emerald" | "sky";

const ACCENTS: Record<Accent, { wrapper: string; icon: string }> = {
  amber: {
    wrapper:
      "border-amber-200/80 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20",
    icon: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-400",
  },
  emerald: {
    wrapper:
      "border-emerald-200/80 bg-emerald-50/60 dark:border-emerald-900/50 dark:bg-emerald-950/20",
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-400",
  },
  sky: {
    wrapper:
      "border-sky-200/80 bg-sky-50/60 dark:border-sky-900/50 dark:bg-sky-950/20",
    icon: "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-400",
  },
};

interface GuideSectionProps {
  icon: LucideIcon;
  title: string;
  accent?: Accent;
  children: ReactNode;
}

/** Sección con icono y título para reflexión, oración o acción. */
export function GuideSection({
  icon: Icon,
  title,
  accent = "amber",
  children,
}: GuideSectionProps) {
  const config = ACCENTS[accent];

  return (
    <section className={`flex gap-4 rounded-2xl border p-5 shadow-xs ${config.wrapper}`}>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.icon}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h2 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
          {title}
        </h2>
        <div className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          {children}
        </div>
      </div>
    </section>
  );
}
