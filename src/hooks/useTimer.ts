import { useEffect, useRef, useState } from 'react';

export function useTimer(initialSeconds: number, onExpire?: () => void) {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) return prev - 1;
        try {
          onExpire && onExpire();
        } catch {}
        return initialSeconds;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as number);
        intervalRef.current = null;
      }
    };
  }, [isRunning, initialSeconds, onExpire]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = (seconds?: number) => {
    setIsRunning(false);
    setTimeLeft(seconds ?? initialSeconds);
  };

  return { timeLeft, isRunning, start, stop, reset, setTimeLeft } as const;
}
