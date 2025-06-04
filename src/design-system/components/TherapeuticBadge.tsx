
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const therapeuticBadgeVariants = cva(
  [
    'inline-flex items-center gap-2',
    'text-xs font-semibold',
    'border border-transparent',
    'transition-all duration-300 ease-out',
    'relative overflow-hidden',
    'backdrop-blur-sm',
  ],
  {
    variants: {
      variant: {
        // Badge primário - azul terapêutico
        primary: [
          'bg-gradient-to-r from-blue-500/20 to-blue-600/20',
          'text-blue-700 border-blue-300/50',
          'hover:from-blue-500/30 hover:to-blue-600/30',
          'hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/25',
        ],
        
        // Badge secundário - verde crescimento
        secondary: [
          'bg-gradient-to-r from-emerald-500/20 to-green-600/20',
          'text-emerald-700 border-emerald-300/50',
          'hover:from-emerald-500/30 hover:to-green-600/30',
          'hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/25',
        ],
        
        // Badge positivo - sucesso
        positive: [
          'bg-gradient-to-r from-green-400/20 to-emerald-500/20',
          'text-green-700 border-green-300/50',
          'hover:from-green-400/30 hover:to-emerald-500/30',
          'hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/25',
        ],
        
        // Badge de alerta - laranja suave
        warning: [
          'bg-gradient-to-r from-orange-400/20 to-amber-500/20',
          'text-orange-700 border-orange-300/50',
          'hover:from-orange-400/30 hover:to-amber-500/30',
          'hover:border-orange-400/60 hover:shadow-lg hover:shadow-orange-500/25',
        ],
        
        // Badge urgente - vermelho suave
        urgent: [
          'bg-gradient-to-r from-red-400/20 to-pink-500/20',
          'text-red-700 border-red-300/50',
          'hover:from-red-400/30 hover:to-pink-500/30',
          'hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/25',
        ],
        
        // Badge neutro - cinza elegante
        neutral: [
          'bg-gradient-to-r from-gray-200/50 to-slate-300/50',
          'text-gray-700 border-gray-300/50',
          'hover:from-gray-200/70 hover:to-slate-300/70',
          'hover:border-gray-400/60 hover:shadow-lg hover:shadow-gray-500/25',
        ],
        
        // Badge outline - minimalista
        outline: [
          'bg-white/60 backdrop-blur-md',
          'text-gray-700 border-gray-300/50',
          'hover:bg-white/80 hover:border-gray-400/60',
          'hover:shadow-lg hover:shadow-gray-500/20',
        ],
        
        // Badge glassmorphism
        glass: [
          'bg-white/20 backdrop-blur-lg',
          'text-gray-800 border-white/30',
          'hover:bg-white/30 hover:border-white/50',
          'hover:shadow-lg hover:shadow-black/10',
        ],
      },
      
      size: {
        sm: 'px-3 py-1 text-xs rounded-xl',
        md: 'px-4 py-2 text-sm rounded-2xl',
        lg: 'px-6 py-3 text-base rounded-2xl',
      },
      
      // Estados especiais
      state: {
        default: '',
        pulsing: 'animate-pulse-gentle',
        glowing: 'shadow-glow',
        floating: 'animate-float',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
      state: 'default',
    },
  }
);

export interface TherapeuticBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof therapeuticBadgeVariants> {
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const TherapeuticBadge = forwardRef<HTMLDivElement, TherapeuticBadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    state,
    icon,
    closable,
    onClose,
    children, 
    ...props 
  }, ref) => {
    return (
      <div
        className={cn(
          therapeuticBadgeVariants({ variant, size, state }),
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Efeito de brilho sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none rounded-full" />
        
        {/* Ícone opcional */}
        {icon && (
          <span className="flex-shrink-0 transition-transform duration-200 hover:scale-110">
            {icon}
          </span>
        )}
        
        {/* Conteúdo */}
        <span className="relative z-10 font-medium">
          {children}
        </span>
        
        {/* Botão de fechar */}
        {closable && onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-2 w-4 h-4 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <span className="text-xs leading-none">×</span>
          </button>
        )}
      </div>
    );
  }
);

TherapeuticBadge.displayName = 'TherapeuticBadge';

export { TherapeuticBadge, therapeuticBadgeVariants };
