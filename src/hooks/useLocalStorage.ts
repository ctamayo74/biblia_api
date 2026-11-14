"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Opciones de configuración del hook. */
export interface UseLocalStorageOptions<T> {
  /**
   * Función que convierte la cadena cruda de localStorage en el valor tipado.
   * Permite validar y sanear datos antes de usarlos. Por defecto usa JSON.parse.
   * Debe ser una referencia estable (definida fuera del componente).
   */
  parse?: (raw: string) => T;
}

/**
 * Hook genérico para sincronizar estado con localStorage de forma segura para SSR.
 *
 * - El estado inicial siempre es `initialValue`, por lo que el render en el
 *   servidor y la primera hidratación coinciden (sin errores de hidratación).
 * - `localStorage` se lee **solo dentro de `useEffect`**, es decir, en el navegador.
 *
 * Devuelve `[valor, setValor, isLoaded]`.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: T | ((previous: T) => T)) => void, boolean] {
  const { parse } = options;
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);
  const valueRef = useRef<T>(initialValue);

  // Leer el valor guardado al montar (solo en el navegador)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed = parse ? parse(raw) : (JSON.parse(raw) as T);
        valueRef.current = parsed;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura de localStorage únicamente tras montar (requisito SSR)
        setStoredValue(parsed);
      }
    } catch {
      // Ignorar datos corruptos o almacenamiento no disponible
    } finally {
      setIsLoaded(true);
    }
  }, [key, parse]);

  const setValue = useCallback(
    (value: T | ((previous: T) => T)) => {
      const next =
        typeof value === "function"
          ? (value as (previous: T) => T)(valueRef.current)
          : value;

      valueRef.current = next;
      setStoredValue(next);

      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Si el almacenamiento no está disponible, conservar solo el estado
      }
    },
    [key]
  );

  return [storedValue, setValue, isLoaded];
}
