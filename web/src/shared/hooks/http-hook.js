import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const res = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });

        const data = await res.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortController
        );

        if (!res.ok) {
          throw new Error(data.message);
        }
        setIsLoading(false);

        return data;
      } catch (err) {
        setError(err.message);

        setIsLoading(false);

        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtr => abortCtr.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
