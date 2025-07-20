export type Employe = {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  photo: string;
  motDePasseHash: string;
  matricule?: string;
  service: string;
  poste: string;
  salaire: string;
  genre: 'HOMME' | 'FEMME';
  statut: 'ACTIF' | 'INACTIF';
  dateCreation?: string;
  dateEmbauche: string;
};
