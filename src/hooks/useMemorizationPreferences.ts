"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  MemorizationLevelValue,
  MemorizationMode,
} from "@/types/memorization";
import {
  DEFAULT_PREFERENCES,
  MEMORIZATION_PREFS_STORAGE_KEY,
  parsePreferences,
} from "@/lib/memorization";
import type { MemorizationPreferences } from "@/lib/memorization";

interface UseMemorizationPreferencesResult {
  mode: MemorizationMode;
  level: MemorizationLevelValue;
  setMode: (mode: MemorizationMode) => void;
  setLevel: (level: MemorizationLevelValue) => void;
}

/**
 * Hook que persiste en localStorage el modo y el nivel de práctica elegidos.
 */
export function useMemorizationPreferences(): UseMemorizationPreferencesResult {
  const [preferences, setPreferences] =
    useState<MemorizationPreferences>(DEFAULT_PREFERENCES);
  const preferencesRef = useRef<MemorizationPreferences>(DEFAULT_PREFERENCES);

  // Recuperar las preferencias guardadas al montar (localStorage no existe en el servidor)
  useEffect(() => {
    const stored = parsePreferences(
      localStorage.getItem(MEMORIZATION_PREFS_STORAGE_KEY)
    );
    preferencesRef.current = stored;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratación única desde localStorage tras montar
    setPreferences(stored);
  }, []);

  const applyPreferences = useCallback((next: MemorizationPreferences) => {
    preferencesRef.current = next;
    setPreferences(next);

    try {
      localStorage.setItem(
        MEMORIZATION_PREFS_STORAGE_KEY,
        JSON.stringify(next)
      );
    } catch {
      // Si el almacenamiento no está disponible, conservar solo el estado
    }
  }, []);

  const setMode = useCallback(
    (mode: MemorizationMode) => {
      applyPreferences({ ...preferencesRef.current, mode });
    },
    [applyPreferences]
  );

  const setLevel = useCallback(
    (level: MemorizationLevelValue) => {
      applyPreferences({ ...preferencesRef.current, level });
    },
    [applyPreferences]
  );

  return {
    mode: preferences.mode,
    level: preferences.level,
    setMode,
    setLevel,
  };
}
