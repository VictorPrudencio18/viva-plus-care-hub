
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TherapeuticCard } from '@/design-system';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  error?: React.ReactNode;
}

interface LazyLoaderState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  LazyLoaderState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): LazyLoaderState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LazyLoader Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback = ({ error }: { error?: Error }) => (
  <TherapeuticCard variant="elevated" emotion="urgent" className="m-4">
    <div className="text-center p-6">
      <h3 className="text-lg font-semibold text-red-700 mb-2">
        Erro ao carregar componente
      </h3>
      <p className="text-red-600 mb-4">
        Ocorreu um erro inesperado. Tente recarregar a página.
      </p>
      {error && (
        <details className="text-sm text-gray-600">
          <summary className="cursor-pointer">Detalhes técnicos</summary>
          <code className="block mt-2 p-2 bg-gray-100 rounded text-left">
            {error.message}
          </code>
        </details>
      )}
    </div>
  </TherapeuticCard>
);

const DefaultLoadingFallback = () => (
  <TherapeuticCard variant="glass" className="m-4">
    <div className="space-y-4 p-6">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </TherapeuticCard>
);

export const LazyLoader: React.FC<LazyLoaderProps> = ({ 
  children, 
  fallback = <DefaultLoadingFallback />,
  error 
}) => {
  return (
    <ErrorBoundary fallback={error}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

// Hook para carregamento lazy otimizado
export const useLazyComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  deps: React.DependencyList = []
) => {
  const [Component, setComponent] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let mounted = true;
    
    setLoading(true);
    setError(null);
    
    importFn()
      .then((module) => {
        if (mounted) {
          setComponent(() => module.default);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return { Component, loading, error };
};

export default LazyLoader;
