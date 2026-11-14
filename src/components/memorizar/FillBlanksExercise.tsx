"use client";

import { useMemo, useState } from "react";
import { Check, CircleCheck, CircleX, Eye, RotateCcw } from "lucide-react";
import type { MemorizationLevelValue } from "@/types/memorization";
import {
  getHiddenWordIndices,
  getLevelInfo,
  normalizeWord,
} from "@/lib/memorization";

interface FillBlanksExerciseProps {
  words: string[];
  level: MemorizationLevelValue;
  seed: string;
  onComplete: () => void;
}

export function FillBlanksExercise({
  words,
  level,
  seed,
  onComplete,
}: FillBlanksExerciseProps) {
  const levelInfo = getLevelInfo(level);

  const hiddenIndices = useMemo(
    () => getHiddenWordIndices(words, levelInfo.hiddenRatio, `${seed}-blanks`),
    [words, levelInfo.hiddenRatio, seed]
  );

  const [values, setValues] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);

  function isCorrect(index: number): boolean {
    const expected = normalizeWord(words[index]);
    return expected.length > 0 && normalizeWord(values[index] ?? "") === expected;
  }

  const allCorrect = hiddenIndices.every(isCorrect);

  function handleChange(index: number, value: string) {
    setValues((current) => ({ ...current, [index]: value }));
  }

  function handleCheck() {
    setChecked(true);
    if (hiddenIndices.every(isCorrect)) {
      onComplete();
    }
  }

  function handleReveal() {
    const revealedValues: Record<number, string> = {};
    for (const index of hiddenIndices) {
      revealedValues[index] = words[index];
    }
    setValues(revealedValues);
    setChecked(true);
    setRevealed(true);
  }

  function handleReset() {
    setValues({});
    setChecked(false);
    setRevealed(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Completa las palabras que faltan. Se ocultan{" "}
        <strong className="text-stone-700 dark:text-stone-300">
          {hiddenIndices.length}
        </strong>{" "}
        de {words.length}.
      </p>

      <p className="font-serif text-lg leading-loose text-stone-900 sm:text-xl dark:text-stone-100">
        {words.map((word, index) => {
          const isHidden = hiddenIndices.includes(index);

          if (!isHidden || revealed) {
            return (
              <span key={index} className="mr-2 inline-block">
                {word}
              </span>
            );
          }

          const correct = checked && isCorrect(index);

          return (
            <input
              key={index}
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label={`Palabra ${index + 1} de ${words.length}`}
              value={values[index] ?? ""}
              onChange={(event) => handleChange(index, event.target.value)}
              style={{ width: `${Math.max(word.length, 5) + 2}ch` }}
              className={`mr-2 mb-1 inline-block min-h-[40px] rounded-lg border-2 bg-white px-2 text-center font-serif text-base align-middle text-stone-900 outline-hidden transition-colors dark:bg-stone-900 dark:text-stone-100 ${
                checked
                  ? correct
                    ? "border-emerald-500 dark:border-emerald-500"
                    : "border-rose-500 dark:border-rose-500"
                  : "border-dashed border-amber-600/70 focus:border-amber-600 dark:border-amber-500/70"
              }`}
            />
          );
        })}
      </p>

      {checked && (
        <p
          role="status"
          className={`flex items-center gap-2 text-sm font-semibold ${
            allCorrect
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-rose-700 dark:text-rose-400"
          }`}
        >
          {allCorrect ? (
            <>
              <CircleCheck className="h-4 w-4" aria-hidden="true" />
              ¡Correcto! Has completado el versículo.
            </>
          ) : (
            <>
              <CircleX className="h-4 w-4" aria-hidden="true" />
              Revisa las palabras marcadas en rojo e inténtalo de nuevo.
            </>
          )}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCheck}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
        >
          <Check className="h-4 w-4" aria-hidden="true" />
          Comprobar
        </button>

        <button
          type="button"
          onClick={handleReveal}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          Ver respuesta
        </button>

        <button
          type="button"
          onClick={handleReset}
          aria-label="Reiniciar ejercicio"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-600 shadow-2xs transition-colors hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
