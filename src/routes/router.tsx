import { Suspense, lazy } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import MainLayout from 'layouts/main-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import AuthLayout from 'layouts/auth-layout';
import PrivateRoute from 'components/PrivateRoute';
import paths, { rootPaths } from './paths';

const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard/Dashbaord'));
const EmployeList = lazy(() => import('pages/employes/EmployeList'));
const EmployeCreate = lazy(() => import('pages/employes/EmployeCreate'));
const UpdateEmploye = lazy(() => import('pages/employes/UpdateEmploye'));
const ReunionList = lazy(() => import('pages/Reunions/ReunionList'));
const ReunionCreate = lazy(() => import('pages/Reunions/ReunionCreate'));
const ListeDemandes = lazy(() => import('pages/Documents/ListeDemandes'));
const PointageTable = lazy(() => import('pages/pointage/PointageTable'));
const Profile = lazy(() => import('pages/profile/Profile'));
const Signin = lazy(() => import('pages/authentication/Signin'));

// Routes Admin
const router = createBrowserRouter(
  [
    {
      element: <Suspense fallback={<Splash />}><App /></Suspense>,
      children: [
        {
          path: '/',
          element: (
            <PrivateRoute>
              <MainLayout>
                <Suspense fallback={<PageLoader />}><Outlet /></Suspense>
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
        {
          path: rootPaths.authRoot,
          element: <AuthLayout><Outlet /></AuthLayout>,
          children: [{ path: paths.signin, element: <Signin /> }],
        },
        { path: '*', element: <Navigate to={paths.signin} replace /> },
      ],
    },
  ],
  { basename: '/venus' }
);

export default router;
