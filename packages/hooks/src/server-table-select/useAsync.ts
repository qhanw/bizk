import { useCallback, useEffect, useMemo, useState } from 'react';

type AsyncOptions<TData, TParams extends any[]> = {
  manual?: boolean;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
};

// type Service<TData, TParams extends any[]> = (params: TParams) => Promise<TData>;

//  reference: https://usehooks.com/useAsync/
export default function useAsync<TData, TParams extends any[]>(
  //fn: Service<TData, TParams>,
  fn: (...params: any) => Promise<TData>,
  opts?: AsyncOptions<TData, TParams>,
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TData>();

  const { manual, onError, onSuccess } = useMemo(() => opts || { manual: false }, [opts]);

  const run = useCallback(
    async (...args: TParams) => {
      setLoading(true);

      try {
        const res = await fn(...args);
        setData(res as TData);
        onSuccess?.(res as TData, args);
        setLoading(false);
        return res;
      } catch (error: any) {
        onError?.(error, args);
        setLoading(false);
        throw error;
      }
    },
    [fn, opts],
  );

  useEffect(() => {
    if (!manual) run(...([] as any));
  }, [manual]);

  return { loading, data, run } as Result<TData, TParams>;
}

type Result<TData, TParams extends any[]> = {
  loading: boolean;
  data?: TData;
  error?: Error;
  params: TParams | [];

  run: (...params: TParams) => Promise<TData>;
};
