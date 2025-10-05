import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode } from 'react'; // ✅ corrige l'import
import { decodeToken, TokenPayload } from '../services/decodeToken';

interface PrivateRouteProps {
  allowedRoles?: string[];
  children?: ReactNode; // accepte plusieurs enfants
  signinPath?: string; // chemin relatif, sans le basename
}

const PrivateRoute = ({
  allowedRoles,
  children,
  signinPath = '/auth/signin', // ✅ absolut path
}: PrivateRouteProps) => {
  const token = localStorage.getItem('token');
  console.log('Token dans PrivateRoute:', token);

  if (!token) return <Navigate to={signinPath} replace />;

  let decoded: TokenPayload;
  try {
    decoded = decodeToken(token);
    console.log('Role dans PrivateRoute:', decoded.role);
  } catch {
    return <Navigate to={signinPath} replace />;
  }

  const userRole: string = decoded.role || '';

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={signinPath} replace />;
  }

  return <>{children || <Outlet />}</>;
};

export default PrivateRoute;
