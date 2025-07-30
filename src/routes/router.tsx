/* eslint-disable react-refresh/only-export-components */
import paths, { rootPaths } from './paths';
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layouts/main-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import AuthLayout from 'layouts/auth-layout';
import PrivateRoute from 'components/PrivateRoute';

const ListeDemandes = lazy(() => import('pages/Documents/ListeDemandes'));
const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard/Dashbaord'));
const Signin = lazy(() => import('pages/authentication/Signin'));
const EmployeList = lazy(() => import('pages/employes/EmployeList'));
const EmployeCreate = lazy(() => import('../pages/employes/EmployeCreate'));
const ReunionCreate = lazy(() => import('../pages/Reunions/ReunionCreate'));
const ReunionList = lazy(() => import('../pages/Reunions/ReunionList'));
const PointageTable = lazy(() => import('pages/absences/PointageTable.tsx'));

const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        // Protected Routes
        {
          path: '/',
          element: (
            <PrivateRoute>
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
            { path: 'reunions', element: <ReunionList /> },
            { path: 'reunions/add', element: <ReunionCreate /> },
            { path: 'demandes', element: <ListeDemandes /> },
            { path: 'pointage', element: <PointageTable /> },
          ],
        },

        // Auth Routes (public)
        {
          path: rootPaths.authRoot,
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            { path: paths.signin, element: <Signin /> },
          ],
        },
      ],
    },
  ],
  {
    basename: '/venus',
  },
);

export default router;
