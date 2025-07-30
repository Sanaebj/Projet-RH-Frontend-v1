import axios from 'axios';
import { Reunion } from '../types/Reunion';

const API_URL = 'http://localhost:2233/api/reunions';

export const getAllReunions = async (): Promise<Reunion[]> => {
    const response = await axios.get<Reunion[]>(API_URL);
    return response.data;
};

export const getUpcomingReunions = async (): Promise<Reunion[]> => {
    const response = await axios.get<Reunion[]>(`${API_URL}/upcoming`);
    return response.data;
};

export const createReunion = async (reunion: Omit<Reunion, 'id'>): Promise<Reunion> => {
    const response = await axios.post<Reunion>(API_URL, reunion);
    return response.data;
};
