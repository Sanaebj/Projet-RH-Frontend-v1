import axios from 'axios';
import { Reunion } from '../types/Reunion';

export const getAllReunions = async (): Promise<Reunion[]> => {
    const response = await axios.get<Reunion[]>('http://localhost:2233/api/reunions');
    return response.data;
};
