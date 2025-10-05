import { Suspense, lazy } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import AuthLayout from 'layouts/auth-layout';
import PrivateRoute from '../../components/PrivateRoute';
import MainLayout from 'layouts/main-layout';

// Lazy loading pages
const App = lazy(() => import('App'));
const DashboardEmp = lazy(() => import('../pages/dashboard/DashboardEmp'));
const DemandesPage = lazy(() => import('../pages/dashboard/DemandesPage'));
const DemandeDocument = lazy(() => import('../pages/dashboard/DemandeDocument'));
const DemandeConge = lazy(() => import('../pages/dashboard/DemandeConge'));
const Signin = lazy(() => import('pages/authentication/Signin'));

const routerEmpl = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        // 🚀 Routes employé sécurisées
        {
          path: '/employee',
          element: (
            <PrivateRoute allowedRoles={['EMPLOYE']} signinPath="/auth/signin">
              <MainLayout>
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
              </MainLayout>
            </PrivateRoute>
          ),
          children: [
            { path: 'dashboard', element: <DashboardEmp /> },
            { path: 'demandes', element: <DemandesPage /> },
            { path: 'demandes/documents', element: <DemandeDocument /> },
            { path: 'demandes/conges', element: <DemandeConge /> },
          ],
        },

        // Routes Auth
        {
          path: '/auth',
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [{ path: 'signin', element: <Signin /> }],
        },

        // Route par défaut
        { path: '*', element: <Navigate to="/auth/signin" replace /> },
      ],
    },
  ],
  { basename: '/venus' } // ✅ tout est préfixé automatiquement
);

export default routerEmpl;
