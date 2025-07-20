import axios from 'axios';
import { Employe } from '../types/Employe';

const API_URL = 'http://localhost:2233/api/employes';

export const getAllEmployes = async (): Promise<Employe[]> => {
  const response = await axios.get<Employe[]>(API_URL);
  return response.data;
};

export const createEmploye = async (formData: FormData): Promise<Employe> => {
  const response = await axios.post<Employe>(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
