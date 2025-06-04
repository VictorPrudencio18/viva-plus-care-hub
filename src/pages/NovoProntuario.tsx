
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  User, 
  Heart, 
  Brain, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  Plus,
  X,
  Save,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const NovoProntuario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    idade: '',
    genero: '',
    estadoCivil: '',
    profissao: '',
    escolaridade: '',
    renda: '',
    telefone: '',
    email: '',
    endereco: {
      rua: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    
    // Dados médicos
    alergias: [],
    medicamentos: [],
    historicoFamiliar: [],
    cirurgias: [],
    condicoesCronicas: [],
    
    // Contatos de emergência
    contatos: [{ nome: '', parentesco: '', telefone: '', email: '', emergencia: false }],
    
    // Dados do tratamento
    motivoConsulta: '',
    historiaDoencaAtual: '',
    antecedentesPersonais: '',
    antecedentesFamiliares: '',
    observacoes: ''
  });

  const [currentTab, setCurrentTab] = useState('pessoais');

  const adicionarItem = (campo) => {
    setFormData(prev => ({
      ...prev,
      [campo]: [...prev[campo], '']
    }));
  };

  const removerItem = (campo, index) => {
    setFormData(prev => ({
      ...prev,
      [campo]: prev[campo].filter((_, i) => i !== index)
    }));
  };

  const atualizarItem = (campo, index, valor) => {
    setFormData(prev => ({
      ...prev,
      [campo]: prev[campo].map((item, i) => i === index ? valor : item)
    }));
  };

  const adicionarContato = () => {
    setFormData(prev => ({
      ...prev,
      contatos: [...prev.contatos, { nome: '', parentesco: '', telefone: '', email: '', emergencia: false }]
    }));
  };

  const salvarProntuario = () => {
    console.log('Salvando prontuário:', formData);
    // Aqui seria a lógica para salvar no sistema
    navigate('/pacientes');
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
            <h1 className="text-3xl font-bold text-gray-900">Novo Prontuário</h1>
            <p className="text-gray-600">Cadastrar novo paciente no sistema</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            Salvar Rascunho
          </Button>
          <Button onClick={salvarProntuario} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Criar Prontuário
          </Button>
        </div>
      </div>

      <Card className="bg-white">
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <CardHeader>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="medicos">Histórico Médico</TabsTrigger>
              <TabsTrigger value="contatos">Contatos</TabsTrigger>
              <TabsTrigger value="clinicos">Dados Clínicos</TabsTrigger>
              <TabsTrigger value="observacoes">Observações</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="space-y-6">
            <TabsContent value="pessoais" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input 
                    id="nome" 
                    placeholder="Nome completo do paciente"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input 
                    id="cpf" 
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input 
                    id="rg" 
                    placeholder="00.000.000-0"
                    value={formData.rg}
                    onChange={(e) => setFormData(prev => ({ ...prev, rg: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input 
                    id="dataNascimento" 
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => setFormData(prev => ({ ...prev, dataNascimento: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idade">Idade</Label>
                  <Input 
                    id="idade" 
                    type="number"
                    placeholder="00"
                    value={formData.idade}
                    onChange={(e) => setFormData(prev => ({ ...prev, idade: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genero">Gênero</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, genero: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                      <SelectItem value="nao-informar">Prefiro não informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estadoCivil">Estado Civil</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, estadoCivil: value }))}>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profissao">Profissão</Label>
                  <Input 
                    id="profissao" 
                    placeholder="Profissão atual"
                    value={formData.profissao}
                    onChange={(e) => setFormData(prev => ({ ...prev, profissao: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="escolaridade">Escolaridade</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, escolaridade: value }))}>
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
                  <Label htmlFor="renda">Renda Familiar</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, renda: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ate-1sm">Até 1 salário mínimo</SelectItem>
                      <SelectItem value="1-3sm">1 a 3 salários mínimos</SelectItem>
                      <SelectItem value="3-5sm">3 a 5 salários mínimos</SelectItem>
                      <SelectItem value="5-10sm">5 a 10 salários mínimos</SelectItem>
                      <SelectItem value="acima-10sm">Acima de 10 salários mínimos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input 
                    id="telefone" 
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Endereço</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input 
                      placeholder="Rua, número, complemento"
                      value={formData.endereco.rua}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        endereco: { ...prev.endereco, rua: e.target.value }
                      }))}
                    />
                  </div>
                  <Input 
                    placeholder="Cidade"
                    value={formData.endereco.cidade}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      endereco: { ...prev.endereco, cidade: e.target.value }
                    }))}
                  />
                  <Input 
                    placeholder="Estado"
                    value={formData.endereco.estado}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      endereco: { ...prev.endereco, estado: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medicos" className="space-y-6">
              {/* Alergias */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Alergias</Label>
                  <Button size="sm" variant="outline" onClick={() => adicionarItem('alergias')}>
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.alergias.map((alergia, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        placeholder="Ex: Dipirona, Penicilina"
                        value={alergia}
                        onChange={(e) => atualizarItem('alergias', index, e.target.value)}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removerItem('alergias', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medicamentos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Medicamentos Atuais</Label>
                  <Button size="sm" variant="outline" onClick={() => adicionarItem('medicamentos')}>
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.medicamentos.map((medicamento, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        placeholder="Ex: Sertralina 50mg"
                        value={medicamento}
                        onChange={(e) => atualizarItem('medicamentos', index, e.target.value)}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removerItem('medicamentos', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Histórico Familiar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Histórico Familiar de Transtornos Mentais</Label>
                  <Button size="sm" variant="outline" onClick={() => adicionarItem('historicoFamiliar')}>
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.historicoFamiliar.map((historico, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        placeholder="Ex: Depressão (mãe), Ansiedade (irmão)"
                        value={historico}
                        onChange={(e) => atualizarItem('historicoFamiliar', index, e.target.value)}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removerItem('historicoFamiliar', index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contatos" className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Contatos de Emergência</Label>
                <Button onClick={adicionarContato} size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Contato
                </Button>
              </div>
              
              <div className="space-y-4">
                {formData.contatos.map((contato, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input 
                          placeholder="Nome do contato"
                          value={contato.nome}
                          onChange={(e) => {
                            const novosContatos = [...formData.contatos];
                            novosContatos[index].nome = e.target.value;
                            setFormData(prev => ({ ...prev, contatos: novosContatos }));
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Parentesco</Label>
                        <Input 
                          placeholder="Ex: Mãe, Esposo, Irmão"
                          value={contato.parentesco}
                          onChange={(e) => {
                            const novosContatos = [...formData.contatos];
                            novosContatos[index].parentesco = e.target.value;
                            setFormData(prev => ({ ...prev, contatos: novosContatos }));
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input 
                          placeholder="(00) 00000-0000"
                          value={contato.telefone}
                          onChange={(e) => {
                            const novosContatos = [...formData.contatos];
                            novosContatos[index].telefone = e.target.value;
                            setFormData(prev => ({ ...prev, contatos: novosContatos }));
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input 
                          placeholder="email@exemplo.com"
                          value={contato.email}
                          onChange={(e) => {
                            const novosContatos = [...formData.contatos];
                            novosContatos[index].email = e.target.value;
                            setFormData(prev => ({ ...prev, contatos: novosContatos }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`emergencia-${index}`}
                          checked={contato.emergencia}
                          onCheckedChange={(checked) => {
                            const novosContatos = [...formData.contatos];
                            novosContatos[index].emergencia = checked === true;
                            setFormData(prev => ({ ...prev, contatos: novosContatos }));
                          }}
                        />
                        <Label htmlFor={`emergencia-${index}`}>Contato de emergência</Label>
                      </div>
                      {formData.contatos.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const novosContatos = formData.contatos.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, contatos: novosContatos }));
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clinicos" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="motivoConsulta">Motivo da Consulta</Label>
                  <Textarea 
                    id="motivoConsulta"
                    placeholder="Descreva o motivo principal que trouxe o paciente à consulta..."
                    value={formData.motivoConsulta}
                    onChange={(e) => setFormData(prev => ({ ...prev, motivoConsulta: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="historiaDoencaAtual">História da Doença Atual</Label>
                  <Textarea 
                    id="historiaDoencaAtual"
                    placeholder="Descreva a evolução dos sintomas atuais..."
                    value={formData.historiaDoencaAtual}
                    onChange={(e) => setFormData(prev => ({ ...prev, historiaDoencaAtual: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="antecedentesPersonais">Antecedentes Pessoais</Label>
                  <Textarea 
                    id="antecedentesPersonais"
                    placeholder="Histórico pessoal relevante, tratamentos anteriores..."
                    value={formData.antecedentesPersonais}
                    onChange={(e) => setFormData(prev => ({ ...prev, antecedentesPersonais: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="antecedentesFamiliares">Antecedentes Familiares</Label>
                  <Textarea 
                    id="antecedentesFamiliares"
                    placeholder="Histórico familiar de transtornos mentais, suicídio, etc..."
                    value={formData.antecedentesFamiliares}
                    onChange={(e) => setFormData(prev => ({ ...prev, antecedentesFamiliares: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="observacoes" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações Gerais</Label>
                  <Textarea 
                    id="observacoes"
                    placeholder="Observações adicionais, características especiais, considerações importantes..."
                    value={formData.observacoes}
                    onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                    rows={6}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Lembrete</h4>
                  <p className="text-sm text-blue-700">
                    Após criar o prontuário, você poderá adicionar avaliações psicológicas, 
                    planos de tratamento e registrar as sessões de terapia.
                  </p>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default NovoProntuario;
