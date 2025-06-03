
import { useEffect, useRef, useState } from 'react';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  iterations?: number;
}

export const useTherapeuticAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  // Observador de interseção para animações ao entrar na viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Animação de respiração para elementos importantes
  const breathe = (config: AnimationConfig = {}) => {
    const {
      duration = 4000,
      easing = 'ease-in-out',
      iterations = Infinity,
    } = config;

    return {
      animation: `breathe ${duration}ms ${easing} infinite`,
      animationIterationCount: iterations,
    };
  };

  // Animação de flutuação suave
  const float = (config: AnimationConfig = {}) => {
    const {
      duration = 6000,
      easing = 'ease-in-out',
      iterations = Infinity,
    } = config;

    return {
      animation: `float ${duration}ms ${easing} infinite`,
      animationIterationCount: iterations,
    };
  };

  // Animação de entrada suave
  const gentleEnter = (config: AnimationConfig = {}) => {
    const {
      duration = 500,
      delay = 0,
      easing = 'ease-out',
    } = config;

    return {
      animation: `gentle-enter ${duration}ms ${easing} ${delay}ms both`,
    };
  };

  // Animação de brilho suave
  const softGlow = (config: AnimationConfig = {}) => {
    const {
      duration = 3000,
      easing = 'ease-in-out',
      iterations = Infinity,
    } = config;

    return {
      animation: `soft-glow ${duration}ms ${easing} infinite`,
      animationIterationCount: iterations,
    };
  };

  // Efeito de ondulação para cliques
  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('animate-ripple');

    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(255, 255, 255, 0.6)';
    circle.style.pointerEvents = 'none';
    circle.style.zIndex = '1000';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  // Hook para animações em sequência
  const useSequentialAnimation = (elements: string[], delay = 200) => {
    useEffect(() => {
      if (isVisible) {
        elements.forEach((selector, index) => {
          const element = document.querySelector(selector) as HTMLElement;
          if (element) {
            setTimeout(() => {
              element.classList.add('animate-gentle-enter');
            }, index * delay);
          }
        });
      }
    }, [isVisible, elements, delay]);
  };

  // Hook para animação de digitação
  const useTypingAnimation = (text: string, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      if (isVisible && text) {
        setIsTyping(true);
        let index = 0;
        
        const interval = setInterval(() => {
          setDisplayText(text.slice(0, index + 1));
          index++;
          
          if (index >= text.length) {
            clearInterval(interval);
            setIsTyping(false);
          }
        }, speed);

        return () => clearInterval(interval);
      }
    }, [isVisible, text, speed]);

    return { displayText, isTyping };
  };

  // Hook para partículas de celebração
  const createCelebration = (element: HTMLElement) => {
    const particles = ['✨', '🎉', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.position = 'absolute';
      particle.style.fontSize = '20px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      const rect = element.getBoundingClientRect();
      particle.style.left = `${rect.left + Math.random() * rect.width}px`;
      particle.style.top = `${rect.top + Math.random() * rect.height}px`;
      
      particle.classList.add('animate-celebrate');
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 2000);
    }
  };

  // Estados de humor com animações específicas
  const getMoodAnimation = (mood: 'happy' | 'calm' | 'energetic' | 'focused' | 'relaxed') => {
    const moodAnimations = {
      happy: 'animate-bounce-soft animate-soft-glow',
      calm: 'animate-breathe animate-therapeutic-sway',
      energetic: 'animate-float hover-scale',
      focused: 'animate-gentle-enter focus-therapeutic',
      relaxed: 'animate-calm-waves animate-therapeutic-pulse',
    };

    return moodAnimations[mood] || '';
  };

  return {
    elementRef,
    isVisible,
    breathe,
    float,
    gentleEnter,
    softGlow,
    createRipple,
    useSequentialAnimation,
    useTypingAnimation,
    createCelebration,
    getMoodAnimation,
  };
};

// Hook para prévia de animações em tempo real
export const useAnimationPreview = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<string>('');

  const animations = [
    'animate-breathe',
    'animate-float',
    'animate-gentle-enter',
    'animate-soft-glow',
    'animate-therapeutic-pulse',
    'animate-calm-waves',
  ];

  const togglePreview = () => setPreviewMode(!previewMode);
  
  const playAnimation = (animationName: string) => {
    setCurrentAnimation(animationName);
    setTimeout(() => setCurrentAnimation(''), 3000);
  };

  return {
    previewMode,
    currentAnimation,
    animations,
    togglePreview,
    playAnimation,
  };
};

export default useTherapeuticAnimations;
