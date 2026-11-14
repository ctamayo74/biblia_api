import { Suspense } from "react";
import type { Metadata } from "next";
import { Brain } from "lucide-react";
import { MemorizationTool } from "@/components/memorizar/MemorizationTool";

export const metadata: Metadata = {
  title: "Memorizar Versículos",
  description:
    "Guarda la Palabra en tu corazón: practica, completa y recita tus versículos cada día.",
};

const DEFAULT_BIBLE_ID = process.env.BIBLE_DEFAULT_ID || "826f63861180e056-01";

function ToolSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6 animate-pulse">
      <div className="h-20 rounded-2xl bg-stone-200 dark:bg-stone-800" />
      <div className="h-16 rounded-2xl bg-stone-200 dark:bg-stone-800" />
      <div className="h-64 rounded-3xl bg-stone-200 dark:bg-stone-800" />
    </div>
  );
}

export default function MemorizarPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
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
              Lee, completa y recita tus versículos para no olvidarlos jamás.
            </p>
          </div>
        </div>
      </header>

      <Suspense fallback={<ToolSkeleton />}>
        <MemorizationTool bibleId={DEFAULT_BIBLE_ID} />
      </Suspense>
    </div>
  );
}
