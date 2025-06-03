
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  prompt(): Promise<void>;
}

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const { addNotification } = useAppStore();

  useEffect(() => {
    // Verificar se está em modo standalone (PWA instalado)
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    
    // Verificar se já está instalado
    setIsInstalled('serviceWorker' in navigator);

    // Listener para evento de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Listener para quando app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      addNotification({
        type: 'success',
        title: 'App Instalado!',
        message: 'Viva+ foi instalado com sucesso no seu dispositivo.',
      });
    };

    // Service Worker update detection
    const handleSWUpdate = () => {
      setUpdateAvailable(true);
      addNotification({
        type: 'info',
        title: 'Atualização Disponível',
        message: 'Uma nova versão do Viva+ está disponível.',
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', handleSWUpdate);
          
          // Verificar se há update disponível
          if (registration.waiting) {
            setUpdateAvailable(true);
          }
        })
        .catch((error) => {
          console.error('SW registration failed:', error);
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [addNotification]);

  const installApp = async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Installation failed:', error);
      return false;
    }
  };

  const updateApp = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  };

  const canInstall = !!deferredPrompt;

  return {
    isInstalled,
    isStandalone,
    canInstall,
    updateAvailable,
    installApp,
    updateApp,
  };
};

// Hook para notificações push simplificado
export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    const permission = await Notification.requestPermission();
    setPermission(permission);
    return permission === 'granted';
  };

  const subscribe = async (vapidKey: string) => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push messaging not supported');
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidKey,
    });

    setSubscription(subscription);
    return subscription;
  };

  const unsubscribe = async () => {
    if (subscription) {
      await subscription.unsubscribe();
      setSubscription(null);
    }
  };

  return {
    permission,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe,
  };
};
