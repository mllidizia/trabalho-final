import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook customizado para requisições de API
 * @param {string} url - URL da API
 * @param {object} options - Opções da requisição
 * @returns {object} - { data, loading, error, refetch }
 */
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    method = 'GET',
    body = null,
    headers = {},
    immediate = true
  } = options;

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.data = body;
      }

      const response = await axios(config);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro na requisição');
      console.error('Erro na API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const executeRequest = async () => {
      try {
        setLoading(true);
        setError(null);

        const config = {
          method,
          url,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        };

        if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
          config.data = body;
        }

        const response = await axios(config);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Erro na requisição');
        console.error('Erro na API:', err);
      } finally {
        setLoading(false);
      }
    };

    if (immediate && url) {
      executeRequest();
    }
  }, [url, method, body, headers, immediate]);

  const refetch = () => {
    if (url) {
      fetchData();
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
};

/**
 * Hook para operações CRUD
 * @param {string} baseUrl - URL base da API
 * @returns {object} - Métodos CRUD
 */
export const useCrud = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, data = null) => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        method,
        url: `${baseUrl}${url}`,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.data = data;
      }

      const response = await axios(config);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro na operação';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    create: (data) => request('POST', '', data),
    read: (id = '') => request('GET', id ? `/${id}` : ''),
    update: (id, data) => request('PUT', `/${id}`, data),
    delete: (id) => request('DELETE', `/${id}`),
    clearError: () => setError(null)
  };
};
