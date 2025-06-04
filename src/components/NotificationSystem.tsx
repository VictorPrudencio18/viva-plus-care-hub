
import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Bell } from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';

interface NotificationProps {
  notification: {
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
  };
  onClose: (id: string) => void;
  onMarkRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationProps> = ({
  notification,
  onClose,
  onMarkRead,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animar entrada
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-close se configurado
    if (notification.autoClose && !notification.persistent) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.autoClose, notification.persistent]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification.id);
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStyles = () => {
    const baseStyles = "border-l-4 shadow-lg backdrop-blur-sm";
    
    switch (notification.type) {
      case 'success':
        return `${baseStyles} bg-green-50/90 border-green-500 hover:bg-green-50`;
      case 'error':
        return `${baseStyles} bg-red-50/90 border-red-500 hover:bg-red-50`;
      case 'warning':
        return `${baseStyles} bg-orange-50/90 border-orange-500 hover:bg-orange-50`;
      default:
        return `${baseStyles} bg-blue-50/90 border-blue-500 hover:bg-blue-50`;
    }
  };

  return (
    <div
      className={cn(
        'p-4 rounded-lg transition-all duration-300 cursor-pointer group',
        getStyles(),
        isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        !notification.read && 'ring-2 ring-blue-200 ring-opacity-50',
      )}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              {notification.title}
            </p>
            <div className="flex items-center space-x-2">
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="mt-1 text-sm text-gray-600">
            {notification.message}
          </p>
          
          <p className="mt-2 text-xs text-gray-500">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </p>
          
          {notification.action && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                notification.action?.onClick();
              }}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {notification.action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications, markNotificationRead, clearNotifications } = useAppStore();
  const [visibleNotifications, setVisibleNotifications] = useState<typeof notifications>([]);

  useEffect(() => {
    // Mostrar apenas as últimas 5 notificações
    const recent = notifications.slice(0, 5);
    setVisibleNotifications(recent);
  }, [notifications]);

  const handleClose = (id: string) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {visibleNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={handleClose}
          onMarkRead={markNotificationRead}
        />
      ))}
      
      {notifications.length > 5 && (
        <div className="text-center">
          <button
            onClick={clearNotifications}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Limpar todas ({notifications.length})
          </button>
        </div>
      )}
    </div>
  );
};

// Hook para notificações
export const useNotifications = () => {
  const { addNotification } = useAppStore();

  const notify = {
    success: (title: string, message: string, options?: { action?: { label: string; onClick: () => void } }) =>
      addNotification({ type: 'success', title, message, ...options }),
    
    error: (title: string, message: string, options?: { persistent?: boolean }) =>
      addNotification({ type: 'error', title, message, persistent: true, ...options }),
    
    warning: (title: string, message: string) =>
      addNotification({ type: 'warning', title, message }),
    
    info: (title: string, message: string, options?: { autoClose?: boolean }) =>
      addNotification({ type: 'info', title, message, autoClose: true, ...options }),
  };

  return notify;
};

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead, clearNotifications } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notificações</h3>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Limpar todas
              </button>
            )}
          </div>
          
          <div className="divide-y max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 hover:bg-gray-50 cursor-pointer transition-colors',
                    !notification.read && 'bg-blue-50'
                  )}
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                      {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                      {notification.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
