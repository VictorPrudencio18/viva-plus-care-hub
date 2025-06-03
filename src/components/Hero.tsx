
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse-gentle"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse-gentle" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Bem-vindo ao
            <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              Viva+
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Plataforma integral de saúde e bem-estar para servidores públicos do Piauí. 
            Cuidado biopsicossocial, monitoramento contínuo e suporte com Inteligência Artificial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Começar Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Saiba Mais
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="glass-effect p-6 text-center border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Assistente Virtual "Viva"</div>
            </Card>
            <Card className="glass-effect p-6 text-center border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80">Prontuário Eletrônico</div>
            </Card>
            <Card className="glass-effect p-6 text-center border-white/20 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-white mb-2">360°</div>
              <div className="text-white/80">Cuidado Integral</div>
            </Card>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-white w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
