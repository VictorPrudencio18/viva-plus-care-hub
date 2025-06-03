
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">V+</span>
          </div>
          <CardTitle className="text-2xl font-bold">Entrar no Viva+</CardTitle>
          <p className="text-gray-600">Acesse sua conta da plataforma de saúde</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuário</Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="servidor">Servidor Público</SelectItem>
                  <SelectItem value="psicologo">Psicólogo</SelectItem>
                  <SelectItem value="medico">Médico/Profissional</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Sua senha" required />
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Entrar
            </Button>
            
            <div className="text-center space-y-2">
              <Button variant="link" type="button">
                Esqueci minha senha
              </Button>
              <p className="text-sm text-gray-600">
                Não tem conta?{' '}
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => navigate('/cadastro')}>
                  Cadastre-se
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
