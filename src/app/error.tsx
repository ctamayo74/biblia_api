"use client";

import { ErrorState } from "@/components/errors/ErrorState";

/** Boundary de error raíz para las rutas que no definen el suyo. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorState error={error} reset={reset} />;
}
