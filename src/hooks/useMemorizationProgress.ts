"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MemorizationProgress } from "@/types/memorization";
import {
  EMPTY_PROGRESS,
  MEMORIZATION_STORAGE_KEY,
  parseProgress,
  registerPractice,
} from "@/lib/memorization";

interface UseMemorizationProgressResult {
  progress: MemorizationProgress;
  recordPractice: (verseId: string) => void;
}

/**
 * Hook que sincroniza el progreso de memorización con localStorage.
 * Expone la racha, el mejor registro y la acción de registrar una práctica.
 */
export function useMemorizationProgress(): UseMemorizationProgressResult {
  const [progress, setProgress] = useState<MemorizationProgress>(EMPTY_PROGRESS);
  const progressRef = useRef<MemorizationProgress>(EMPTY_PROGRESS);

  // Cargar el progreso guardado al montar (localStorage no existe en el servidor)
  useEffect(() => {
    const stored = parseProgress(localStorage.getItem(MEMORIZATION_STORAGE_KEY));
    progressRef.current = stored;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratación única desde localStorage tras montar
    setProgress(stored);
  }, []);

  const recordPractice = useCallback((verseId: string) => {
    const next = registerPractice(progressRef.current, verseId);
    progressRef.current = next;
    setProgress(next);

    try {
      localStorage.setItem(MEMORIZATION_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Si el almacenamiento no está disponible, mantener el estado en memoria
    }
  }, []);

  return { progress, recordPractice };
}
