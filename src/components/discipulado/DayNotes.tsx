"use client";

import { useEffect, useRef, useState } from "react";
import { Check, NotebookPen } from "lucide-react";

interface DayNotesProps {
  /** Número del día cuyas notas se editan. */
  day: number;
}

/** Clave de localStorage donde se guardan las notas por día. */
const NOTES_STORAGE_KEY = "palabra-diaria:discipulado:notas";

/** Retardo del guardado automático (ms). */
const SAVE_DELAY_MS = 400;

type SaveStatus = "idle" | "saving" | "saved";

/** Lee las notas de un día concreto desde localStorage. */
function readNote(day: number): string {
  try {
    const raw = window.localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) {
      return "";
    }
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const value = parsed[String(day)];
    return typeof value === "string" ? value : "";
  } catch {
    return "";
  }
}

/** Guarda las notas de un día concreto en localStorage. */
function writeNote(day: number, value: string): void {
  try {
    const raw = window.localStorage.getItem(NOTES_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    const next = { ...parsed, [String(day)]: value };
    window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Si el almacenamiento no está disponible, se conserva solo el estado
  }
}

/** Campo de notas personales por día, con guardado automático en localStorage. */
export function DayNotes({ day }: DayNotesProps) {
  const [value, setValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const loadedValueRef = useRef<string | null>(null);

  // Cargar las notas guardadas al montar (solo en el navegador)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- carga única desde localStorage tras montar (requisito SSR) */
    const stored = readNote(day);
    loadedValueRef.current = stored;
    setValue(stored);
    setIsLoaded(true);
    setStatus("idle");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [day]);

  // Guardado automático con retardo mientras el usuario escribe
  useEffect(() => {
    if (!isLoaded || value === loadedValueRef.current) {
      return;
    }

    const handle = window.setTimeout(() => {
      writeNote(day, value);
      loadedValueRef.current = value;
      setStatus("saved");
    }, SAVE_DELAY_MS);

    return () => window.clearTimeout(handle);
  }, [day, value, isLoaded]);

  function handleChange(next: string) {
    setValue(next);
    setStatus("saving");
  }

  return (
    <section
      aria-labelledby={`notas-dia-${day}`}
      className="flex flex-col gap-3 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900"
    >
      <div className="flex items-center gap-2">
        <NotebookPen
          className="h-4 w-4 text-amber-700 dark:text-amber-400"
          aria-hidden="true"
        />
        <h2
          id={`notas-dia-${day}`}
          className="font-serif text-base font-bold text-stone-900 dark:text-stone-100"
        >
          Mis notas del día
        </h2>
      </div>

      <label htmlFor={`notas-input-${day}`} className="sr-only">
        Notas personales del día {day}
      </label>
      <textarea
        id={`notas-input-${day}`}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        rows={4}
        placeholder="Escribe aquí lo que Dios te hable hoy…"
        className="w-full resize-y rounded-xl border border-stone-300 bg-white p-3.5 text-sm leading-relaxed text-stone-800 outline-hidden transition-colors placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200 dark:placeholder:text-stone-600"
      />

      <p
        className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400"
        aria-live="polite"
      >
        {status === "saved" ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span className="text-emerald-700 dark:text-emerald-400">Guardado</span>
          </>
        ) : status === "saving" ? (
          <span>Guardando…</span>
        ) : (
          <span>Tus notas se guardan automáticamente en este dispositivo.</span>
        )}
      </p>
    </section>
  );
}
