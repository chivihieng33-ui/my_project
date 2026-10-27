import { useEffect, useState } from "react";

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

/**
 * Mimics a real data fetch with a loading state so the UI can be
 * evaluated with realistic latency (and swapped for a live API call).
 */
export function useAsyncData<T>(
  loader: () => T,
  delay = 700,
  deps: unknown[] = [],
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    const timer = window.setTimeout(() => {
      if (cancelled) return;
      try {
        setState({ data: loader(), loading: false, error: null });
      } catch {
        setState({ data: null, loading: false, error: "Unable to load sample data." });
      }
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
