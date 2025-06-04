
import React, { forwardRef, useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const therapeuticProgressVariants = cva(
  [
    'relative overflow-hidden',
    'bg-gray-200/50 backdrop-blur-sm',
    'transition-all duration-500 ease-out',
  ],
  {
    variants: {
      variant: {
        // Progress padrão - azul terapêutico
        default: [
          'rounded-full',
          'shadow-inner',
        ],
        
        // Progress terapêutico - gradiente calmante
        therapeutic: [
          'rounded-full',
          'bg-gradient-to-r from-blue-100/50 to-emerald-100/50',
          'shadow-therapeutic',
          'border border-white/30',
        ],
        
        // Progress moderno - glassmorphism
        glass: [
          'rounded-2xl',
          'bg-white/20 backdrop-blur-lg',
          'border border-white/30',
          'shadow-glass',
        ],
        
        // Progress elevado
        elevated: [
          'rounded-full',
          'shadow-xl',
          'bg-gradient-to-r from-gray-100 to-gray-200',
        ],
      },
      
      size: {
        sm: 'h-2',
        md: 'h-4',
        lg: 'h-6',
        xl: 'h-8',
      },
      
      // Estados emocionais
      emotion: {
        neutral: '',
        positive: 'bg-gradient-to-r from-emerald-100/50 to-green-100/50',
        urgent: 'bg-gradient-to-r from-red-100/50 to-pink-100/50',
        warning: 'bg-gradient-to-r from-orange-100/50 to-amber-100/50',
        calm: 'bg-gradient-to-r from-blue-100/50 to-cyan-100/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      emotion: 'neutral',
    },
  }
);

const progressIndicatorVariants = cva(
  [
    'h-full transition-all duration-1000 ease-out',
    'relative overflow-hidden',
    'flex items-center justify-center',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-gradient-to-r from-blue-500 to-blue-600',
          'rounded-full',
        ],
        
        therapeutic: [
          'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500',
          'rounded-full',
          'shadow-glow',
        ],
        
        glass: [
          'bg-gradient-to-r from-blue-400/80 to-emerald-400/80',
          'rounded-xl',
          'backdrop-blur-sm',
        ],
        
        elevated: [
          'bg-gradient-to-r from-blue-500 to-emerald-500',
          'rounded-full',
          'shadow-lg',
        ],
      },
      
      emotion: {
        neutral: 'bg-gradient-to-r from-blue-500 to-blue-600',
        positive: 'bg-gradient-to-r from-emerald-500 to-green-500',
        urgent: 'bg-gradient-to-r from-red-500 to-pink-500',
        warning: 'bg-gradient-to-r from-orange-500 to-amber-500',
        calm: 'bg-gradient-to-r from-blue-400 to-cyan-400',
      },
    },
    defaultVariants: {
      variant: 'default',
      emotion: 'neutral',
    },
  }
);

export interface TherapeuticProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof therapeuticProgressVariants> {
  value?: number;
  max?: number;
  animated?: boolean;
  showPercentage?: boolean;
  label?: string;
  glow?: boolean;
}

const TherapeuticProgress = forwardRef<HTMLDivElement, TherapeuticProgressProps>(
  ({ 
    className, 
    variant, 
    size, 
    emotion,
    value = 0, 
    max = 100,
    animated = true,
    showPercentage = false,
    label,
    glow,
    ...props 
  }, ref) => {
    const [currentValue, setCurrentValue] = useState(0);
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => {
          setCurrentValue(percentage);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setCurrentValue(percentage);
      }
    }, [percentage, animated]);

    return (
      <div className="space-y-2">
        {/* Label opcional */}
        {label && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            {showPercentage && (
              <span className="text-sm font-bold text-gray-800">
                {Math.round(currentValue)}%
              </span>
            )}
          </div>
        )}
        
        {/* Container do progress */}
        <div
          className={cn(
            therapeuticProgressVariants({ variant, size, emotion }),
            {
              'shadow-glow': glow,
            },
            className
          )}
          ref={ref}
          {...props}
        >
          {/* Barra de progresso */}
          <div
            className={cn(
              progressIndicatorVariants({ variant, emotion }),
              {
                'animate-pulse-gentle': glow,
              }
            )}
            style={{ 
              width: `${currentValue}%`,
              transition: animated ? 'width 1s ease-out' : 'none'
            }}
          >
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full animate-shimmer" />
            
            {/* Percentage no centro da barra */}
            {showPercentage && currentValue > 15 && (
              <span className="text-xs font-bold text-white/90 px-2">
                {Math.round(currentValue)}%
              </span>
            )}
          </div>
          
          {/* Efeito de ondulação para progresso ativo */}
          {animated && currentValue > 0 && (
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white/30 to-transparent animate-pulse opacity-50" />
          )}
        </div>
      </div>
    );
  }
);

TherapeuticProgress.displayName = 'TherapeuticProgress';

export { TherapeuticProgress, therapeuticProgressVariants };
