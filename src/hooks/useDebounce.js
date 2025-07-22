import { useState, useEffect } from 'react';

/**
 * Hook para debounce de valores
 * @param {any} value - Valor a ser "debouncado"
 * @param {number} delay - Delay em milissegundos
 * @returns {any} - Valor com debounce aplicado
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook para debounce de funções (callbacks)
 * @param {function} callback - Função a ser executada
 * @param {number} delay - Delay em milissegundos
 * @returns {function} - Função com debounce aplicado
 */
export const useDebouncedCallback = (callback, delay) => {
  const [debounceTimer, setDebounceTimer] = useState(null);

  const debouncedCallback = (...args) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    setDebounceTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
};
