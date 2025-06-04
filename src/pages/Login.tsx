
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-improved";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login e redirecionar baseado no tipo de usuário
    switch (userType) {
      case 'servidor':
        navigate('/dashboard/servidor');
        break;
      case 'psicologo':
        navigate('/dashboard/psicologo');
        break;
      case 'medico':
        navigate('/dashboard/medico');
        break;
      case 'admin':
        navigate('/dashboard/admin');
        break;
      default:
        navigate('/dashboard/servidor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-therapeutic flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-therapeutic backdrop-blur-xl bg-white/95 border border-white/30">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">V+</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-gradient-modern">
              Entrar no Viva+
            </CardTitle>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Acesse sua conta da plataforma de saúde mental
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="userType" className="text-sm font-semibold text-neutral-700">
                Tipo de Usuário *
              </Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Selecione seu perfil de acesso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="servidor">
                    <div className="flex flex-col items-start">
                      <span>Servidor Público</span>
                      <span className="text-xs text-neutral-500">Acesso aos serviços de saúde</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="psicologo">
                    <div className="flex flex-col items-start">
                      <span>Psicólogo</span>
                      <span className="text-xs text-neutral-500">Profissional de psicologia</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medico">
                    <div className="flex flex-col items-start">
                      <span>Médico/Profissional</span>
                      <span className="text-xs text-neutral-500">Profissional de saúde</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex flex-col items-start">
                      <span>Administrador</span>
                      <span className="text-xs text-neutral-500">Gestão da plataforma</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-neutral-700">
                E-mail *
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                required 
                className="h-12 rounded-xl border-2 border-neutral-200 bg-white/90 backdrop-blur-sm px-4 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-neutral-700">
                Senha *
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Digite sua senha" 
                required 
                className="h-12 rounded-xl border-2 border-neutral-200 bg-white/90 backdrop-blur-sm px-4 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-primary hover:shadow-lg hover:scale-[1.02] transition-all duration-200 rounded-xl font-semibold text-white shadow-md"
              disabled={!userType}
            >
              Entrar na Plataforma
            </Button>
            
            <div className="text-center space-y-3 pt-2">
              <Button variant="link" type="button" className="text-primary hover:text-primary/80 transition-colors">
                Esqueci minha senha
              </Button>
              <div className="flex items-center justify-center gap-1 text-sm text-neutral-600">
                <span>Não tem conta?</span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary font-semibold hover:text-primary/80 transition-colors" 
                  onClick={() => navigate('/cadastro')}
                >
                  Cadastre-se aqui
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
