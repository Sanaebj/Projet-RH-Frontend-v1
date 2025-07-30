import axios from 'axios';
import { Reunion } from '../types/Reunion';

const API_URL = 'http://localhost:2233/api/reunions';

// Fonction utilitaire pour ajouter le token JWT
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

// Récupérer toutes les réunions
export const getAllReunions = async (): Promise<Reunion[]> => {
  const response = await axios.get<Reunion[]>(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Récupérer uniquement les réunions à venir
export const getUpcomingReunions = async (): Promise<Reunion[]> => {
  const response = await axios.get<Reunion[]>(`${API_URL}/upcoming`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
