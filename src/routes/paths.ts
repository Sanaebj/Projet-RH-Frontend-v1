export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'auth',
  errorRoot: 'error',
  profile: '/profile',

};

export default {
  dashboard: `/${rootPaths.pageRoot}/dashboard`,
  employes: `/${rootPaths.pageRoot}/employes`,
  reunions: `/${rootPaths.pageRoot}/reunions`,
  demandes: `/${rootPaths.pageRoot}/demandes`,
  pointage: `/${rootPaths.pageRoot}/pointage`,

  signin: `/${rootPaths.authRoot}/signin`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `/${rootPaths.errorRoot}/404`,

  profile: rootPaths.profile,

};
