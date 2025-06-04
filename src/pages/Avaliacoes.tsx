import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Brain, 
  Heart, 
  Activity,
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Avaliacoes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [avaliacaoAtual, setAvaliacaoAtual] = useState(null);

  // Mock de pacientes
  const pacientes = [
    { id: '1', nome: 'João Silva', ultimaAvaliacao: '2024-01-15' },
    { id: '2', nome: 'Maria Santos', ultimaAvaliacao: '2024-01-10' },
    { id: '3', nome: 'Pedro Costa', ultimaAvaliacao: null },
    { id: '4', nome: 'Ana Oliveira', ultimaAvaliacao: '2024-01-12' }
  ];

  const escalasDisponiveis = [
    {
      id: 'beck-depression',
      nome: 'Inventário de Depressão de Beck (BDI-II)',
      descricao: 'Avalia a intensidade dos sintomas depressivos',
      categoria: 'Humor',
      tempo: '10-15 min',
      pontuacaoMax: 63,
      icone: Heart
    },
    {
      id: 'beck-anxiety',
      nome: 'Inventário de Ansiedade de Beck (BAI)',
      descricao: 'Mede a severidade dos sintomas de ansiedade',
      categoria: 'Ansiedade',
      tempo: '5-10 min',
      pontuacaoMax: 63,
      icone: Brain
    },
    {
      id: 'gaf',
      nome: 'Escala de Avaliação Global do Funcionamento (GAF)',
      descricao: 'Avalia o funcionamento psicológico, social e ocupacional',
      categoria: 'Funcionamento',
      tempo: '5 min',
      pontuacaoMax: 100,
      icone: Activity
    },
    {
      id: 'whoqol',
      nome: 'WHOQOL-BREF',
      descricao: 'Avalia a qualidade de vida em diferentes domínios',
      categoria: 'Qualidade de Vida',
      tempo: '15-20 min',
      pontuacaoMax: 100,
      icone: Heart
    },
    {
      id: 'hamilton-depression',
      nome: 'Escala de Hamilton para Depressão (HAM-D)',
      descricao: 'Avaliação clínica da gravidade da depressão',
      categoria: 'Humor',
      tempo: '15-20 min',
      pontuacaoMax: 52,
      icone: Brain
    }
  ];

  // Mock de perguntas do BDI-II (versão simplificada)
  const perguntasBDI = [
    {
      id: 1,
      pergunta: "Tristeza",
      opcoes: [
        { valor: 0, texto: "Não me sinto triste" },
        { valor: 1, texto: "Sinto-me triste" },
        { valor: 2, texto: "Sinto-me triste o tempo todo e não consigo sair disso" },
        { valor: 3, texto: "Estou tão triste ou infeliz que não posso suportar" }
      ]
    },
    {
      id: 2,
      pergunta: "Pessimismo",
      opcoes: [
        { valor: 0, texto: "Não me sinto desencorajado sobre o futuro" },
        { valor: 1, texto: "Sinto-me desencorajado sobre o futuro" },
        { valor: 2, texto: "Sinto que não tenho nada por que esperar" },
        { valor: 3, texto: "Sinto que o futuro é sem esperança e que as coisas não podem melhorar" }
      ]
    },
    {
      id: 3,
      pergunta: "Sentimento de fracasso",
      opcoes: [
        { valor: 0, texto: "Não me sinto fracassado" },
        { valor: 1, texto: "Sinto que fracassei mais que o indivíduo médio" },
        { valor: 2, texto: "Quando olho para trás em minha vida, tudo que vejo são fracassos" },
        { valor: 3, texto: "Sinto que sou um completo fracasso como pessoa" }
      ]
    }
  ];

  const [respostas, setRespostas] = useState<Record<number, number>>({});

  const pacientesFiltrados = pacientes.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const iniciarAvaliacao = (escala: string, paciente: any) => {
    setSelectedPaciente(paciente);
    setAvaliacaoAtual(escala);
    setRespostas({});
  };

  const finalizarAvaliacao = () => {
    const pontuacaoTotal = Object.values(respostas).reduce((acc: number, val: number) => acc + val, 0);
    console.log('Avaliação finalizada:', {
      paciente: selectedPaciente,
      escala: avaliacaoAtual,
      respostas,
      pontuacaoTotal
    });
    
    // Aqui salvaria no sistema
    setAvaliacaoAtual(null);
    setSelectedPaciente(null);
    setRespostas({});
  };

  const interpretarPontuacao = (pontos: number, escala: string) => {
    if (escala === 'beck-depression') {
      if (pontos <= 13) return { nivel: 'Mínimo', cor: 'bg-green-100 text-green-800' };
      if (pontos <= 19) return { nivel: 'Leve', cor: 'bg-yellow-100 text-yellow-800' };
      if (pontos <= 28) return { nivel: 'Moderado', cor: 'bg-orange-100 text-orange-800' };
      return { nivel: 'Grave', cor: 'bg-red-100 text-red-800' };
    }
    return { nivel: 'Normal', cor: 'bg-gray-100 text-gray-800' };
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
            <h1 className="text-3xl font-bold text-gray-900">Avaliações Psicológicas</h1>
            <p className="text-gray-600">Aplicar escalas e questionários padronizados</p>
          </div>
        </div>
      </div>

      {!avaliacaoAtual ? (
        <Tabs defaultValue="escalas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="escalas">Escalas Disponíveis</TabsTrigger>
            <TabsTrigger value="historico">Histórico de Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="escalas" className="space-y-6">
            {/* Busca de Pacientes */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Selecionar Paciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar paciente por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {searchTerm && (
                  <div className="space-y-2">
                    {pacientesFiltrados.map((paciente) => (
                      <div
                        key={paciente.id}
                        className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                          selectedPaciente?.id === paciente.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => setSelectedPaciente(paciente)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{paciente.nome}</span>
                          {paciente.ultimaAvaliacao ? (
                            <Badge variant="outline">
                              Última: {new Date(paciente.ultimaAvaliacao).toLocaleDateString('pt-BR')}
                            </Badge>
                          ) : (
                            <Badge className="bg-orange-100 text-orange-800">
                              Primeira avaliação
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedPaciente && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        Paciente selecionado: {selectedPaciente.nome}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Escalas Disponíveis */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {escalasDisponiveis.map((escala) => (
                <Card key={escala.id} className="bg-white hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <escala.icone className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{escala.nome}</div>
                        <Badge className="mt-1 text-xs" variant="outline">
                          {escala.categoria}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{escala.descricao}</p>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Tempo: {escala.tempo}</span>
                      <span>Máximo: {escala.pontuacaoMax} pts</span>
                    </div>

                    <Button 
                      className="w-full"
                      disabled={!selectedPaciente}
                      onClick={() => iniciarAvaliacao(escala.id, selectedPaciente)}
                    >
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Aplicar Escala
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historico" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Histórico de Avaliações</CardTitle>
                <CardDescription>
                  Últimas avaliações realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { paciente: 'João Silva', escala: 'BDI-II', data: '2024-01-15', pontuacao: 18, interpretacao: 'Leve' },
                    { paciente: 'Maria Santos', escala: 'BAI', data: '2024-01-12', pontuacao: 25, interpretacao: 'Moderado' },
                    { paciente: 'Ana Oliveira', escala: 'GAF', data: '2024-01-10', pontuacao: 65, interpretacao: 'Funcional' }
                  ].map((avaliacao, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{avaliacao.paciente}</h4>
                        <p className="text-sm text-gray-500">{avaliacao.escala} • {new Date(avaliacao.data).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{avaliacao.pontuacao} pontos</p>
                        <Badge className={interpretarPontuacao(avaliacao.pontuacao, 'beck-depression').cor}>
                          {avaliacao.interpretacao}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        // Interface de Aplicação da Escala
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  {escalasDisponiveis.find(e => e.id === avaliacaoAtual)?.nome}
                </CardTitle>
                <CardDescription>
                  Paciente: {selectedPaciente?.nome}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setAvaliacaoAtual(null)}>
                Cancelar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Exemplo com perguntas do BDI-II */}
            {avaliacaoAtual === 'beck-depression' && (
              <div className="space-y-8">
                {perguntasBDI.map((pergunta) => (
                  <div key={pergunta.id} className="space-y-4">
                    <Label className="text-base font-medium">
                      {pergunta.id}. {pergunta.pergunta}
                    </Label>
                    <RadioGroup
                      value={respostas[pergunta.id]?.toString() || ""}
                      onValueChange={(value) => setRespostas(prev => ({
                        ...prev,
                        [pergunta.id]: parseInt(value)
                      }))}
                    >
                      {pergunta.opcoes.map((opcao) => (
                        <div key={opcao.valor} className="flex items-start space-x-2">
                          <RadioGroupItem value={opcao.valor.toString()} id={`q${pergunta.id}-${opcao.valor}`} />
                          <Label htmlFor={`q${pergunta.id}-${opcao.valor}`} className="text-sm leading-relaxed">
                            {opcao.valor}: {opcao.texto}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}

                {/* Observações */}
                <div className="space-y-2">
                  <Label>Observações Clínicas (Opcional)</Label>
                  <Textarea 
                    placeholder="Comportamento durante a aplicação, observações relevantes..."
                    rows={3}
                  />
                </div>

                {/* Resultado Parcial */}
                {Object.keys(respostas).length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Pontuação Atual</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-blue-900">
                        {Object.values(respostas).reduce((acc: number, val: number) => acc + val, 0)} pontos
                      </span>
                      <span className="text-sm text-blue-700">
                        {Object.keys(respostas).length} de {perguntasBDI.length} questões respondidas
                      </span>
                    </div>
                  </div>
                )}

                {/* Botão de Finalizar */}
                <div className="flex justify-between pt-6 border-t">
                  <div className="text-sm text-gray-500">
                    Progresso: {Object.keys(respostas).length}/{perguntasBDI.length} questões
                  </div>
                  <Button 
                    onClick={finalizarAvaliacao}
                    disabled={Object.keys(respostas).length < perguntasBDI.length}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Finalizar Avaliação
                  </Button>
                </div>
              </div>
            )}

            {/* Outras escalas teriam interfaces similares */}
            {avaliacaoAtual !== 'beck-depression' && (
              <div className="text-center py-12">
                <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Interface da Escala em Desenvolvimento
                </h3>
                <p className="text-gray-500 mb-4">
                  A interface para esta escala está sendo desenvolvida.
                </p>
                <Button onClick={() => setAvaliacaoAtual(null)}>
                  Voltar às Escalas
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Avaliacoes;
