
import React from 'react';
import LazyLoader from './LazyLoader';

// Componentes lazy-loaded para otimização
export const LazyServidorDashboard = React.lazy(() => 
  import('../pages/dashboard/ServidorDashboard')
);

export const LazyPsicologoDashboard = React.lazy(() => 
  import('../pages/dashboard/PsicologoDashboard')
);

export const LazyMedicoDashboard = React.lazy(() => 
  import('../pages/dashboard/MedicoDashboard')
);

export const LazyAdminDashboard = React.lazy(() => 
  import('../pages/dashboard/AdminDashboard')
);

export const LazyAgendamentos = React.lazy(() => 
  import('../pages/Agendamentos')
);

export const LazyTermometro = React.lazy(() => 
  import('../pages/Termometro')
);

export const LazyChatViva = React.lazy(() => 
  import('../pages/ChatViva')
);

export const LazyProntuarios = React.lazy(() => 
  import('../pages/Prontuarios')
);

export const LazyPerfil = React.lazy(() => 
  import('../pages/Perfil')
);

// HOC para wrapping automático com LazyLoader
export const withLazyLoader = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) => {
  return React.forwardRef<any, P>((props, ref) => (
    <LazyLoader fallback={fallback}>
      <Component {...props} ref={ref} />
    </LazyLoader>
  ));
};

// Componentes pré-configurados com LazyLoader
export const ServidorDashboard = withLazyLoader(LazyServidorDashboard);
export const PsicologoDashboard = withLazyLoader(LazyPsicologoDashboard);
export const MedicoDashboard = withLazyLoader(LazyMedicoDashboard);
export const AdminDashboard = withLazyLoader(LazyAdminDashboard);
export const Agendamentos = withLazyLoader(LazyAgendamentos);
export const Termometro = withLazyLoader(LazyTermometro);
export const ChatViva = withLazyLoader(LazyChatViva);
export const Prontuarios = withLazyLoader(LazyProntuarios);
export const Perfil = withLazyLoader(LazyPerfil);
