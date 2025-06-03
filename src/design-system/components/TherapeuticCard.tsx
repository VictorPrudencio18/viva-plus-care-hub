
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const therapeuticCardVariants = cva(
  [
    'relative overflow-hidden',
    'bg-white border border-neutral-200',
    'transition-all duration-300 ease-out',
    'group',
  ],
  {
    variants: {
      variant: {
        // Card padrão - minimalista e calmo
        default: [
          'shadow-md hover:shadow-lg',
          'hover:-translate-y-1',
          'rounded-xl',
        ],
        
        // Card terapêutico - design especial para conteúdo sensível
        therapeutic: [
          'bg-gradient-therapeutic',
          'border-primary-200',
          'shadow-therapeutic',
          'hover:shadow-glow',
          'rounded-2xl',
          'backdrop-blur-sm',
        ],
        
        // Card elevado - maior destaque
        elevated: [
          'shadow-xl hover:shadow-2xl',
          'hover:-translate-y-2',
          'rounded-2xl',
          'bg-gradient-to-br from-white to-neutral-50',
        ],
        
        // Card interativo - para ações
        interactive: [
          'shadow-md hover:shadow-xl',
          'hover:-translate-y-1 hover:scale-[1.02]',
          'cursor-pointer',
          'rounded-xl',
          'border-2 border-transparent',
          'hover:border-primary-200',
          'active:scale-[0.98]',
        ],
        
        // Card de estado emocional
        emotional: [
          'border-2',
          'rounded-2xl',
          'shadow-lg',
          'bg-gradient-to-br from-white via-accent-50/30 to-primary-50/30',
        ],
        
        // Card glassmorphism
        glass: [
          'bg-white/80 backdrop-blur-lg',
          'border-white/30',
          'shadow-xl',
          'rounded-2xl',
        ],
      },
      
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      
      // Estados emocionais para bordas
      emotion: {
        neutral: 'border-neutral-200',
        positive: 'border-positive-200 bg-positive-50/30',
        urgent: 'border-urgent-200 bg-urgent-50/30',
        warning: 'border-warning-200 bg-warning-50/30',
        calm: 'border-primary-200 bg-primary-50/30',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      emotion: 'neutral',
    },
  }
);

export interface TherapeuticCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof therapeuticCardVariants> {
  glow?: boolean;
  pulse?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  overlay?: React.ReactNode;
}

const TherapeuticCard = forwardRef<HTMLDivElement, TherapeuticCardProps>(
  ({ 
    className, 
    variant, 
    padding, 
    emotion,
    glow,
    pulse,
    header,
    footer,
    overlay,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        className={cn(
          therapeuticCardVariants({ variant, padding, emotion }),
          {
            'shadow-glow': glow,
            'animate-pulse-gentle': pulse,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Efeito de brilho sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        
        {/* Header do card */}
        {header && (
          <div className="border-b border-neutral-100 pb-4 mb-4">
            {header}
          </div>
        )}
        
        {/* Conteúdo principal */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Footer do card */}
        {footer && (
          <div className="border-t border-neutral-100 pt-4 mt-4">
            {footer}
          </div>
        )}
        
        {/* Overlay opcional */}
        {overlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {overlay}
          </div>
        )}
      </div>
    );
  }
);

TherapeuticCard.displayName = 'TherapeuticCard';

export { TherapeuticCard, therapeuticCardVariants };
