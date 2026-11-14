"use client";

import { ErrorState } from "@/components/errors/ErrorState";

/** Boundary de error del detalle de un día de discipulado. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      error={error}
      reset={reset}
      title="No pudimos cargar este día"
    />
  );
}
