"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Brain } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  EMPTY_STORE,
  MEMORIZATION_STORAGE_KEY,
  hasPracticedToday,
  isValidVerseId,
  normalizeVerseId,
  parseStore,
  recordPractice,
} from "@/lib/memorization";
import type {
  AddVerseResult,
  MemorizationStore,
  MemorizedVerse,
} from "@/types/memorization";
import { StreakBadge } from "@/components/memorizar/StreakBadge";
import { AddVerseForm } from "@/components/memorizar/AddVerseForm";
import { VerseList } from "@/components/memorizar/VerseList";
import { PracticeCard } from "@/components/memorizar/PracticeCard";

interface MemorizationToolProps {
  bibleId: string;
}

interface VerseApiResponse {
  data?: { id: string; reference: string; content: string };
  error?: string;
}

/** Orquestador cliente del módulo de memorización. */
export function MemorizationTool({ bibleId }: MemorizationToolProps) {
  const [store, setStore, isLoaded] = useLocalStorage<MemorizationStore>(
    MEMORIZATION_STORAGE_KEY,
    EMPTY_STORE,
    { parse: parseStore }
  );

  const [selectedVerseId, setSelectedVerseId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const handledRef = useRef<string | null>(null);

  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref");

  // Agrega (o selecciona) un versículo a partir de su referencia
  const addVerseByReference = useCallback(
    async (referenceId: string): Promise<AddVerseResult> => {
      const id = normalizeVerseId(referenceId);

      if (!isValidVerseId(id)) {
        return {
          ok: false,
          error:
            "Formato inválido. Usa LIBRO.CAPÍTULO.VERSÍCULO, por ejemplo ROM.8.28.",
        };
      }

      const existing = store.verses.find((verse) => verse.id === id);
      if (existing) {
        setSelectedVerseId(existing.id);
        return { ok: true };
      }

      setIsAdding(true);
      try {
        const response = await fetch(
          `/api/verse?bibleId=${encodeURIComponent(bibleId)}&verseId=${encodeURIComponent(id)}`
        );
        const json = (await response.json()) as VerseApiResponse;

        if (!response.ok || !json.data) {
          throw new Error(json.error || "No se encontró el versículo.");
        }

        const verse: MemorizedVerse = {
          id: json.data.id,
          reference: json.data.reference,
          text: json.data.content.trim(),
          startedAt: new Date().toISOString(),
          masteryLevel: 0,
          lastPracticedAt: null,
        };

        setStore((previous) =>
          previous.verses.some((item) => item.id === verse.id)
            ? previous
            : { ...previous, verses: [...previous.verses, verse] }
        );
        setSelectedVerseId(verse.id);
        return { ok: true };
      } catch (error) {
        return {
          ok: false,
          error:
            error instanceof Error
              ? error.message
              : "No se pudo agregar el versículo. Revisa la referencia.",
        };
      } finally {
        setIsAdding(false);
      }
    },
    [bibleId, store.verses, setStore]
  );

  // Procesar el parámetro ?ref= del home (una sola vez por valor)
  useEffect(() => {
    if (!isLoaded || !refParam) {
      return;
    }

    if (handledRef.current === refParam) {
      return;
    }
    handledRef.current = refParam;

    void addVerseByReference(refParam).then((result) => {
      if (!result.ok && result.error) {
        setNotice(result.error);
      }
    });
  }, [isLoaded, refParam, addVerseByReference]);

  // Versículo seleccionado (o el primero de la lista como respaldo)
  const selectedVerse = useMemo(
    () =>
      store.verses.find((verse) => verse.id === selectedVerseId) ??
      store.verses[0] ??
      null,
    [store.verses, selectedVerseId]
  );

  const handlePractice = useCallback(
    (options: { mastered: boolean }) => {
      if (!selectedVerse) {
        return;
      }
      setStore((previous) =>
        recordPractice(previous, selectedVerse.id, options)
      );
    },
    [selectedVerse, setStore]
  );

  const handleRemove = useCallback(
    (verseId: string) => {
      setStore((previous) => ({
        ...previous,
        verses: previous.verses.filter((verse) => verse.id !== verseId),
      }));
    },
    [setStore]
  );

  if (!isLoaded) {
    return (
      <div aria-hidden="true" className="flex flex-col gap-6 animate-pulse">
        <div className="h-20 rounded-2xl bg-stone-200 dark:bg-stone-800" />
        <div className="h-16 rounded-2xl bg-stone-200 dark:bg-stone-800" />
        <div className="h-64 rounded-3xl bg-stone-200 dark:bg-stone-800" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <StreakBadge
        streak={store.streak}
        practicedToday={hasPracticedToday(store)}
      />

      <AddVerseForm onAdd={addVerseByReference} isAdding={isAdding} />

      {notice && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1">{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-xs font-semibold underline underline-offset-2"
          >
            Cerrar
          </button>
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <section className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
            <Brain className="h-4 w-4 text-amber-700 dark:text-amber-400" aria-hidden="true" />
            Mis versículos
            <span className="text-sm font-medium text-stone-400 dark:text-stone-600">
              ({store.verses.length})
            </span>
          </h2>

          <VerseList
            verses={store.verses}
            selectedId={selectedVerse?.id ?? null}
            onSelect={setSelectedVerseId}
            onRemove={handleRemove}
          />
        </section>

        <div>
          {selectedVerse ? (
            <PracticeCard
              key={selectedVerse.id}
              verse={selectedVerse}
              onPractice={handlePractice}
            />
          ) : (
            <div className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
              <Brain className="h-10 w-10 text-stone-400 dark:text-stone-600" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
                Selecciona un versículo para practicar
              </p>
              <p className="mt-1 max-w-sm text-xs text-stone-500 dark:text-stone-400">
                Agrega uno con el campo de arriba o toca «Memorizar este versículo»
                en la portada.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
