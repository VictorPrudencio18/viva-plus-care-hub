
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: ('servidor' | 'psicologo' | 'medico' | 'admin')[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedTypes = ['servidor', 'psicologo', 'medico', 'admin'],
  redirectTo = '/login'
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (user && allowedTypes.length > 0 && !allowedTypes.includes(user.type)) {
    // Redirecionar para o dashboard apropriado do usuário
    return <Navigate to={`/dashboard/${user.type}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
