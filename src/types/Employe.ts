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
  genre: "HOMME" | "FEMME";
  dateCreation?: string;
  dateEmbauche: string;
  cin: string;
};

// Si ton backend renvoie une page Spring Boot
export type EmployePage = {
  content: Employe[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};
