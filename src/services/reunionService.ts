import axios from 'axios';
import { Reunion } from '../types/Reunion';
import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:2233/api/reunions';

// Fonction utilitaire pour ajouter le token JWT
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token JWT manquant !');
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log('Headers envoyés:', headers);
  return headers;
};

// Récupérer toutes les réunions
export const getAllReunions = async (): Promise<Reunion[]> => {
  const response = await axios.get<Reunion[]>(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Récupérer uniquement les réunions à venir

export const deleteReunion = async (id: number) => {
  const response = await axiosInstance.delete(`/reunions/${id}`);
  return response.data;
};
