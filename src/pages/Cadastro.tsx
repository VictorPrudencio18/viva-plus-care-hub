
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const [userType, setUserType] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('Você deve aceitar os termos de uso');
      return;
    }
    // Simular cadastro e redirecionar para login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">V+</span>
          </div>
          <CardTitle className="text-2xl font-bold">Cadastrar no Viva+</CardTitle>
          <p className="text-gray-600">Crie sua conta na plataforma de saúde</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" placeholder="João" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input id="lastName" placeholder="Silva" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" required />
            </div>

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

            {userType === 'servidor' && (
              <div className="space-y-2">
                <Label htmlFor="institution">Instituição</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua instituição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssp">SSP - Secretaria de Segurança Pública</SelectItem>
                    <SelectItem value="sejus">SEJUS - Secretaria de Justiça</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(userType === 'psicologo' || userType === 'medico') && (
              <div className="space-y-2">
                <Label htmlFor="registration">Registro Profissional</Label>
                <Input id="registration" placeholder="CRP/CRM/CREFITO..." required />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="Mínimo 8 caracteres" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirme sua senha" required />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                Aceito os <Button variant="link" className="p-0 h-auto text-primary">termos de uso</Button> e 
                <Button variant="link" className="p-0 h-auto text-primary"> política de privacidade</Button>
              </Label>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Criar Conta
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem conta?{' '}
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => navigate('/login')}>
                  Entre aqui
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastro;
