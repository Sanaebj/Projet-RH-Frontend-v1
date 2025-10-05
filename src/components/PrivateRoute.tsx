import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode } from 'react'; // ✅ corrige l'import
import { decodeToken, TokenPayload } from '../services/decodeToken';

interface PrivateRouteProps {
  allowedRoles?: string[];
  children?: ReactNode; // accepte plusieurs enfants
  signinPath?: string;  // chemin relatif, sans le basename
}

const PrivateRoute = ({
  allowedRoles,
  children,
  signinPath = '/auth/signin',
}: PrivateRouteProps) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to={signinPath} replace />;

  let decoded: TokenPayload;
  try {
    decoded = decodeToken(token);
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
