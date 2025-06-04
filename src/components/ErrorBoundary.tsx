
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Log error to external service
    this.logErrorToService(error, errorInfo);
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // Em produção, enviar para serviço de logging como Sentry
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    console.group('🚨 Error Boundary - Detailed Log');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Full Context:', errorData);
    console.groupEnd();
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg shadow-xl border-red-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-800">
                Ops! Algo deu errado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-gray-600">
                  Encontramos um erro inesperado. Nossa equipe foi notificada automaticamente.
                </p>
                <p className="text-sm text-gray-500">
                  Código do erro: {this.state.error?.name || 'Unknown'}
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="bg-gray-50 p-4 rounded-lg border">
                  <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                    Detalhes técnicos (desenvolvimento)
                  </summary>
                  <div className="text-xs text-gray-600 space-y-2">
                    <p><strong>Erro:</strong> {this.state.error.message}</p>
                    <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </details>
              )}

              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={this.handleRetry}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Tentar Novamente
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Ir para Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const WithErrorBoundary = React.forwardRef<unknown, P>((props, ref) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...(props as P)} ref={ref as any} />
    </ErrorBoundary>
  ));
  
  WithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
}
