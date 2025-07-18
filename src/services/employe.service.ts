import axios from 'axios';
import { Employe } from '../types/Employe';

const API_URL = 'http://localhost:2233/api/employes';

export const getAllEmployes = async (): Promise<Employe[]> => {
  const response = await axios.get<Employe[]>(API_URL);
  return response.data;
};

export const createEmploye = async (employe: Employe): Promise<Employe> => {
  const response = await axios.post<Employe>(API_URL, employe);
  return response.data;
};
