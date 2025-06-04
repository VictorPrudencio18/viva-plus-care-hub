
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, Brain, Heart, Users, Shield, Activity, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-green-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-green-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-32 right-1/4 w-40 h-40 bg-teal-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-200 via-green-200 to-teal-200 bg-clip-text text-transparent">
              Viva+
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white/90 mb-6 leading-tight">
            Cuidando da Saúde Mental dos
            <span className="block mt-2 bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
              Servidores Públicos do Piauí
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Plataforma inteligente que monitora, acompanha e promove o bem-estar mental através de 
            <span className="font-semibold text-green-300"> IA avançada</span>,
            <span className="font-semibold text-blue-300"> suporte especializado</span> e 
            <span className="font-semibold text-purple-300"> cuidado contínuo</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-xl px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0"
            >
              <Heart className="w-6 h-6 mr-3" />
              Iniciar Jornada de Bem-estar
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-xl px-10 py-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Brain className="w-6 h-6 mr-3" />
              Conhecer a Plataforma
            </Button>
          </div>

          {/* Enhanced feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            <Card className="bg-white/10 backdrop-blur-lg p-8 text-center border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 rounded-3xl shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">IA "Viva"</div>
              <div className="text-white/80 text-lg">Assistente virtual especializada em saúde mental 24/7</div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg p-8 text-center border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 rounded-3xl shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">Monitoramento</div>
              <div className="text-white/80 text-lg">Acompanhamento contínuo do bem-estar emocional</div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg p-8 text-center border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 rounded-3xl shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">Especialistas</div>
              <div className="text-white/80 text-lg">Rede de psicólogos e médicos especializados</div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg p-8 text-center border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 rounded-3xl shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-3">Segurança</div>
              <div className="text-white/80 text-lg">Dados protegidos com máxima privacidade</div>
            </Card>
          </div>

          {/* Statistics section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text mb-2">95%</div>
              <div className="text-white/80 text-lg">Melhoria no bem-estar relatada pelos usuários</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text mb-2">24h</div>
              <div className="text-white/80 text-lg">Suporte contínuo disponível todos os dias</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text mb-2">100%</div>
              <div className="text-white/80 text-lg">Confidencialidade e privacidade garantidas</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ArrowDown className="text-white w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
