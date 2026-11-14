"use client";

import { useState } from "react";
import { Check, CircleCheck, CircleX, Eye, Lightbulb, RotateCcw } from "lucide-react";
import type { MemorizationLevelValue } from "@/types/memorization";
import { getLevelInfo, normalizePhrase } from "@/lib/memorization";

interface TypeVerseExerciseProps {
  words: string[];
  level: MemorizationLevelValue;
  onComplete: () => void;
}

export function TypeVerseExercise({
  words,
  level,
  onComplete,
}: TypeVerseExerciseProps) {
  const levelInfo = getLevelInfo(level);

  const hintCount = Math.min(
    words.length,
    Math.max(0, Math.round(words.length * levelInfo.hintRatio))
  );
  const hintWords = words.slice(0, hintCount);

  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const isCorrect =
    value.trim().length > 0 &&
    normalizePhrase(value) === normalizePhrase(words.join(" "));

  function handleCheck() {
    setChecked(true);
    if (isCorrect) {
      onComplete();
    }
  }

  function handleReveal() {
    setValue(words.join(" "));
    setChecked(true);
    setRevealed(true);
  }

  function handleReset() {
    setValue("");
    setChecked(false);
    setRevealed(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Escribe el versículo completo de memoria. No importan las mayúsculas ni
        las tildes. Tiene{" "}
        <strong className="text-stone-700 dark:text-stone-300">
          {words.length}
        </strong>{" "}
        palabras.
      </p>

      {hintCount > 0 && !revealed && (
        <p className="flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50/70 p-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Pista:</strong> comienza con «
            {hintWords.join(" ")}…»
          </span>
        </p>
      )}

      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={5}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="Escribe el versículo de memoria"
        placeholder="Escribe aquí el versículo…"
        className={`w-full resize-y rounded-2xl border-2 bg-white p-4 font-serif text-lg leading-loose text-stone-900 outline-hidden transition-colors placeholder:text-stone-400 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-600 ${
          checked
            ? isCorrect
              ? "border-emerald-500 dark:border-emerald-500"
              : "border-rose-500 dark:border-rose-500"
            : "border-stone-200 focus:border-amber-600 dark:border-stone-800"
        }`}
      />

      {checked && (
        <p
          role="status"
          className={`flex items-center gap-2 text-sm font-semibold ${
            isCorrect
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-rose-700 dark:text-rose-400"
          }`}
        >
          {isCorrect ? (
            <>
              <CircleCheck className="h-4 w-4" aria-hidden="true" />
              ¡Excelente! Lo recordaste completo.
            </>
          ) : (
            <>
              <CircleX className="h-4 w-4" aria-hidden="true" />
              Aún no coincide del todo. Repasa y vuelve a intentarlo.
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
