import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar estados boolean
 * @param {boolean} initialValue - Valor inicial
 * @returns {[boolean, object]} - [value, { toggle, setTrue, setFalse, setValue }]
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [
    value,
    {
      toggle,
      setTrue,
      setFalse,
      setValue
    }
  ];
};
