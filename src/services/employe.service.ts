import axios from 'axios';
import { Employe } from '../types/Employe';

const API_URL = 'http://localhost:2233/api/employes';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  };
};

export const getAllEmployes = async (): Promise<Employe[]> => {
  const response = await axios.get<Employe[]>(API_URL, getAuthHeaders());
  return response.data;
};

export const getEmployeById = async (id: number): Promise<Employe> => {
  const response = await axios.get<Employe>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createEmploye = async (employe: Omit<Employe, 'id'>): Promise<Employe> => {
  const response = await axios.post<Employe>(API_URL, employe, getAuthHeaders());
  return response.data;
};

export const updateEmploye = async (id: number, employe: Partial<Employe>): Promise<Employe> => {
  const response = await axios.put<Employe>(`${API_URL}/${id}`, employe, getAuthHeaders());
  return response.data;
};

export const deleteEmploye = async (id: number): Promise<void> => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: token ? `Bearer ${token}` : '' },
  });
};
