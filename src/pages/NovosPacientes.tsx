
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Phone, 
  Mail, 
  Calendar, 
  Heart, 
  Brain, 
  ArrowLeft,
  Save,
  User,
  MapPin,
  FileText
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const NovosPacientes = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados básicos
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    genero: '',
    estadoCivil: '',
    telefone: '',
    email: '',
    
    // Endereço
    endereco: {
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    
    // Dados profissionais
    profissao: '',
    escolaridade: '',
    renda: '',
    
    // Dados de saúde
    convenio: {
      possui: false,
      operadora: '',
      numero: '',
      validade: ''
    },
    
    // Contato de emergência
    contatoEmergencia: {
      nome: '',
      parentesco: '',
      telefone: '',
      email: ''
    },
    
    // Dados clínicos iniciais
    motivoConsulta: '',
    historicoTratamento: '',
    medicamentos: '',
    observacoes: '',
    prioridade: 'normal',
    
    // Preferências de atendimento
    modalidadePreferida: '',
    periodoPreferido: '',
    diasDisponiveis: []
  });

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: User },
    { id: 2, title: 'Contato & Endereço', icon: MapPin },
    { id: 3, title: 'Dados Clínicos', icon: Heart },
    { id: 4, title: 'Finalização', icon: FileText }
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const salvarPaciente = () => {
    console.log('Salvando paciente:', formData);
    navigate('/pacientes');
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/dashboard/psicologo')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cadastro de Novo Paciente</h1>
            <p className="text-gray-600">Formulário completo de cadastro</p>
          </div>
        </div>
      </div>

      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    Etapa {step.id}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6" })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Informações básicas do paciente"}
            {currentStep === 2 && "Dados de contato e localização"}
            {currentStep === 3 && "Informações clínicas iniciais"}
            {currentStep === 4 && "Revisar e finalizar o cadastro"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input 
                    id="nome" 
                    value={formData.nome}
                    onChange={(e) => updateFormData('nome', e.target.value)}
                    placeholder="Nome completo do paciente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                  <Input 
                    id="dataNascimento" 
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => updateFormData('dataNascimento', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input 
                    id="cpf" 
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => updateFormData('cpf', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input 
                    id="rg" 
                    placeholder="00.000.000-0"
                    value={formData.rg}
                    onChange={(e) => updateFormData('rg', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genero">Gênero</Label>
                  <Select value={formData.genero} onValueChange={(value) => updateFormData('genero', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                      <SelectItem value="nao_informar">Prefiro não informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estadoCivil">Estado Civil</Label>
                  <Select value={formData.estadoCivil} onValueChange={(value) => updateFormData('estadoCivil', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profissao">Profissão</Label>
                  <Input 
                    id="profissao" 
                    placeholder="Profissão atual"
                    value={formData.profissao}
                    onChange={(e) => updateFormData('profissao', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="escolaridade">Escolaridade</Label>
                  <Select value={formData.escolaridade} onValueChange={(value) => updateFormData('escolaridade', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fundamental-incompleto">Fundamental Incompleto</SelectItem>
                      <SelectItem value="fundamental-completo">Fundamental Completo</SelectItem>
                      <SelectItem value="medio-incompleto">Médio Incompleto</SelectItem>
                      <SelectItem value="medio-completo">Médio Completo</SelectItem>
                      <SelectItem value="superior-incompleto">Superior Incompleto</SelectItem>
                      <SelectItem value="superior-completo">Superior Completo</SelectItem>
                      <SelectItem value="pos-graduacao">Pós-graduação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="renda">Renda</Label>
                  <Select value={formData.renda} onValueChange={(value) => updateFormData('renda', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ate-1sm">Até 1 salário mínimo</SelectItem>
                      <SelectItem value="1-3sm">1 a 3 salários mínimos</SelectItem>
                      <SelectItem value="3-5sm">3 a 5 salários mínimos</SelectItem>
                      <SelectItem value="5-10sm">5 a 10 salários mínimos</SelectItem>
                      <SelectItem value="acima-10sm">Acima de 10 salários mínimos</SelectItem>
                      <SelectItem value="nao-informar">Prefiro não informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Informações de Contato</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input 
                    id="telefone" 
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => updateFormData('telefone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>
              </div>

              <h3 className="text-lg font-medium">Endereço</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input 
                    id="cep" 
                    placeholder="00000-000"
                    value={formData.endereco.cep}
                    onChange={(e) => updateNestedFormData('endereco', 'cep', e.target.value)}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="rua">Rua</Label>
                  <Input 
                    id="rua" 
                    placeholder="Nome da rua"
                    value={formData.endereco.rua}
                    onChange={(e) => updateNestedFormData('endereco', 'rua', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input 
                    id="numero" 
                    placeholder="Nº"
                    value={formData.endereco.numero}
                    onChange={(e) => updateNestedFormData('endereco', 'numero', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input 
                    id="complemento" 
                    placeholder="Apto, bloco, etc."
                    value={formData.endereco.complemento}
                    onChange={(e) => updateNestedFormData('endereco', 'complemento', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input 
                    id="bairro" 
                    placeholder="Bairro"
                    value={formData.endereco.bairro}
                    onChange={(e) => updateNestedFormData('endereco', 'bairro', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input 
                    id="cidade" 
                    placeholder="Cidade"
                    value={formData.endereco.cidade}
                    onChange={(e) => updateNestedFormData('endereco', 'cidade', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={formData.endereco.estado} onValueChange={(value) => updateNestedFormData('endereco', 'estado', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 
                        'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map(uf => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h3 className="text-lg font-medium">Contato de Emergência</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeEmergencia">Nome</Label>
                  <Input 
                    id="nomeEmergencia" 
                    placeholder="Nome do contato de emergência"
                    value={formData.contatoEmergencia.nome}
                    onChange={(e) => updateNestedFormData('contatoEmergencia', 'nome', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentescoEmergencia">Parentesco</Label>
                  <Input 
                    id="parentescoEmergencia" 
                    placeholder="Ex: Mãe, Esposo, Irmã"
                    value={formData.contatoEmergencia.parentesco}
                    onChange={(e) => updateNestedFormData('contatoEmergencia', 'parentesco', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneEmergencia">Telefone</Label>
                  <Input 
                    id="telefoneEmergencia" 
                    placeholder="(00) 00000-0000"
                    value={formData.contatoEmergencia.telefone}
                    onChange={(e) => updateNestedFormData('contatoEmergencia', 'telefone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailEmergencia">E-mail</Label>
                  <Input 
                    id="emailEmergencia" 
                    placeholder="email@exemplo.com"
                    value={formData.contatoEmergencia.email}
                    onChange={(e) => updateNestedFormData('contatoEmergencia', 'email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Informações Iniciais</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="motivoConsulta">Motivo da Consulta *</Label>
                  <Textarea 
                    id="motivoConsulta"
                    placeholder="Descreva o motivo principal que trouxe o paciente à consulta..."
                    value={formData.motivoConsulta}
                    onChange={(e) => updateFormData('motivoConsulta', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="historicoTratamento">Histórico de Tratamentos Anteriores</Label>
                  <Textarea 
                    id="historicoTratamento"
                    placeholder="Tratamentos psicológicos ou psiquiátricos anteriores..."
                    value={formData.historicoTratamento}
                    onChange={(e) => updateFormData('historicoTratamento', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                  <Textarea 
                    id="medicamentos"
                    placeholder="Liste os medicamentos que o paciente utiliza atualmente..."
                    value={formData.medicamentos}
                    onChange={(e) => updateFormData('medicamentos', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              <h3 className="text-lg font-medium">Convênio/Plano de Saúde</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="possuiConvenio"
                    checked={formData.convenio.possui}
                    onCheckedChange={(checked) => updateNestedFormData('convenio', 'possui', checked)}
                  />
                  <Label htmlFor="possuiConvenio">Possui convênio ou plano de saúde</Label>
                </div>

                {formData.convenio.possui && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="operadora">Operadora</Label>
                      <Input 
                        id="operadora" 
                        placeholder="Nome da operadora"
                        value={formData.convenio.operadora}
                        onChange={(e) => updateNestedFormData('convenio', 'operadora', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numeroCarteirinha">Número da Carteirinha</Label>
                      <Input 
                        id="numeroCarteirinha" 
                        placeholder="Nº da carteirinha"
                        value={formData.convenio.numero}
                        onChange={(e) => updateNestedFormData('convenio', 'numero', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="validadeConvenio">Validade</Label>
                      <Input 
                        id="validadeConvenio"
                        type="date"
                        value={formData.convenio.validade}
                        onChange={(e) => updateNestedFormData('convenio', 'validade', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-medium">Preferências de Atendimento</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modalidadePreferida">Modalidade Preferida</Label>
                  <Select value={formData.modalidadePreferida} onValueChange={(value) => updateFormData('modalidadePreferida', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="ambas">Ambas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periodoPreferido">Período Preferido</Label>
                  <Select value={formData.periodoPreferido} onValueChange={(value) => updateFormData('periodoPreferido', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manha">Manhã</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                      <SelectItem value="noite">Noite</SelectItem>
                      <SelectItem value="qualquer">Qualquer período</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade de Atendimento</Label>
                <Select value={formData.prioridade} onValueChange={(value) => updateFormData('prioridade', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{formData.nome}</h3>
                    <p className="text-gray-500">{formData.cpf}</p>
                  </div>
                  <Badge className="ml-auto">
                    Prioridade {formData.prioridade}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Informações de Contato</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{formData.telefone}</span>
                      </div>
                      {formData.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{formData.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Dados Pessoais</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{formData.dataNascimento}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">
                          {formData.genero && formData.estadoCivil 
                            ? `${formData.genero} • ${formData.estadoCivil}` 
                            : formData.genero || formData.estadoCivil || 'Não informado'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Motivo da Consulta</h4>
                  <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                    {formData.motivoConsulta || 'Não informado'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="observacoesFinais">Observações Finais</Label>
                <Textarea 
                  id="observacoesFinais"
                  placeholder="Observações adicionais para o cadastro..."
                  value={formData.observacoes}
                  onChange={(e) => updateFormData('observacoes', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={prevStep}
              >
                Anterior
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button 
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Próximo
              </Button>
            ) : (
              <Button 
                onClick={salvarPaciente}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Finalizar Cadastro
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovosPacientes;
