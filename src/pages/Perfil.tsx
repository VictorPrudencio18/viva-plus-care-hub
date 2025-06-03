
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Bell, Shield, Camera, Save } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    bio: "Servidor público há 10 anos, buscando sempre melhorar minha qualidade de vida e bem-estar.",
    avatar: "/placeholder.svg"
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    humorReminders: true,
    weeklyReports: false,
    shareData: false
  });

  const handleSaveProfile = () => {
    toast.success("Perfil atualizado com sucesso!");
    setIsEditing(false);
  };

  const handleSavePreferences = () => {
    toast.success("Preferências salvas com sucesso!");
  };

  const activities = [
    {
      id: 1,
      type: "termometro",
      description: "Respondeu ao termômetro de humor",
      date: "2024-01-15 14:30",
      score: 8
    },
    {
      id: 2,
      type: "consulta",
      description: "Consulta com Dr. Ana Paula",
      date: "2024-01-12 10:00",
      status: "concluida"
    },
    {
      id: 3,
      type: "chat",
      description: "Mensagem enviada para Dr. Carlos",
      date: "2024-01-10 16:45",
      status: "respondida"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Foto e Info Básica */}
        <Card>
          <CardHeader className="text-center">
            <div className="relative mx-auto w-24 h-24">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="text-2xl">
                  {profileData.nome.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                variant="secondary"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-bold">{profileData.nome}</h3>
              <p className="text-gray-500">Servidor Público</p>
              <Badge className="mt-2">Usuário Ativo</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{profileData.telefone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{profileData.endereco}</span>
            </div>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="dados" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dados">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="preferencias">Preferências</TabsTrigger>
                <TabsTrigger value="atividades">Atividades</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="dados" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Informações Pessoais</h3>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={profileData.nome}
                      onChange={(e) => setProfileData(prev => ({...prev, nome: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={profileData.telefone}
                      onChange={(e) => setProfileData(prev => ({...prev, telefone: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={profileData.endereco}
                      onChange={(e) => setProfileData(prev => ({...prev, endereco: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({...prev, bio: e.target.value}))}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preferencias" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notificações</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Notificações por Email</Label>
                        <p className="text-sm text-gray-500">
                          Receba lembretes e atualizações por email
                        </p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({...prev, emailNotifications: checked}))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Notificações Push</Label>
                        <p className="text-sm text-gray-500">
                          Receba notificações no navegador
                        </p>
                      </div>
                      <Switch
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({...prev, pushNotifications: checked}))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Lembretes de Humor</Label>
                        <p className="text-sm text-gray-500">
                          Lembretes diários para responder o termômetro
                        </p>
                      </div>
                      <Switch
                        checked={preferences.humorReminders}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({...prev, humorReminders: checked}))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Relatórios Semanais</Label>
                        <p className="text-sm text-gray-500">
                          Receba um resumo semanal do seu bem-estar
                        </p>
                      </div>
                      <Switch
                        checked={preferences.weeklyReports}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({...prev, weeklyReports: checked}))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Privacidade</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Compartilhar Dados Anônimos</Label>
                        <p className="text-sm text-gray-500">
                          Ajude a melhorar o sistema compartilhando dados anônimos
                        </p>
                      </div>
                      <Switch
                        checked={preferences.shareData}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({...prev, shareData: checked}))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSavePreferences}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Preferências
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="atividades" className="space-y-4">
                <h3 className="text-lg font-medium">Atividades Recentes</h3>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.type === 'termometro' ? 'bg-blue-500' :
                              activity.type === 'consulta' ? 'bg-green-500' :
                              'bg-purple-500'
                            }`} />
                            <div>
                              <p className="font-medium text-sm">{activity.description}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(activity.date).toLocaleDateString('pt-BR')} às{' '}
                                {new Date(activity.date).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          {activity.score && (
                            <Badge variant="outline">
                              {activity.score}/10
                            </Badge>
                          )}
                          {activity.status && (
                            <Badge variant={activity.status === 'concluida' ? 'default' : 'secondary'}>
                              {activity.status}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Perfil;
