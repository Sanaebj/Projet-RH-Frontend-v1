import axios from 'axios';
import { Employe } from '../types/Employe';

const API_URL = 'http://localhost:2233/api/employes';

export const getAllEmployes = async (): Promise<Employe[]> => {
  const token = localStorage.getItem('token');
  console.log('Token envoyé:', token);
  const response = await axios.get<Employe[]>(API_URL, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return response.data;
};

export const createEmploye = async (employe: Employe): Promise<Employe> => {
  const token = localStorage.getItem('token');
  const response = await axios.post<Employe>(
    'http://localhost:2233/api/employes',
    employe,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  );
  return response.data;
};
