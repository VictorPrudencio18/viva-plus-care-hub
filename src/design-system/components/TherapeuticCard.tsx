
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const therapeuticCardVariants = cva(
  [
    'relative overflow-hidden',
    'bg-white/80 backdrop-blur-xl border border-white/20',
    'transition-all duration-500 ease-out',
    'group',
    'hover:shadow-2xl hover:-translate-y-2',
  ],
  {
    variants: {
      variant: {
        // Card padrão - minimalista e moderno
        default: [
          'rounded-3xl',
          'shadow-lg hover:shadow-xl',
          'hover:scale-[1.02]',
          'bg-gradient-to-br from-white/90 to-white/70',
        ],
        
        // Card terapêutico - design especial para conteúdo sensível
        therapeutic: [
          'bg-gradient-therapeutic',
          'border-primary-200/50',
          'shadow-therapeutic',
          'hover:shadow-glow',
          'rounded-3xl',
          'backdrop-blur-xl',
          'hover:border-primary-300/60',
        ],
        
        // Card elevado - maior destaque
        elevated: [
          'shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)]',
          'hover:-translate-y-3 hover:scale-105',
          'rounded-3xl',
          'bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30',
          'border-gradient-to-r from-blue-200/50 to-emerald-200/50',
        ],
        
        // Card interativo - para ações
        interactive: [
          'shadow-lg hover:shadow-2xl',
          'hover:-translate-y-2 hover:scale-[1.03]',
          'cursor-pointer',
          'rounded-3xl',
          'border-2 border-transparent',
          'hover:border-gradient-to-r hover:from-blue-300/50 hover:to-emerald-300/50',
          'active:scale-[0.98] active:shadow-lg',
          'transition-all duration-300',
        ],
        
        // Card de estado emocional
        emotional: [
          'border-2',
          'rounded-3xl',
          'shadow-xl',
          'bg-gradient-to-br from-white/90 via-primary-50/40 to-emerald-50/40',
          'hover:from-white via-primary-50/60 hover:to-emerald-50/60',
        ],
        
        // Card glassmorphism moderno
        glass: [
          'bg-white/20 backdrop-blur-2xl',
          'border-white/30',
          'shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]',
          'rounded-3xl',
          'hover:bg-white/30',
          'hover:shadow-[0_15px_45px_0_rgba(31,38,135,0.5)]',
        ],
      },
      
      padding: {
        none: 'p-0',
        sm: 'p-6',
        md: 'p-8',
        lg: 'p-10',
        xl: 'p-12',
      },
      
      // Estados emocionais para bordas
      emotion: {
        neutral: 'border-neutral-200/50',
        positive: 'border-emerald-300/50 bg-gradient-to-br from-emerald-50/30 to-green-50/20',
        urgent: 'border-red-300/50 bg-gradient-to-br from-red-50/30 to-pink-50/20',
        warning: 'border-orange-300/50 bg-gradient-to-br from-orange-50/30 to-amber-50/20',
        calm: 'border-blue-300/50 bg-gradient-to-br from-blue-50/30 to-cyan-50/20',
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
            'shadow-glow animate-pulse-gentle': glow,
            'animate-pulse-gentle': pulse,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Efeito de brilho sutil moderno */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none rounded-3xl" />
        
        {/* Overlay decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
        
        {/* Header do card */}
        {header && (
          <div className="border-b border-white/20 pb-6 mb-6 relative z-10">
            {header}
          </div>
        )}
        
        {/* Conteúdo principal */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Footer do card */}
        {footer && (
          <div className="border-t border-white/20 pt-6 mt-6 relative z-10">
            {footer}
          </div>
        )}
        
        {/* Overlay opcional */}
        {overlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
            {overlay}
          </div>
        )}
      </div>
    );
  }
);

TherapeuticCard.displayName = 'TherapeuticCard';

export { TherapeuticCard, therapeuticCardVariants };
