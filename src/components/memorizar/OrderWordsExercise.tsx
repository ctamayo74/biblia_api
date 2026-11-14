"use client";

import { useMemo, useState } from "react";
import { CircleCheck, CircleX, RotateCcw, Shuffle } from "lucide-react";
import type { MemorizationLevelValue } from "@/types/memorization";
import { createSeededRandom, getLevelInfo } from "@/lib/memorization";

interface OrderWordsExerciseProps {
  words: string[];
  level: MemorizationLevelValue;
  seed: string;
  onComplete: () => void;
}

interface OrderToken {
  id: string;
  word: string;
}

/** Baraja una lista de fichas de forma determinista. */
function shuffleTokens(tokens: OrderToken[], seed: string): OrderToken[] {
  const result = [...tokens];
  const random = createSeededRandom(seed);

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function OrderWordsExercise({
  words,
  level,
  seed,
  onComplete,
}: OrderWordsExerciseProps) {
  const levelInfo = getLevelInfo(level);

  const fixedCount = Math.min(
    words.length,
    Math.max(0, Math.round(words.length * levelInfo.preFilledRatio))
  );

  const initial = useMemo(() => {
    const tokens: OrderToken[] = words.map((word, index) => ({
      id: `${seed}-${index}`,
      word,
    }));

    return {
      fixed: tokens.slice(0, fixedCount),
      shuffled: shuffleTokens(tokens.slice(fixedCount), `${seed}-order`),
    };
  }, [words, fixedCount, seed]);

  const [placed, setPlaced] = useState<OrderToken[]>(initial.fixed);
  const [pool, setPool] = useState<OrderToken[]>(initial.shuffled);

  const isFinished = pool.length === 0;
  const isCorrect = placed.map((token) => token.word).join(" ") === words.join(" ");

  function handlePick(token: OrderToken) {
    const nextPlaced = [...placed, token];
    const nextPool = pool.filter((item) => item.id !== token.id);

    setPlaced(nextPlaced);
    setPool(nextPool);

    if (
      nextPool.length === 0 &&
      nextPlaced.map((item) => item.word).join(" ") === words.join(" ")
    ) {
      onComplete();
    }
  }

  function handleRemove(token: OrderToken, index: number) {
    if (index < fixedCount) {
      return;
    }

    setPlaced(placed.filter((item) => item.id !== token.id));
    setPool([...pool, token]);
  }

  function handleReset() {
    setPlaced(initial.fixed);
    setPool(initial.shuffled);
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        Toca las palabras en orden para reconstruir el versículo.
        {fixedCount > 0 && " Las primeras palabras ya están ubicadas."}
      </p>

      {/* Zona de construcción */}
      <div
        aria-label="Versículo en construcción"
        className="flex min-h-[88px] flex-wrap content-start gap-2 rounded-2xl border border-stone-200 bg-stone-100/60 p-3 dark:border-stone-800 dark:bg-stone-900/50"
      >
        {placed.map((token, index) => (
          <button
            key={token.id}
            type="button"
            onClick={() => handleRemove(token, index)}
            disabled={index < fixedCount}
            aria-label={
              index < fixedCount
                ? `Palabra fija: ${token.word}`
                : `Quitar palabra: ${token.word}`
            }
            className={`rounded-lg px-3 py-2 font-serif text-base transition-colors ${
              index < fixedCount
                ? "cursor-default bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                : "bg-amber-100 text-amber-900 hover:bg-amber-200 active:scale-95 dark:bg-amber-950/60 dark:text-amber-300 dark:hover:bg-amber-900/60"
            }`}
          >
            {token.word}
          </button>
        ))}

        {placed.length === 0 && (
          <span className="self-center text-sm text-stone-400 dark:text-stone-600">
            Toca las palabras de abajo para empezar…
          </span>
        )}
      </div>

      {/* Fichas disponibles */}
      <div
        aria-label="Palabras disponibles"
        className="flex flex-wrap gap-2"
      >
        {pool.length > 0 ? (
          pool.map((token) => (
            <button
              key={token.id}
              type="button"
              onClick={() => handlePick(token)}
              aria-label={`Colocar palabra: ${token.word}`}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3 py-2 font-serif text-base text-stone-800 shadow-2xs transition-all hover:border-amber-600 hover:bg-amber-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:hover:border-amber-500 dark:hover:bg-stone-700"
            >
              {token.word}
            </button>
          ))
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
            <Shuffle className="h-4 w-4" aria-hidden="true" />
            Todas las palabras están colocadas.
          </span>
        )}
      </div>

      {isFinished && (
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
              ¡Orden correcto! Has reconstruido el versículo.
            </>
          ) : (
            <>
              <CircleX className="h-4 w-4" aria-hidden="true" />
              El orden no es correcto. Toca una palabra colocada para devolverla.
            </>
          )}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-2xs transition-colors hover:bg-stone-50 active:scale-95 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reiniciar orden
        </button>
      </div>
    </div>
  );
}
