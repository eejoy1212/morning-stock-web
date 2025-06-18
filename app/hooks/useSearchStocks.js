// hooks/useSearchStocks.ts
import { useState, useEffect } from "react";

export function useSearchStocks(query) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setRows([]);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();

    fetch(`/api/stocks-search?q=${encodeURIComponent(query)}`, {
      signal: ctrl.signal,
    })
      .then((res) => res.json())
      .then((data) => setRows(data.rows ?? []))
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [query]);

  return { rows, loading };
}
