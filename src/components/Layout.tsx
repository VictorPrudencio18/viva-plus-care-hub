
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  Heart, 
  MessageCircle, 
  User, 
  LogOut,
  Settings,
  FileText,
  Wifi,
  WifiOff,
  Users,
  BarChart3,
  Clock,
  CheckSquare,
  UserPlus,
  Shield
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore, useUserStore } from '@/store';
import { useNetworkStatus } from '@/store';
import { Badge } from '@/components/ui/badge';
import { NotificationCenter } from './NotificationSystem';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnline = useNetworkStatus();
  const { logout, user } = useAuth();
  
  const { 
    sidebarOpen, 
    setSidebarOpen,
  } = useAppStore();

  // Detectar tipo de usuário do contexto de autenticação
  const userType = user?.type || 'servidor';

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: `/dashboard/${userType}` },
    ];

    switch (userType) {
      case 'servidor':
        return [
          ...baseItems,
          { icon: Calendar, label: 'Agendamentos', path: '/agendamentos' },
          { icon: Heart, label: 'Termômetro', path: '/termometro' },
          { icon: MessageCircle, label: 'Chat Viva', path: '/chat-viva' },
          { icon: User, label: 'Perfil', path: '/perfil' },
        ];
      
      case 'psicologo':
      case 'medico':
        return [
          ...baseItems,
          { icon: Users, label: 'Pacientes', path: '/pacientes' },
          { icon: UserPlus, label: 'Novo Paciente', path: '/pacientes/novo' },
          { icon: FileText, label: 'Prontuários', path: '/prontuarios' },
          { icon: Calendar, label: 'Agendamentos', path: '/agendamentos' },
          { icon: Clock, label: 'Lista de Espera', path: '/lista-espera' },
          { icon: CheckSquare, label: 'Avaliações', path: '/avaliacoes' },
          { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
          { icon: MessageCircle, label: 'Chat Viva', path: '/chat-viva' },
          { icon: Settings, label: 'Configurações', path: '/configuracoes' },
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { icon: Users, label: 'Usuários', path: '/usuarios' },
          { icon: Shield, label: 'Sistema', path: '/sistema' },
          { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
          { icon: Calendar, label: 'Agendamentos', path: '/agendamentos' },
          { icon: MessageCircle, label: 'Chat Viva', path: '/chat-viva' },
          { icon: Settings, label: 'Configurações', path: '/configuracoes' },
        ];
      
      default:
        return baseItems;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getUserTypeName = () => {
    switch (userType) {
      case 'servidor': return 'Servidor';
      case 'psicologo': return 'Psicólogo';
      case 'medico': return 'Médico';
      case 'admin': return 'Administrador';
      default: return 'Usuário';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Viva+</span>
              <span className="text-xs text-gray-500">{getUserTypeName()}</span>
            </div>
            {!isOnline && (
              <Badge variant="destructive" className="text-xs">
                Offline
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {getMenuItems().map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t">
          {user && (
            <div className="mb-4 p-2 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          )}
          <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* Status de conectividade */}
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <span className="text-sm text-gray-600 hidden sm:inline">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <Button variant="ghost" size="sm" onClick={() => navigate('/perfil')}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
