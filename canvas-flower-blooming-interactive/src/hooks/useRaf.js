import { useEffect, useRef } from 'react';

const useRaf = (onFrame, frequence = 33) => {
  const requestRef = useRef();
  const startTimeRef = useRef();
  const callback = (time) => {
    if (!startTimeRef.current) {
      startTimeRef.current = time;
    }
    const progress = time - startTimeRef.current;
    if (Math.floor((progress / frequence) % frequence) + 1 === frequence) {
      onFrame(progress);
    }
    requestRef.current = requestAnimationFrame(callback);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};

export { useRaf };
