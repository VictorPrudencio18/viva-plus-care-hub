
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-improved";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const [userType, setUserType] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
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
    <div className="min-h-screen bg-gradient-therapeutic flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-therapeutic backdrop-blur-xl bg-white/95 border border-white/30">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">V+</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-gradient-modern">
              Cadastrar no Viva+
            </CardTitle>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Crie sua conta na plataforma de saúde mental
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="text-sm font-semibold text-neutral-700">
                  Nome *
                </Label>
                <Input 
                  id="firstName" 
                  placeholder="João" 
                  required 
                  className="h-12 rounded-xl border-2 border-neutral-200 bg-white/90 backdrop-blur-sm px-4 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName" className="text-sm font-semibold text-neutral-700">
                  Sobrenome *
                </Label>
                <Input 
                  id="lastName" 
                  placeholder="Silva" 
                  required 
                  className="h-12 rounded-xl border-2 border-neutral-200 bg-white/90 backdrop-blur-sm px-4 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
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
              <Label htmlFor="userType" className="text-sm font-semibold text-neutral-700">
                Tipo de Usuário *
              </Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Selecione seu perfil profissional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="servidor">
                    <div className="flex flex-col items-start">
                      <span>Servidor Público</span>
                      <span className="text-xs text-neutral-500">Funcionário público estadual ou municipal</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="psicologo">
                    <div className="flex flex-col items-start">
                      <span>Psicólogo</span>
                      <span className="text-xs text-neutral-500">Profissional registrado no CRP</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medico">
                    <div className="flex flex-col items-start">
                      <span>Médico/Profissional</span>
                      <span className="text-xs text-neutral-500">Profissional de saúde habilitado</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex flex-col items-start">
                      <span>Administrador</span>
                      <span className="text-xs text-neutral-500">Gestão e supervisão da plataforma</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {userType === 'servidor' && (
              <div className="space-y-3">
                <Label htmlFor="institution" className="text-sm font-semibold text-neutral-700">
                  Instituição *
                </Label>
                <Select value={institution} onValueChange={setInstitution}>
                  <SelectTrigger id="institution">
                    <SelectValue placeholder="Selecione sua instituição de origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssp">
                      <div className="flex flex-col items-start">
                        <span>SSP - Secretaria de Segurança Pública</span>
                        <span className="text-xs text-neutral-500">Polícia Civil, Militar e Técnica</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sejus">
                      <div className="flex flex-col items-start">
                        <span>SEJUS - Secretaria de Justiça</span>
                        <span className="text-xs text-neutral-500">Sistema penitenciário e socioeducativo</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="outros">
                      <div className="flex flex-col items-start">
                        <span>Outros Órgãos</span>
                        <span className="text-xs text-neutral-500">Demais instituições públicas</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(userType === 'psicologo' || userType === 'medico') && (
              <div className="space-y-3">
                <Label htmlFor="registration" className="text-sm font-semibold text-neutral-700">
                  Registro Profissional *
                </Label>
                <Input 
                  id="registration" 
                  placeholder={userType === 'psicologo' ? 'CRP/xxxx' : 'CRM/CRF/CREFITO...'} 
                  required 
                  className="h-12 rounded-xl border-2 border-neutral-200 bg-white/90 backdrop-blur-sm px-4 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-neutral-700">
                  Senha *
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Mínimo 8 caracteres" 
                  required 
                  className="h-12 rounded-xl border-2 border-neutral-200 bg-white/90 backdrop-blur-sm px-4 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-neutral-700">
                  Confirmar Senha *
                </Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Confirme sua senha" 
                  required 
                  className="h-12 rounded-xl border-2 border-neutral-200 bg-white/90 backdrop-blur-sm px-4 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-neutral-50/80 rounded-xl border border-neutral-200">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed text-neutral-700">
                Aceito os{' '}
                <Button variant="link" className="p-0 h-auto text-primary font-semibold underline hover:text-primary/80">
                  termos de uso
                </Button>
                {' '}e{' '}
                <Button variant="link" className="p-0 h-auto text-primary font-semibold underline hover:text-primary/80">
                  política de privacidade
                </Button>
                {' '}da plataforma Viva+
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-primary hover:shadow-lg hover:scale-[1.02] transition-all duration-200 rounded-xl font-semibold text-white shadow-md"
              disabled={!userType || !acceptTerms}
            >
              Criar Conta
            </Button>

            <div className="text-center pt-2">
              <div className="flex items-center justify-center gap-1 text-sm text-neutral-600">
                <span>Já tem conta?</span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary font-semibold hover:text-primary/80 transition-colors" 
                  onClick={() => navigate('/login')}
                >
                  Entre aqui
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastro;
