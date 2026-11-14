"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ArrowRight,
  Loader2,
  PartyPopper,
  RefreshCw,
} from "lucide-react";
import { CURATED_VERSES } from "@/data/verses";
import { MEMORIZATION_MODES, getTodayKey, tokenizeVerse } from "@/lib/memorization";
import type {
  MemorizationLevelValue,
  MemorizationMode,
  PracticeVerse,
} from "@/types/memorization";
import { useMemorizationProgress } from "@/hooks/useMemorizationProgress";
import { useMemorizationPreferences } from "@/hooks/useMemorizationPreferences";
import { MemorizationStreak } from "@/components/memorizar/MemorizationStreak";
import { MemorizationModeSelector } from "@/components/memorizar/MemorizationModeSelector";
import { MemorizationLevelSelector } from "@/components/memorizar/MemorizationLevelSelector";
import { VersePicker } from "@/components/memorizar/VersePicker";
import { FillBlanksExercise } from "@/components/memorizar/FillBlanksExercise";
import { OrderWordsExercise } from "@/components/memorizar/OrderWordsExercise";
import { TypeVerseExercise } from "@/components/memorizar/TypeVerseExercise";

interface MemorizationPracticeProps {
  initialVerse: PracticeVerse;
  bibleId: string;
}

interface VerseApiResponse {
  data?: { id: string; reference: string; content: string };
  error?: string;
}

/** Devuelve el tema curado de un versículo, si existe en la lista. */
function getVerseTheme(verseId: string): string | undefined {
  return CURATED_VERSES.find((verse) => verse.id === verseId)?.theme;
}

/** Devuelve el id del siguiente versículo curado (cíclico). */
function getNextCuratedVerseId(verseId: string): string {
  const index = CURATED_VERSES.findIndex((verse) => verse.id === verseId);
  const nextIndex = (index + 1 + CURATED_VERSES.length) % CURATED_VERSES.length;
  return CURATED_VERSES[nextIndex].id;
}

export function MemorizationPractice({
  initialVerse,
  bibleId,
}: MemorizationPracticeProps) {
  const { progress, recordPractice } = useMemorizationProgress();
  const { mode, level, setMode, setLevel } = useMemorizationPreferences();

  const [verse, setVerse] = useState<PracticeVerse>(initialVerse);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [round, setRound] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const words = useMemo(() => tokenizeVerse(verse.content), [verse.content]);
  const theme = useMemo(() => getVerseTheme(verse.id), [verse.id]);
  const modeInfo = MEMORIZATION_MODES.find((item) => item.value === mode);
  const practicedToday = progress.lastPracticedDate === getTodayKey();

  const exerciseKey = `${mode}-${level}-${verse.id}-${round}`;
  const seed = `${verse.id}-${round}`;

  const handleSelectVerse = useCallback(
    async (verseId: string) => {
      if (verseId === verse.id) {
        return;
      }

      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/verse?bibleId=${encodeURIComponent(bibleId)}&verseId=${encodeURIComponent(verseId)}`
        );
        const json = (await response.json()) as VerseApiResponse;

        if (!response.ok || !json.data) {
          throw new Error(json.error || "No se pudo cargar el versículo.");
        }

        setVerse({
          id: json.data.id,
          reference: json.data.reference,
          content: json.data.content,
        });
        setRound(0);
        setIsCompleted(false);
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "No se pudo cargar el versículo. Inténtalo de nuevo."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [bibleId, verse.id]
  );

  const handleComplete = useCallback(() => {
    recordPractice(verse.id);
    setIsCompleted(true);
  }, [recordPractice, verse.id]);

  const handleModeChange = useCallback(
    (nextMode: MemorizationMode) => {
      setMode(nextMode);
      setIsCompleted(false);
      setRound((current) => current + 1);
    },
    [setMode]
  );

  const handleLevelChange = useCallback(
    (nextLevel: MemorizationLevelValue) => {
      setLevel(nextLevel);
      setIsCompleted(false);
      setRound((current) => current + 1);
    },
    [setLevel]
  );

  function handleRetry() {
    setIsCompleted(false);
    setRound((current) => current + 1);
  }

  function handleNextVerse() {
    void handleSelectVerse(getNextCuratedVerseId(verse.id));
  }

  return (
    <div className="flex flex-col gap-6">
      <MemorizationStreak
        streak={progress.streak}
        bestStreak={progress.bestStreak}
        masteredCount={progress.masteredVerseIds.length}
        practicedToday={practicedToday}
      />

      <VersePicker
        currentVerseId={verse.id}
        onSelect={handleSelectVerse}
        disabled={isLoading}
        isLoading={isLoading}
      />

      <section className="flex flex-col gap-6 rounded-3xl border border-stone-200/90 bg-white p-5 shadow-xs sm:p-6 dark:border-stone-800 dark:bg-stone-900">
        {/* Encabezado del versículo en práctica */}
        <header className="flex items-start justify-between gap-3 border-b border-stone-200/80 pb-4 dark:border-stone-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Práctica de memorización
            </span>
            <h2 className="mt-0.5 font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              {verse.reference}
            </h2>
            {theme && (
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {theme}
              </p>
            )}
          </div>
          {modeInfo && (
            <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {modeInfo.label}
            </span>
          )}
        </header>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
          >
            {error}
          </p>
        )}

        <MemorizationModeSelector current={mode} onChange={handleModeChange} />
        <MemorizationLevelSelector current={level} onChange={handleLevelChange} />

        <div className="border-t border-stone-200/80 pt-5 dark:border-stone-800">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-stone-500 dark:text-stone-400">
              <Loader2
                className="h-5 w-5 animate-spin text-amber-700 dark:text-amber-400"
                aria-hidden="true"
              />
              Cargando versículo…
            </div>
          ) : isCompleted ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <PartyPopper
                className="h-8 w-8 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                ¡Versículo memorizado!
              </h3>
              <p className="max-w-sm text-sm text-stone-500 dark:text-stone-400">
                Registramos tu práctica de hoy.
                {practicedToday && " Tu racha sigue creciendo."}
              </p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Otra ronda
                </button>
                <button
                  type="button"
                  onClick={handleNextVerse}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-2 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
                >
                  Siguiente versículo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : mode === "completar" ? (
            <FillBlanksExercise
              key={exerciseKey}
              words={words}
              level={level}
              seed={seed}
              onComplete={handleComplete}
            />
          ) : mode === "ordenar" ? (
            <OrderWordsExercise
              key={exerciseKey}
              words={words}
              level={level}
              seed={seed}
              onComplete={handleComplete}
            />
          ) : (
            <TypeVerseExercise
              key={exerciseKey}
              words={words}
              level={level}
              onComplete={handleComplete}
            />
          )}
        </div>

        {modeInfo && !isCompleted && !isLoading && (
          <p className="text-center text-xs text-stone-400 dark:text-stone-600">
            {modeInfo.description}
          </p>
        )}
      </section>
    </div>
  );
}
