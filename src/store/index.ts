
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { EmotionalState, AccessibilityConfig } from '@/design-system';

// Estado do usuário e autenticação
interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    type: 'servidor' | 'psicologo' | 'medico' | 'admin';
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  login: (user: UserState['user']) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserState['user']>) => void;
}

// Estado da aplicação global
interface AppState {
  theme: 'light' | 'dark' | 'auto';
  sidebarOpen: boolean;
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: number;
    read: boolean;
  }>;
  accessibility: AccessibilityConfig;
  emotionalState: EmotionalState;
  isOnline: boolean;
  lastSync: number;
}

interface AppActions {
  setTheme: (theme: AppState['theme']) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  updateAccessibility: (config: Partial<AccessibilityConfig>) => void;
  updateEmotionalState: (state: Partial<EmotionalState>) => void;
  setOnlineStatus: (status: boolean) => void;
  updateLastSync: () => void;
}

// Store do usuário com persistência
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
        updateProfile: (updates) => set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),
      }),
      {
        name: 'viva-plus-user',
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      }
    ),
    { name: 'UserStore' }
  )
);

// Store da aplicação com múltiplos middlewares
export const useAppStore = create<AppState & AppActions>()(
  devtools(
    subscribeWithSelector(
      persist(
        immer((set, get) => ({
          // Estado inicial
          theme: 'auto',
          sidebarOpen: false,
          notifications: [],
          accessibility: {
            reducedMotion: false,
            highContrast: false,
            fontSize: 'medium',
            focusVisible: true,
          },
          emotionalState: {
            type: 'neutral',
            intensity: 50,
            duration: 300,
          },
          isOnline: navigator.onLine,
          lastSync: Date.now(),

          // Ações
          setTheme: (theme) => set((state) => {
            state.theme = theme;
          }),
          
          toggleSidebar: () => set((state) => {
            state.sidebarOpen = !state.sidebarOpen;
          }),
          
          setSidebarOpen: (open) => set((state) => {
            state.sidebarOpen = open;
          }),
          
          addNotification: (notification) => set((state) => {
            state.notifications.unshift({
              ...notification,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
              read: false,
            });
            // Manter apenas as últimas 50 notificações
            if (state.notifications.length > 50) {
              state.notifications = state.notifications.slice(0, 50);
            }
          }),
          
          markNotificationRead: (id) => set((state) => {
            const notification = state.notifications.find(n => n.id === id);
            if (notification) {
              notification.read = true;
            }
          }),
          
          clearNotifications: () => set((state) => {
            state.notifications = [];
          }),
          
          updateAccessibility: (config) => set((state) => {
            Object.assign(state.accessibility, config);
          }),
          
          updateEmotionalState: (emotionalState) => set((state) => {
            Object.assign(state.emotionalState, emotionalState);
          }),
          
          setOnlineStatus: (status) => set((state) => {
            state.isOnline = status;
          }),
          
          updateLastSync: () => set((state) => {
            state.lastSync = Date.now();
          }),
        })),
        {
          name: 'viva-plus-app',
          partialize: (state) => ({
            theme: state.theme,
            accessibility: state.accessibility,
            emotionalState: state.emotionalState,
          }),
        }
      )
    ),
    { name: 'AppStore' }
  )
);

// Hook para monitoramento de conectividade
export const useNetworkStatus = () => {
  const { isOnline, setOnlineStatus } = useAppStore();

  React.useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus]);

  return isOnline;
};
