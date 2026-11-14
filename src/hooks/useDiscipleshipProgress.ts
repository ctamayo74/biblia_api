"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DISCIPLESHIP_TOTAL_DAYS } from "@/data/plan-discipulado";
import type { DiscipleshipProgressStore } from "@/types/discipleship";

/** Clave de localStorage donde se guarda el progreso del plan. */
export const DISCIPLESHIP_STORAGE_KEY = "palabra-diaria:discipulado";

/** Estado inicial de un usuario nuevo. */
const EMPTY_STORE: DiscipleshipProgressStore = { completedDays: [] };

/** Valida y normaliza el progreso leído de localStorage. */
function parseProgress(raw: string): DiscipleshipProgressStore {
  try {
    const parsed = JSON.parse(raw) as Partial<DiscipleshipProgressStore>;
    const completedDays = Array.isArray(parsed.completedDays)
      ? Array.from(
          new Set(
            parsed.completedDays.filter(
              (day): day is number =>
                Number.isInteger(day) && day >= 1 && day <= DISCIPLESHIP_TOTAL_DAYS
            )
          )
        ).sort((a, b) => a - b)
      : [];

    return { completedDays };
  } catch {
    return EMPTY_STORE;
  }
}

/** Resultado del hook de progreso del plan de discipulado. */
export interface DiscipleshipProgress {
  /** Indica si ya se leyó localStorage (evita desajustes de hidratación). */
  isLoaded: boolean;
  /** Días completados. */
  completedDays: number[];
  /** Número de días completados. */
  completedCount: number;
  /** Total de días del plan. */
  total: number;
  /** Porcentaje de progreso (0-100). */
  percent: number;
  /** Indica si un día está completado. */
  isCompleted: (day: number) => boolean;
  /** Marca o desmarca un día como completado. */
  toggleDay: (day: number) => void;
}

/**
 * Hook de progreso del plan de discipulado, persistido en localStorage
 * con el hook genérico SSR-safe `useLocalStorage`.
 */
export function useDiscipleshipProgress(): DiscipleshipProgress {
  const [store, setStore, isLoaded] =
    useLocalStorage<DiscipleshipProgressStore>(
      DISCIPLESHIP_STORAGE_KEY,
      EMPTY_STORE,
      { parse: parseProgress }
    );

  const { completedDays } = store;

  const isCompleted = useCallback(
    (day: number) => completedDays.includes(day),
    [completedDays]
  );

  const toggleDay = useCallback(
    (day: number) => {
      setStore((previous) => ({
        completedDays: previous.completedDays.includes(day)
          ? previous.completedDays.filter((item) => item !== day)
          : [...previous.completedDays, day].sort((a, b) => a - b),
      }));
    },
    [setStore]
  );

  return useMemo(() => {
    const completedCount = completedDays.length;
    const total = DISCIPLESHIP_TOTAL_DAYS;
    const percent = Math.round((completedCount / total) * 100);

    return {
      isLoaded,
      completedDays,
      completedCount,
      total,
      percent,
      isCompleted,
      toggleDay,
    };
  }, [isLoaded, completedDays, isCompleted, toggleDay]);
}
