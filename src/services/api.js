import axios from 'axios';

export const categorias = [
  'Literatura',
  'Ficção Científica',
  'Fantasia',
  'Romance',
  'Tecnologia',
  'História',
  'Biografia',
  'Infantil',
  'Educação',
  'Filosofia'
];

// Configuração do Axios (para APIs reais)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptador para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptador para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

