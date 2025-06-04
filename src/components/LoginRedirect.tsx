
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const LoginRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirecionar para o dashboard específico do tipo de usuário
      navigate(`/dashboard/${user.type}`, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};

export default LoginRedirect;
