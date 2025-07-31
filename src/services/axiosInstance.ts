import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:2233/api',
  timeout: 10000, // Ajout d'un timeout
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Rediriger vers le login si pas de token
      window.location.href = '/venus/auth/signin';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Intercepteur pour les réponses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Gestion spécifique des 403
      console.error('Accès refusé - Token peut-être expiré');
      localStorage.removeItem('token');
      window.location.href = '/venus/auth/signin';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
