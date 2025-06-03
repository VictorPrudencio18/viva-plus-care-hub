
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
  Bell,
  FileText,
  Wifi,
  WifiOff
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore, useUserStore } from '@/store';
import { useNetworkStatus } from '@/store';
import { Badge } from '@/components/ui/badge';

interface LayoutProps {
  children: React.ReactNode;
  userType?: 'servidor' | 'psicologo' | 'medico' | 'admin';
}

const Layout = ({ children, userType = 'servidor' }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnline = useNetworkStatus();
  
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    notifications,
    markNotificationRead 
  } = useAppStore();
  
  const { logout } = useUserStore();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: 'Dashboard', path: `/dashboard/${userType}` },
      { icon: Calendar, label: 'Agendamentos', path: '/agendamentos' },
      { icon: MessageCircle, label: 'Chat Viva', path: '/chat' },
    ];

    switch (userType) {
      case 'servidor':
        return [
          ...commonItems,
          { icon: Heart, label: 'Termômetro', path: '/termometro' },
          { icon: User, label: 'Perfil', path: '/perfil' },
        ];
      case 'psicologo':
      case 'medico':
        return [
          ...commonItems,
          { icon: User, label: 'Pacientes', path: '/pacientes' },
          { icon: FileText, label: 'Prontuários', path: '/prontuarios' },
          { icon: Settings, label: 'Configurações', path: '/configuracoes' },
        ];
      case 'admin':
        return [
          ...commonItems,
          { icon: User, label: 'Usuários', path: '/usuarios' },
          { icon: Settings, label: 'Sistema', path: '/sistema' },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <span className="text-xl font-bold text-gray-900">Viva+</span>
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
          {menuItems.map((item) => (
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
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
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
