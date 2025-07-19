import { ParticipationReunion } from './ParticipationReunion';

export interface Reunion {
    id: number;
    titre: string;
    dateHeure: string;
    lieu: string;
    description: string;
    participations?: ParticipationReunion[];
}
