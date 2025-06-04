
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserStore } from '@/store';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'servidor' | 'psicologo' | 'medico' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, login: storeLogin, logout: storeLogout, updateProfile: storeUpdateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  // Simular verificação de token ao inicializar
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('auth_token');
        if (token && user) {
          // Verificar se o token ainda é válido
          const isValid = await validateToken(token);
          if (!isValid) {
            await logout();
          }
        }
      } catch (error) {
        console.error('Erro ao verificar status de autenticação:', error);
        await logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      // Simular validação de token
      const response = await fetch('/api/validate-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simular login (em produção, fazer chamada real para API)
      const response = await simulateLogin(email, password);
      
      if (response.success) {
        const userData: User = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          type: response.user.type,
          avatar: response.user.avatar,
        };
        
        storeLogin(userData);
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
        
        toast({
          title: 'Login realizado!',
          description: `Bem-vindo de volta, ${userData.name}!`,
        });
        
        return true;
      } else {
        toast({
          title: 'Erro no login',
          description: response.message || 'Credenciais inválidas',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível conectar ao servidor',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Invalidar token no servidor
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    }

    // Limpar dados locais
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    storeLogout();
    
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso',
    });
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        storeUpdateProfile(updates);
        toast({
          title: 'Perfil atualizado',
          description: 'Suas informações foram salvas com sucesso',
        });
        return true;
      } else {
        throw new Error('Falha ao atualizar perfil');
      }
    } catch (error) {
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível salvar as alterações',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('auth_token', data.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Função simulada de login (substituir por implementação real)
const simulateLogin = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de rede
  
  // Simular validação
  if (email === 'admin@viva.com' && password === 'admin123') {
    return {
      success: true,
      user: {
        id: '1',
        name: 'Administrador',
        email: 'admin@viva.com',
        type: 'admin',
        avatar: '',
      },
      token: 'fake-jwt-token-' + Date.now(),
      refreshToken: 'fake-refresh-token-' + Date.now(),
    };
  }
  
  return {
    success: false,
    message: 'Email ou senha incorretos',
  };
};
