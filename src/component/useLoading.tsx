import { useState, useCallback } from "react";

export default function useLoading() {
  const [isLoading, setState] = useState<boolean>(false);
  const load = useCallback((aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  }, []);
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
