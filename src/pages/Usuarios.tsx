
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload,
  MoreVertical,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Shield
} from "lucide-react";

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState("todos");

  const usuarios = [
    {
      id: 1,
      nome: "Dr. Carlos Silva",
      email: "carlos.silva@empresa.com",
      telefone: "(11) 99999-9999",
      cargo: "psicologo",
      departamento: "RH",
      status: "ativo",
      ultimoAcesso: "2024-01-15 14:30",
      criadoEm: "2023-06-15",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      nome: "Dra. Ana Santos",
      email: "ana.santos@empresa.com",
      telefone: "(11) 88888-8888",
      cargo: "medico",
      departamento: "Medicina",
      status: "ativo",
      ultimoAcesso: "2024-01-15 16:45",
      criadoEm: "2023-08-20",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      nome: "João Oliveira",
      email: "joao.oliveira@empresa.com",
      telefone: "(11) 77777-7777",
      cargo: "servidor",
      departamento: "TI",
      status: "inativo",
      ultimoAcesso: "2024-01-10 09:15",
      criadoEm: "2023-03-10",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      nome: "Maria Costa",
      email: "maria.costa@empresa.com",
      telefone: "(11) 66666-6666",
      cargo: "admin",
      departamento: "Administração",
      status: "ativo",
      ultimoAcesso: "2024-01-15 17:20",
      criadoEm: "2023-01-05",
      avatar: "/placeholder.svg"
    }
  ];

  const filteredUsers = usuarios.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "todos" || user.cargo === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRoleLabel = (cargo: string) => {
    const roles = {
      'admin': 'Administrador',
      'psicologo': 'Psicólogo',
      'medico': 'Médico',
      'servidor': 'Servidor'
    };
    return roles[cargo] || cargo;
  };

  const getRoleColor = (cargo: string) => {
    const colors = {
      'admin': 'bg-purple-100 text-purple-800',
      'psicologo': 'bg-blue-100 text-blue-800',
      'medico': 'bg-green-100 text-green-800',
      'servidor': 'bg-gray-100 text-gray-800'
    };
    return colors[cargo] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
          <p className="text-gray-600">Gerencie usuários, permissões e acessos do sistema</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" placeholder="Nome do usuário" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@empresa.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departamento">Departamento</Label>
                    <Input id="departamento" placeholder="Departamento" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo/Função</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="psicologo">Psicólogo</SelectItem>
                      <SelectItem value="medico">Médico</SelectItem>
                      <SelectItem value="servidor">Servidor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Criar Usuário</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600">Total de Usuários</h3>
            <p className="text-2xl font-bold">{usuarios.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600">Usuários Ativos</h3>
            <p className="text-2xl font-bold text-green-600">
              {usuarios.filter(u => u.status === 'ativo').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600">Profissionais</h3>
            <p className="text-2xl font-bold text-blue-600">
              {usuarios.filter(u => ['psicologo', 'medico'].includes(u.cargo)).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600">Servidores</h3>
            <p className="text-2xl font-bold text-purple-600">
              {usuarios.filter(u => u.cargo === 'servidor').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuário por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Cargos</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
                <SelectItem value="psicologo">Psicólogos</SelectItem>
                <SelectItem value="medico">Médicos</SelectItem>
                <SelectItem value="servidor">Servidores</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((usuario) => (
              <div
                key={usuario.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedUser(usuario)}
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={usuario.avatar} />
                    <AvatarFallback>
                      {usuario.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{usuario.nome}</h3>
                    <p className="text-sm text-gray-600">{usuario.email}</p>
                    <p className="text-sm text-gray-500">{usuario.departamento}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getRoleColor(usuario.cargo)}>
                    {getRoleLabel(usuario.cargo)}
                  </Badge>
                  <Badge className={getStatusColor(usuario.status)}>
                    {usuario.status}
                  </Badge>
                  <div className="text-sm text-gray-500">
                    <p>Último acesso:</p>
                    <p>{new Date(usuario.ultimoAcesso).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes do Usuário */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Usuário</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="dados" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dados">Dados</TabsTrigger>
                <TabsTrigger value="permissoes">Permissões</TabsTrigger>
                <TabsTrigger value="atividade">Atividade</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dados" className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback>
                      {selectedUser.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{selectedUser.nome}</h3>
                    <p className="text-gray-600">{getRoleLabel(selectedUser.cargo)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedUser.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Telefone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedUser.telefone}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Departamento</Label>
                    <span className="text-sm">{selectedUser.departamento}</span>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Data de Criação</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(selectedUser.criadoEm).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="permissoes" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Permissões Atuais</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Visualizar Dashboard</span>
                      <UserCheck className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Gerenciar Usuários</span>
                      {selectedUser.cargo === 'admin' ? (
                        <UserCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <UserX className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Configurações do Sistema</span>
                      {selectedUser.cargo === 'admin' ? (
                        <UserCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <UserX className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="atividade">
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Histórico de Atividades
                  </h3>
                  <p className="text-gray-500">
                    Últimas atividades do usuário aparecerão aqui
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline">Editar</Button>
              <Button variant="destructive">Desativar</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Usuarios;
