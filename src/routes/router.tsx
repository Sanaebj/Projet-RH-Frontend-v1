import { Suspense, lazy } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import PrivateRoute from 'components/PrivateRoute';
const App = lazy(() => import('App'));

// Pages Admin
const Dashboard = lazy(() => import('pages/dashboard/Dashbaord'));
const EmployeList = lazy(() => import('pages/employes/EmployeList'));
const EmployeCreate = lazy(() => import('pages/employes/EmployeCreate'));
const UpdateEmploye = lazy(() => import('pages/employes/UpdateEmploye'));
const ReunionList = lazy(() => import('pages/Reunions/ReunionList'));
const ReunionCreate = lazy(() => import('pages/Reunions/ReunionCreate'));
const ListeDemandes = lazy(() => import('pages/Documents/ListeDemandes'));
const PointageTable = lazy(() => import('pages/pointage/PointageTable'));
const Profile = lazy(() => import('pages/profile/Profile'));

// Pages Employé
const DashboardEmp = lazy(() => import('../SessionEmploye/pages/dashboard/DashboardEmp'));
const DemandesPage = lazy(() => import('../SessionEmploye/pages/dashboard/DemandesPage'));
const DemandeDocument = lazy(() => import('../SessionEmploye/pages/dashboard/DemandeDocument'));
const DemandeConge = lazy(() => import('../SessionEmploye/pages/dashboard/DemandeConge'));

// Auth
const Signin = lazy(() => import('pages/authentication/Signin'));

const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        // Routes Admin
        {
          path: '/',
          element: (
            <PrivateRoute allowedRoles={['ADMIN']} signinPath="/auth/signin">
              <MainLayout>
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
              </MainLayout>
            </PrivateRoute>
          ),
          children: [
            { index: true, element: <Dashboard /> },
            { path: 'employes', element: <EmployeList /> },
            { path: 'employes/add', element: <EmployeCreate /> },
            { path: 'employes/edit/:id', element: <UpdateEmploye /> },
            { path: 'reunions', element: <ReunionList /> },
            { path: 'reunions/add', element: <ReunionCreate /> },
            { path: 'demandes', element: <ListeDemandes /> },
            { path: 'pointage', element: <PointageTable /> },
            { path: 'profile', element: <Profile /> },
          ],
        },

        // Routes Employé
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

        // Auth
        {
          path: '/auth',
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [{ path: 'signin', element: <Signin /> }],
        },

        // 404 / fallback
        { path: '*', element: <Navigate to="/auth/signin" replace /> },
      ],
    },
  ],
  { basename: '/venus' },
);

export default router;
