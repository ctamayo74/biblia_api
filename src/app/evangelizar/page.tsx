import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Share2 } from "lucide-react";
import { getPassage } from "@/lib/bible";
import {
  EVANGELISM_CLOSING,
  EVANGELISM_STEPS,
} from "@/data/evangelio";
import { StepNavigator } from "@/components/evangelizar/StepNavigator";
import { JourneySkeleton } from "@/components/skeletons/EvangelismSkeleton";
import type { JourneyStep } from "@/types/evangelism";

export const metadata: Metadata = {
  title: "Evangelizar",
  description:
    "Una guía paso a paso para compartir el evangelio: el amor de Dios, su gracia y una invitación a orar.",
};

const DEFAULT_BIBLE_ID = process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";

async function EvangelismJourney() {
  await connection();
  const bibleId = process.env.BIBLE_DEFAULT_ID || DEFAULT_BIBLE_ID;

  const results = await Promise.allSettled(
    EVANGELISM_STEPS.map((step) => getPassage(bibleId, step.passageId))
  );

  const steps: JourneyStep[] = EVANGELISM_STEPS.map((step, index) => {
    const result = results[index];
    return {
      ...step,
      text: result.status === "fulfilled" ? result.value.content.trim() : "",
    };
  });

  return <StepNavigator steps={steps} closing={EVANGELISM_CLOSING} />;
}

export default function EvangelizarPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="border-b border-stone-200 pb-4 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
            <Share2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
              Evangelizar
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Una guía sencilla para compartir el evangelio en seis pasos.
            </p>
          </div>
        </div>
      </header>

      <p className="text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-400">
        Recorre estos pasos con calma y, si quieres, compártelos uno por uno con
        alguien a quien aprecias. Cada paso incluye un versículo y una breve
        explicación.
      </p>

      <Suspense fallback={<JourneySkeleton />}>
        <EvangelismJourney />
      </Suspense>
    </div>
  );
}
