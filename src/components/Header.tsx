
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V+</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Viva+</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#sobre" className="text-gray-600 hover:text-primary transition-colors">Sobre</a>
            <a href="#servicos" className="text-gray-600 hover:text-primary transition-colors">Serviços</a>
            <a href="#contato" className="text-gray-600 hover:text-primary transition-colors">Contato</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => navigate('/login')}
            >
              Entrar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/cadastro')}
            >
              Cadastrar
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#sobre" className="text-gray-600 hover:text-primary transition-colors">Sobre</a>
              <a href="#servicos" className="text-gray-600 hover:text-primary transition-colors">Serviços</a>
              <a href="#contato" className="text-gray-600 hover:text-primary transition-colors">Contato</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => navigate('/login')}
                >
                  Entrar
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/cadastro')}
                >
                  Cadastrar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
