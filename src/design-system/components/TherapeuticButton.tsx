
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Variantes terapêuticas do botão
const therapeuticButtonVariants = cva(
  // Classes base - design terapêutico
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium text-sm leading-none',
    'border border-transparent',
    'cursor-pointer select-none',
    'transition-all duration-300 ease-out',
    'focus:outline-none focus:ring-3 focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'relative overflow-hidden',
    // Micro-interação: efeito de onda
    'before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full',
    'before:transition-transform before:duration-500 before:ease-out',
    'active:before:scale-150',
  ],
  {
    variants: {
      // Variantes terapêuticas baseadas em estados emocionais
      variant: {
        // Primário - transmite confiança e segurança
        primary: [
          'bg-gradient-to-r from-primary-500 to-primary-600',
          'text-white shadow-lg shadow-primary-500/25',
          'hover:from-primary-600 hover:to-primary-700',
          'hover:shadow-xl hover:shadow-primary-500/30',
          'hover:-translate-y-0.5',
          'focus:ring-primary-300',
        ],
        
        // Secundário - harmonia e crescimento
        secondary: [
          'bg-gradient-to-r from-secondary-500 to-secondary-600',
          'text-white shadow-lg shadow-secondary-500/25',
          'hover:from-secondary-600 hover:to-secondary-700',
          'hover:shadow-xl hover:shadow-secondary-500/30',
          'hover:-translate-y-0.5',
          'focus:ring-secondary-300',
        ],
        
        // Acentuação - energia positiva
        accent: [
          'bg-gradient-to-r from-accent-400 to-accent-500',
          'text-white shadow-lg shadow-accent-400/25',
          'hover:from-accent-500 hover:to-accent-600',
          'hover:shadow-xl hover:shadow-accent-400/30',
          'hover:-translate-y-0.5',
          'focus:ring-accent-300',
        ],
        
        // Outline - não intrusivo, calmante
        outline: [
          'border-2 border-primary-300 bg-transparent',
          'text-primary-700 hover:bg-primary-50',
          'hover:border-primary-400 hover:text-primary-800',
          'focus:ring-primary-200',
        ],
        
        // Ghost - minimalista, reduz ansiedade
        ghost: [
          'bg-transparent text-neutral-700',
          'hover:bg-neutral-100 hover:text-neutral-900',
          'focus:ring-neutral-200',
        ],
        
        // Terapêutico - design especial para situações sensíveis
        therapeutic: [
          'bg-gradient-therapeutic',
          'text-neutral-800 border border-primary-200',
          'shadow-therapeutic',
          'hover:shadow-glow hover:border-primary-300',
          'hover:bg-gradient-calm',
          'focus:ring-accent-200',
        ],
        
        // Estados de urgência - suave mas visível
        urgent: [
          'bg-gradient-to-r from-urgent-400 to-urgent-500',
          'text-white shadow-lg shadow-urgent-400/25',
          'hover:from-urgent-500 hover:to-urgent-600',
          'hover:shadow-xl hover:shadow-urgent-400/30',
          'focus:ring-urgent-300',
        ],
        
        // Estado positivo - celebração e conquistas
        positive: [
          'bg-gradient-to-r from-positive-400 to-positive-500',
          'text-white shadow-lg shadow-positive-400/25',
          'hover:from-positive-500 hover:to-positive-600',
          'hover:shadow-xl hover:shadow-positive-400/30',
          'hover:scale-105',
          'focus:ring-positive-300',
        ],
      },
      
      // Tamanhos terapêuticos - baseados em ergonomia
      size: {
        sm: 'h-9 px-3 text-xs rounded-md',
        md: 'h-11 px-4 text-sm rounded-lg', // Padrão - tamanho confortável
        lg: 'h-12 px-6 text-base rounded-lg',
        xl: 'h-14 px-8 text-lg rounded-xl',
        icon: 'h-11 w-11 rounded-lg', // Quadrado para ícones
      },
      
      // Estados de interação
      state: {
        default: '',
        loading: 'pointer-events-none',
        success: 'bg-positive-500 text-white',
        error: 'bg-urgent-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      state: 'default',
    },
  }
);

export interface TherapeuticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof therapeuticButtonVariants> {
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  pulse?: boolean; // Animação suave para chamar atenção
}

const TherapeuticButton = forwardRef<HTMLButtonElement, TherapeuticButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    state,
    loading, 
    success, 
    error,
    leftIcon,
    rightIcon,
    pulse,
    children, 
    disabled,
    ...props 
  }, ref) => {
    // Determina o estado baseado nas props
    const currentState = loading 
      ? 'loading' 
      : success 
      ? 'success' 
      : error 
      ? 'error' 
      : 'default';

    return (
      <button
        className={cn(
          therapeuticButtonVariants({ variant, size, state: currentState }),
          {
            'animate-pulse-gentle': pulse,
            'cursor-not-allowed': disabled || loading,
          },
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Ícone à esquerda */}
        {leftIcon && !loading && (
          <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
            {leftIcon}
          </span>
        )}
        
        {/* Indicador de carregamento */}
        {loading && (
          <div className="flex-shrink-0 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        
        {/* Conteúdo do botão */}
        {children && (
          <span className="transition-transform duration-200 group-hover:scale-105">
            {children}
          </span>
        )}
        
        {/* Ícone à direita */}
        {rightIcon && !loading && (
          <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
            {rightIcon}
          </span>
        )}
        
        {/* Efeito de brilho sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </button>
    );
  }
);

TherapeuticButton.displayName = 'TherapeuticButton';

export { TherapeuticButton, therapeuticButtonVariants };
