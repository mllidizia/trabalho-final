import { useState, useEffect } from 'react';

/**
 * Hook customizado para gerenciar localStorage
 * @param {string} key - Chave para o localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {[any, function]} - [valor, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Função para ler o valor do localStorage
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage para chave "${key}":`, error);
      return initialValue;
    }
  };

  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(readValue);

  // Função para atualizar o valor
  const setValue = (value) => {
    try {
      // Permite que value seja uma função como useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Salva no estado
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Erro ao salvar no localStorage para chave "${key}":`, error);
    }
  };

  // Escuta mudanças no localStorage de outras abas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Erro ao processar mudança no localStorage:`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
};
