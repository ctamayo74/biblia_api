"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { isValidVerseId, normalizeVerseId } from "@/lib/memorization";
import type { AddVerseResult } from "@/types/memorization";

interface AddVerseFormProps {
  onAdd: (referenceId: string) => Promise<AddVerseResult>;
  isAdding: boolean;
}

/** Formulario para agregar versículos por referencia con validación de formato. */
export function AddVerseForm({ onAdd, isAdding }: AddVerseFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const referenceId = normalizeVerseId(value);

    if (!referenceId) {
      setError("Escribe una referencia, por ejemplo ROM.8.28.");
      return;
    }

    if (!isValidVerseId(referenceId)) {
      setError("Formato inválido. Usa LIBRO.CAPÍTULO.VERSÍCULO, por ejemplo ROM.8.28.");
      return;
    }

    setError(null);
    const result = await onAdd(referenceId);

    if (result.ok) {
      setValue("");
    } else {
      setError(result.error ?? "No se pudo agregar el versículo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label
        htmlFor="add-verse-input"
        className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400"
      >
        Agregar versículo
      </label>

      <div className="flex gap-2">
        <input
          id="add-verse-input"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) {
              setError(null);
            }
          }}
          placeholder="Ej. ROM.8.28"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "add-verse-error" : undefined}
          className="min-h-[44px] flex-1 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-sm font-medium uppercase text-stone-800 shadow-2xs transition-colors placeholder:normal-case placeholder:text-stone-400 hover:border-amber-600 focus:border-amber-600 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:placeholder:text-stone-600 dark:hover:border-amber-500"
        />

        <button
          type="submit"
          disabled={isAdding}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-2 text-sm font-semibold text-stone-50 shadow-xs transition-all hover:bg-amber-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-amber-600 dark:text-stone-950 dark:hover:bg-amber-500"
        >
          {isAdding ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Plus className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">Agregar</span>
        </button>
      </div>

      {error && (
        <p
          id="add-verse-error"
          role="alert"
          className="text-xs font-medium text-rose-700 dark:text-rose-400"
        >
          {error}
        </p>
      )}
    </form>
  );
}
