export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemapEmp: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Dashboard',
    path: '/employee/dashboard',
    icon: 'ri:dashboard-fill',
    active: true,
  },
  {
    id: 'mes-demandes',
    subheader: 'Mes demandes',
    path: '/employee/demandes',
    icon: 'ic:outline-calendar-today',
  },
  {
    id: 'pointage',
    subheader: 'Pointage',
    path: '/employee/pointage',
    icon: 'material-symbols:account-balance-wallet-outline',
  },
  {
    id: 'reunions',
    subheader: 'Réunions',
    path: '/employee/reunions',
    icon: 'material-symbols:local-library-outline',
  },
  {
    id: 'solde-conges', // <-- nouvel item
    subheader: 'Solde de congés',
    path: '/employee/conges', // <-- page qui affichera le solde
    icon: 'material-symbols:paid-outline',
  },
];

export default sitemapEmp;
