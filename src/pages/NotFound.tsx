
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-8 flex items-center justify-center">
          <span className="text-white font-bold text-4xl">V+</span>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Página não encontrada</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <Button 
          onClick={() => navigate('/')} 
          className="bg-primary hover:bg-primary/90"
        >
          <Home className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
