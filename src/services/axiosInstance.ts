import axios from 'axios';

// Création de l'instance Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:2233/api',
  timeout: 10000,
});

// Intercepteur des requêtes pour ajouter le token si présent
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Intercepteur des réponses pour gérer 401/403 sans supprimer automatiquement le token
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
