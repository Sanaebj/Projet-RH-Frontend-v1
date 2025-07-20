export type Employe = {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  photo: string;
  matricule?: string;
  service: string;
  poste: string;
  salaire: string;
  genre: 'HOMME' | 'FEMME';
  dateEmbauche: string;
};
