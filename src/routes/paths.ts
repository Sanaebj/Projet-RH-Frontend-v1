export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'auth',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pageRoot}/dashboard`,
  employes: `/${rootPaths.pageRoot}/employes`,
  reunions: `/${rootPaths.pageRoot}/reunions`,
  demandes: `/${rootPaths.pageRoot}/demandes`,
  pointage: `/${rootPaths.pageRoot}/pointage`,
  settings: `/${rootPaths.pageRoot}/settings`,

  signin: `/${rootPaths.authRoot}/signin`,
  signup: `/${rootPaths.authRoot}/signup`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
