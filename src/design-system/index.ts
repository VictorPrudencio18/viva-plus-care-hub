
// Design System Viva+ Enterprise - Exports principais

// Tokens de design
export { default as designTokens, accessibilityTokens } from './tokens';

// Componentes terapêuticos
export { TherapeuticButton, therapeuticButtonVariants } from './components/TherapeuticButton';
export { TherapeuticCard, therapeuticCardVariants } from './components/TherapeuticCard';
export { TherapeuticBadge, therapeuticBadgeVariants } from './components/TherapeuticBadge';
export { TherapeuticProgress, therapeuticProgressVariants } from './components/TherapeuticProgress';

// Hooks de animação
export { 
  useTherapeuticAnimations, 
  useAnimationPreview,
  type AnimationConfig 
} from './hooks/useTherapeuticAnimations';

// Importação dos tokens para usar nas interfaces
import designTokens from './tokens';

// Tipos de interface terapêutica
export interface TherapeuticTheme {
  colors: typeof designTokens.colors;
  typography: typeof designTokens.typography;
  spacing: typeof designTokens.spacing;
  animations: typeof designTokens.animations;
}

export interface EmotionalState {
  type: 'positive' | 'neutral' | 'negative' | 'urgent' | 'calm';
  intensity: number; // 0-100
  duration?: number; // em ms
}

export interface AccessibilityConfig {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  focusVisible: boolean;
}

// Utilitários para acessibilidade
export const accessibility = {
  // Verifica se o usuário prefere movimento reduzido
  prefersReducedMotion: () => 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Verifica se o usuário prefere alto contraste
  prefersHighContrast: () => 
    window.matchMedia('(prefers-contrast: high)').matches,
  
  // Verifica se o usuário prefere modo escuro
  prefersDarkMode: () => 
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  
  // Calcula a razão de contraste entre duas cores
  getContrastRatio: (color1: string, color2: string): number => {
    // Implementação simplificada - em produção usar biblioteca específica
    return 4.5; // Placeholder
  },
  
  // Verifica se o contraste atende aos padrões WCAG
  meetsWCAGStandards: (ratio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  },
};

// Configurações padrão do tema terapêutico
export const defaultTherapeuticConfig = {
  accessibility: {
    reducedMotion: accessibility.prefersReducedMotion(),
    highContrast: accessibility.prefersHighContrast(),
    fontSize: 'medium' as const,
    focusVisible: true,
  },
  animations: {
    enabled: !accessibility.prefersReducedMotion(),
    duration: 'normal' as const,
    easing: 'therapeutic' as const,
  },
  emotions: {
    defaultState: 'neutral' as const,
    transitionDuration: 300,
    intensityThreshold: 70,
  },
};

// Provider de contexto para o tema (será implementado posteriormente)
export interface TherapeuticContextValue {
  theme: TherapeuticTheme;
  accessibility: AccessibilityConfig;
  emotionalState: EmotionalState;
  updateEmotionalState: (state: Partial<EmotionalState>) => void;
  updateAccessibility: (config: Partial<AccessibilityConfig>) => void;
}
