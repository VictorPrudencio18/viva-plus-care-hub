
import React from 'react';
import { Bot, AlertTriangle, Clock, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AIMessage {
  id: string;
  content: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  confidence: number;
  suggestions?: string[];
}

interface AIAssistantProps {
  onEscalate: () => void;
  onSuggestion: (suggestion: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onEscalate, onSuggestion }) => {
  const generateAIResponse = (userMessage: string): AIMessage => {
    // Simulação da análise de sentimentos
    const urgentKeywords = ['suicídio', 'morte', 'socorro', 'emergência', 'desespero', 'não aguento'];
    const negativeKeywords = ['triste', 'ansioso', 'deprimido', 'mal', 'ruim', 'problema'];
    const positiveKeywords = ['bem', 'melhor', 'obrigado', 'ótimo', 'feliz', 'bom'];
    
    let sentiment: AIMessage['sentiment'] = 'neutral';
    let confidence = 0.7;
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (urgentKeywords.some(keyword => lowerMessage.includes(keyword))) {
      sentiment = 'urgent';
      confidence = 0.9;
    } else if (negativeKeywords.some(keyword => lowerMessage.includes(keyword))) {
      sentiment = 'negative';
      confidence = 0.8;
    } else if (positiveKeywords.some(keyword => lowerMessage.includes(keyword))) {
      sentiment = 'positive';
      confidence = 0.75;
    }

    // Respostas contextuais baseadas no sentimento
    const responses: Record<AIMessage['sentiment'], string[]> = {
      urgent: [
        "Entendo que você está passando por um momento muito difícil. Vou conectar você imediatamente com um de nossos psicólogos de plantão. Você não está sozinho.",
        "Sua mensagem indica uma situação de urgência. Estou acionando nosso protocolo de emergência. Um profissional entrará em contato em instantes."
      ],
      negative: [
        "Percebo que você está enfrentando dificuldades. Isso é completamente normal e você fez bem em buscar ajuda. Posso te conectar com um psicólogo ou gostaria de algumas técnicas de respiração?",
        "Entendo que está passando por um momento desafiador. Estou aqui para ajudar. Que tal começarmos com algumas estratégias de autocuidado?"
      ],
      positive: [
        "Que bom saber que você está bem! Manter esse estado positivo é importante. Posso sugerir algumas atividades para continuar cuidando do seu bem-estar.",
        "Fico feliz em saber que está se sentindo melhor! Como posso ajudar você a manter esse momentum positivo?"
      ],
      neutral: [
        "Olá! Sou a Viva, sua assistente virtual de bem-estar. Estou aqui para ajudar você com informações sobre saúde mental, agendamentos e muito mais. Como posso ajudar hoje?",
        "Entendi. Como posso te apoiar melhor? Posso agendar uma consulta, oferecer recursos de autocuidado ou conectar você com um profissional."
      ]
    };

    const responseOptions = responses[sentiment];
    const content = responseOptions[Math.floor(Math.random() * responseOptions.length)];

    const suggestions: Record<AIMessage['sentiment'], string[]> = {
      urgent: ["Falar com psicólogo agora", "Centro de Valorização da Vida - 188"],
      negative: ["Agendar consulta", "Técnicas de respiração", "Exercícios de mindfulness"],
      positive: ["Atividades de bem-estar", "Grupos de apoio", "Dicas de autocuidado"],
      neutral: ["Agendar consulta", "Ver recursos disponíveis", "Termômetro de humor"]
    };

    return {
      id: Date.now().toString(),
      content,
      sentiment,
      confidence,
      suggestions: suggestions[sentiment]
    };
  };

  const getSentimentIcon = (sentiment: AIMessage['sentiment']) => {
    switch (sentiment) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'negative': return <Heart className="w-4 h-4 text-orange-500" />;
      case 'positive': return <Heart className="w-4 h-4 text-green-500" />;
      default: return <Bot className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSentimentColor = (sentiment: AIMessage['sentiment']) => {
    switch (sentiment) {
      case 'urgent': return 'bg-red-50 border-red-200';
      case 'negative': return 'bg-orange-50 border-orange-200';
      case 'positive': return 'bg-green-50 border-green-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return { generateAIResponse, getSentimentIcon, getSentimentColor };
};

export default AIAssistant;
