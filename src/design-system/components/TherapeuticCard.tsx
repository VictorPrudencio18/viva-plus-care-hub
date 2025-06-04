
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const therapeuticCardVariants = cva(
  [
    'relative overflow-hidden',
    'transition-all duration-300 ease-out',
    'group',
  ],
  {
    variants: {
      variant: {
        // Card padrão - sólido e moderno
        default: [
          'rounded-2xl',
          'bg-white border border-gray-200',
          'shadow-md hover:shadow-lg',
          'hover:scale-[1.02]',
        ],
        
        // Card terapêutico - design especial para conteúdo sensível
        therapeutic: [
          'bg-gradient-to-br from-blue-50 to-white',
          'border border-blue-200',
          'shadow-md hover:shadow-lg',
          'rounded-2xl',
          'hover:border-blue-300',
        ],
        
        // Card elevado - maior destaque
        elevated: [
          'shadow-lg hover:shadow-xl',
          'hover:-translate-y-2 hover:scale-105',
          'rounded-2xl',
          'bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30',
          'border border-gray-200 hover:border-blue-300',
        ],
        
        // Card interativo - para ações
        interactive: [
          'shadow-md hover:shadow-lg',
          'hover:-translate-y-1 hover:scale-[1.02]',
          'cursor-pointer',
          'rounded-2xl',
          'bg-white border border-gray-200',
          'hover:border-blue-300',
          'active:scale-[0.98] active:shadow-md',
          'transition-all duration-200',
        ],
        
        // Card de estado emocional
        emotional: [
          'border-2',
          'rounded-2xl',
          'shadow-md hover:shadow-lg',
          'bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30',
          'hover:from-white hover:via-blue-50/50 hover:to-emerald-50/50',
        ],
        
        // Card glassmorphism moderno - com menos transparência
        glass: [
          'bg-white/90 backdrop-blur-sm',
          'border border-gray-200/80',
          'shadow-lg',
          'rounded-2xl',
          'hover:bg-white/95',
          'hover:shadow-xl',
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
        neutral: 'border-gray-200',
        positive: 'border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-green-50/30',
        urgent: 'border-red-200 bg-gradient-to-br from-red-50/50 to-pink-50/30',
        warning: 'border-orange-200 bg-gradient-to-br from-orange-50/50 to-amber-50/30',
        calm: 'border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/30',
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
            'shadow-lg ring-2 ring-blue-200/50': glow,
            'animate-pulse': pulse,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Efeito de brilho sutil reduzido */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none rounded-2xl" />
        
        {/* Header do card */}
        {header && (
          <div className="border-b border-gray-100 pb-4 mb-4 relative z-10">
            {header}
          </div>
        )}
        
        {/* Conteúdo principal */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Footer do card */}
        {footer && (
          <div className="border-t border-gray-100 pt-4 mt-4 relative z-10">
            {footer}
          </div>
        )}
        
        {/* Overlay opcional */}
        {overlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
            {overlay}
          </div>
        )}
      </div>
    );
  }
);

TherapeuticCard.displayName = 'TherapeuticCard';

export { TherapeuticCard, therapeuticCardVariants };
