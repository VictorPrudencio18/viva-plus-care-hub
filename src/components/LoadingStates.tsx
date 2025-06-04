
import React from 'react';
import { Loader2, Heart, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton as UISkeleton } from '@/components/ui/skeleton';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'therapeutic' | 'minimal';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    default: 'text-blue-600',
    therapeutic: 'text-emerald-500',
    minimal: 'text-gray-400',
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )} 
    />
  );
};

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  animate = true 
}) => {
  return (
    <UISkeleton
      className={cn(
        animate && 'animate-pulse',
        className
      )}
    />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="h-64 flex items-end space-x-2">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className={`w-full bg-gradient-to-t from-blue-200 to-blue-100`}
              style={{ height: `${Math.random() * 100 + 50}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  variant?: 'default' | 'therapeutic';
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Carregando...',
  variant = 'default',
}) => {
  if (!isVisible) return null;

  const Icon = variant === 'therapeutic' ? Heart : Brain;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Icon className="w-12 h-12 text-blue-500 animate-pulse" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-800 mb-2">
          {message}
        </p>
        <p className="text-sm text-gray-500">
          Aguarde alguns instantes...
        </p>
      </div>
    </div>
  );
};

interface ShimmerProps {
  className?: string;
  children: React.ReactNode;
}

export const Shimmer: React.FC<ShimmerProps> = ({ className, children }) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

interface PulseDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'emerald' | 'gray';
}

export const PulseLoad: React.FC<PulseDotsProps> = ({ 
  size = 'md', 
  color = 'blue' 
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    gray: 'bg-gray-400',
  };

  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-pulse',
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
};

export const LoadingPage: React.FC<{ message?: string }> = ({ 
  message = 'Carregando aplicação...' 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-4 bg-blue-500 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Viva+
          </h2>
          <p className="text-gray-600">
            {message}
          </p>
          <PulseLoad color="blue" />
        </div>
      </div>
    </div>
  );
};
