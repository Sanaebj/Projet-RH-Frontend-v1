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
    console.log('Token envoyé avec la requête :', token);
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
    if (error.response) {
      const status = error.response.status;
      console.log('Erreur API status :', status);

      if (status === 401 || status === 403) {
        // Optionnel : tu peux afficher un message ou déclencher une action
        console.warn('Accès refusé par le serveur, token peut-être expiré.');
        // Ne pas supprimer automatiquement le token, laisser l'utilisateur décider
        // window.location.href = '/venus/auth/signin'; // Décommenter si tu veux forcer la redirection
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
