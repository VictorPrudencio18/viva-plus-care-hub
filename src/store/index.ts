
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos para notificações
interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  autoClose?: boolean;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

type AppState = {
  sidebarOpen: boolean;
  darkMode: boolean;
  notifications: Notification[];
  setSidebarOpen: (open: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};

// Estado de rede
type NetworkState = {
  isOnline: boolean;
  setOnline: (status: boolean) => void;
};

// Estado do usuário
interface User {
  id: string;
  name: string;
  email: string;
  type: 'servidor' | 'psicologo' | 'medico' | 'admin';
  avatar?: string;
}

type UserState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
};

// Criando os stores com zustand
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      darkMode: false,
      notifications: [],
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setDarkMode: (dark) => set({ darkMode: dark }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: Math.random().toString(36).substring(2, 9),
              timestamp: Date.now(),
              read: false,
            },
            ...state.notifications,
          ].slice(0, 50), // Limitar a 50 notificações
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        notifications: state.notifications,
      }),
    }
  )
);

export const useNetworkStatus = create<NetworkState>()((set) => ({
  isOnline: navigator.onLine,
  setOnline: (status) => set({ isOnline: status }),
}));

// Inicializar o monitoramento de status da rede
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useNetworkStatus.getState().setOnline(true);
  });
  window.addEventListener('offline', () => {
    useNetworkStatus.getState().setOnline(false);
  });
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);

