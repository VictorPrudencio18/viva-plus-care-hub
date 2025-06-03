
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface SentimentAnalysisProps {
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  confidence: number;
}

export const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ sentiment, confidence }) => {
  const getSentimentConfig = () => {
    switch (sentiment) {
      case 'urgent':
        return {
          icon: AlertTriangle,
          label: 'Urgente',
          color: 'bg-red-100 text-red-800 border-red-200',
          description: 'Situação que requer atenção imediata'
        };
      case 'negative':
        return {
          icon: TrendingDown,
          label: 'Negativo',
          color: 'bg-orange-100 text-orange-800 border-orange-200',
          description: 'Indica possível necessidade de apoio'
        };
      case 'positive':
        return {
          icon: TrendingUp,
          label: 'Positivo',
          color: 'bg-green-100 text-green-800 border-green-200',
          description: 'Estado emocional favorável'
        };
      default:
        return {
          icon: Minus,
          label: 'Neutro',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          description: 'Estado emocional equilibrado'
        };
    }
  };

  const config = getSentimentConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
        <span className="text-xs">({Math.round(confidence * 100)}%)</span>
      </Badge>
    </div>
  );
};

export default SentimentAnalysis;
