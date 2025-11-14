"use client";

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calendar, FileText, Target, Timer, BarChart3, 
  Users, User, Plus, Play, Pause, RotateCcw, Check, 
  Clock, TrendingUp, Award, Brain, Settings, Search,
  ChevronRight, Edit, Trash2, Star, Filter, Download,
  Upload, Link, MessageCircle, ThumbsUp, Send, Bell,
  Moon, Sun, Volume2, VolumeX, Home, CheckCircle2,
  Circle, AlertCircle, Calendar as CalendarIcon,
  ArrowRight, Zap, Activity, Focus, Menu, X
} from 'lucide-react';

// Tipos de dados
interface User {
  name: string;
  course: string;
  goals: string;
  avatar?: string;
}

interface Task {
  id: string;
  title: string;
  subject: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  description?: string;
}

interface StudySession {
  id: string;
  subject: string;
  duration: number;
  date: string;
  type: 'pomodoro' | 'free';
}

interface Material {
  id: string;
  title: string;
  type: 'note' | 'pdf' | 'link';
  subject: string;
  content?: string;
  url?: string;
  createdAt: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: string;
}

interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  subject: string;
  likes: number;
  replies: number;
  createdAt: string;
}

export default function StudyApp() {
  // Estados principais
  const [currentView, setCurrentView] = useState('onboarding');
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  
  // Estados do Pomodoro
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'work' | 'break'>('work');
  const [pomodoroCount, setPomodoroCount] = useState(0);

  // Estados da UI
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Timer do Pomodoro
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      if (currentSession === 'work') {
        setPomodoroCount(count => count + 1);
        setPomodoroTime(5 * 60); // 5 min break
        setCurrentSession('break');
      } else {
        setPomodoroTime(25 * 60); // 25 min work
        setCurrentSession('work');
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime, currentSession]);

  // Dados iniciais
  useEffect(() => {
    if (user) {
      // Tarefas de exemplo
      setTasks([
        {
          id: '1',
          title: 'Estudar Cálculo Diferencial',
          subject: 'Matemática',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2024-01-15',
          description: 'Capítulos 1-3 do livro'
        },
        {
          id: '2',
          title: 'Projeto de Física',
          subject: 'Física',
          status: 'pending',
          priority: 'medium',
          dueDate: '2024-01-20'
        },
        {
          id: '3',
          title: 'Ensaio de História',
          subject: 'História',
          status: 'completed',
          priority: 'low',
          dueDate: '2024-01-10'
        }
      ]);

      // Sessões de estudo de exemplo
      setStudySessions([
        { id: '1', subject: 'Matemática', duration: 120, date: '2024-01-12', type: 'pomodoro' },
        { id: '2', subject: 'Física', duration: 90, date: '2024-01-12', type: 'free' },
        { id: '3', subject: 'História', duration: 60, date: '2024-01-11', type: 'pomodoro' }
      ]);

      // Materiais de exemplo
      setMaterials([
        {
          id: '1',
          title: 'Anotações de Cálculo',
          type: 'note',
          subject: 'Matemática',
          content: 'Derivadas e integrais...',
          createdAt: '2024-01-12'
        },
        {
          id: '2',
          title: 'Livro de Física Quântica',
          type: 'pdf',
          subject: 'Física',
          createdAt: '2024-01-11'
        }
      ]);

      // Metas de exemplo
      setGoals([
        {
          id: '1',
          title: 'Dominar Cálculo',
          description: 'Completar todos os exercícios do semestre',
          targetDate: '2024-06-30',
          progress: 65,
          category: 'Matemática'
        },
        {
          id: '2',
          title: 'Projeto Final',
          description: 'Desenvolver projeto de conclusão',
          targetDate: '2024-12-15',
          progress: 25,
          category: 'Geral'
        }
      ]);

      // Posts do fórum de exemplo
      setForumPosts([
        {
          id: '1',
          author: 'Ana Silva',
          title: 'Dicas para estudar Cálculo',
          content: 'Compartilho algumas técnicas que me ajudaram...',
          subject: 'Matemática',
          likes: 15,
          replies: 8,
          createdAt: '2024-01-12'
        }
      ]);
    }
  }, [user]);

  // Componente de Onboarding
  const OnboardingView = () => {
    const [formData, setFormData] = useState({
      name: '',
      course: '',
      goals: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.name && formData.course && formData.goals) {
        setUser(formData);
        setCurrentView('dashboard');
        setShowOnboarding(false);
      }
    };

    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#00FF88] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">StudyHub</h1>
            <p className="text-[#B3B3B3]">Seu hub completo para estudos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Qual é o seu nome?
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-[#141414] border border-gray-700 rounded-xl text-white placeholder-[#B3B3B3] focus:border-[#007BFF] focus:outline-none transition-colors"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Curso ou área de estudo
              </label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full px-4 py-3 bg-[#141414] border border-gray-700 rounded-xl text-white placeholder-[#B3B3B3] focus:border-[#007BFF] focus:outline-none transition-colors"
                placeholder="Ex: Engenharia, Medicina, etc."
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Objetivos acadêmicos
              </label>
              <textarea
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                className="w-full px-4 py-3 bg-[#141414] border border-gray-700 rounded-xl text-white placeholder-[#B3B3B3] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
                placeholder="Descreva seus principais objetivos..."
                rows={3}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#007BFF] to-[#00FF88] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Começar jornada
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Componente de Header Mobile
  const MobileHeader = () => (
    <div className="md:hidden bg-[#141414] border-b border-gray-800 p-4 flex items-center justify-between">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="text-white hover:text-[#007BFF] transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-[#007BFF] to-[#00FF88] rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-white font-bold">StudyHub</h1>
      </div>
      
      <div className="w-6" /> {/* Spacer para centralizar */}
    </div>
  );

  // Componente de Navegação
  const Navigation = () => {
    const navItems = [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'planning', icon: Calendar, label: 'Planejamento' },
      { id: 'materials', icon: FileText, label: 'Materiais' },
      { id: 'tasks', icon: Target, label: 'Tarefas' },
      { id: 'pomodoro', icon: Timer, label: 'Foco' },
      { id: 'analytics', icon: BarChart3, label: 'Analytics' },
      { id: 'community', icon: Users, label: 'Comunidade' },
      { id: 'profile', icon: User, label: 'Perfil' }
    ];

    const handleNavClick = (viewId: string) => {
      setCurrentView(viewId);
      setIsSidebarOpen(false); // Fechar sidebar no mobile após navegação
    };

    return (
      <>
        {/* Overlay para mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <nav className={`
          fixed md:static top-0 left-0 z-50 
          bg-[#141414] border-r border-gray-800 
          w-64 h-full p-4
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Header da sidebar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#007BFF] to-[#00FF88] rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">StudyHub</h1>
                <p className="text-[#B3B3B3] text-sm">Olá, {user?.name}</p>
              </div>
            </div>
            
            {/* Botão fechar no mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-[#B3B3B3] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Itens de navegação */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  currentView === item.id
                    ? 'bg-[#007BFF] text-white'
                    : 'text-[#B3B3B3] hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </>
    );
  };

  // Dashboard View
  const DashboardView = () => {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const todayStudyTime = studySessions
      .filter(s => s.date === new Date().toISOString().split('T')[0])
      .reduce((acc, s) => acc + s.duration, 0);

    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-[#B3B3B3]">Visão geral dos seus estudos</p>
          </div>
          <div className="flex items-center gap-2 text-[#B3B3B3]">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#007BFF]/20 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-[#007BFF]" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">{completedTasks}/{totalTasks}</span>
            </div>
            <h3 className="text-white font-medium text-sm md:text-base">Tarefas Concluídas</h3>
            <p className="text-[#B3B3B3] text-xs md:text-sm">Hoje</p>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00FF88]/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#00FF88]" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">{Math.floor(todayStudyTime / 60)}h</span>
            </div>
            <h3 className="text-white font-medium text-sm md:text-base">Tempo de Estudo</h3>
            <p className="text-[#B3B3B3] text-xs md:text-sm">Hoje</p>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">{pomodoroCount}</span>
            </div>
            <h3 className="text-white font-medium text-sm md:text-base">Pomodoros</h3>
            <p className="text-[#B3B3B3] text-xs md:text-sm">Hoje</p>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-white">85%</span>
            </div>
            <h3 className="text-white font-medium text-sm md:text-base">Progresso</h3>
            <p className="text-[#B3B3B3] text-xs md:text-sm">Semanal</p>
          </div>
        </div>

        {/* Próximas tarefas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white">Próximas Tarefas</h2>
              <button 
                onClick={() => setCurrentView('tasks')}
                className="text-[#007BFF] hover:text-[#0056b3] transition-colors text-sm"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.status !== 'completed').slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">{task.title}</h3>
                    <p className="text-[#B3B3B3] text-xs">{task.subject}</p>
                  </div>
                  <span className="text-[#B3B3B3] text-xs whitespace-nowrap">
                    {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-white">Metas em Progresso</h2>
              <button 
                onClick={() => setCurrentView('tasks')}
                className="text-[#007BFF] hover:text-[#0056b3] transition-colors text-sm"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-4">
              {goals.slice(0, 2).map((goal) => (
                <div key={goal.id} className="p-4 bg-[#1A1A1A] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium text-sm">{goal.title}</h3>
                    <span className="text-[#00FF88] font-bold text-sm">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-[#007BFF] to-[#00FF88] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <p className="text-[#B3B3B3] text-xs">{goal.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Planning View
  const PlanningView = () => {
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
    
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Planejamento</h1>
            <p className="text-[#B3B3B3]">Organize seus horários de estudo</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 md:px-4 py-2 rounded-lg transition-colors text-sm ${
                viewMode === 'week' ? 'bg-[#007BFF] text-white' : 'bg-[#141414] text-[#B3B3B3]'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 md:px-4 py-2 rounded-lg transition-colors text-sm ${
                viewMode === 'month' ? 'bg-[#007BFF] text-white' : 'bg-[#141414] text-[#B3B3B3]'
              }`}
            >
              Mês
            </button>
          </div>
        </div>

        <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-4 mb-6">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center min-w-0">
                <h3 className="text-white font-medium mb-2 text-xs md:text-sm truncate">{day}</h3>
                <div className="space-y-1 sm:space-y-2">
                  {day === 'Seg' && (
                    <div className="bg-[#007BFF]/20 border border-[#007BFF] rounded-lg p-1 md:p-2 min-h-[3rem] sm:min-h-[3.5rem] flex flex-col justify-center">
                      <p className="text-[#007BFF] text-[10px] sm:text-xs font-medium leading-tight">09:00</p>
                      <p className="text-white text-[10px] sm:text-xs leading-tight truncate" title="Matemática">
                        <span className="hidden sm:inline">Matemática</span>
                        <span className="sm:hidden">Mat</span>
                      </p>
                    </div>
                  )}
                  {day === 'Ter' && (
                    <div className="bg-[#00FF88]/20 border border-[#00FF88] rounded-lg p-1 md:p-2 min-h-[3rem] sm:min-h-[3.5rem] flex flex-col justify-center">
                      <p className="text-[#00FF88] text-[10px] sm:text-xs font-medium leading-tight">14:00</p>
                      <p className="text-white text-[10px] sm:text-xs leading-tight truncate" title="Física">
                        <span className="hidden sm:inline">Física</span>
                        <span className="sm:hidden">Fís</span>
                      </p>
                    </div>
                  )}
                  {day === 'Qua' && (
                    <div className="bg-purple-500/20 border border-purple-500 rounded-lg p-1 md:p-2 min-h-[3rem] sm:min-h-[3.5rem] flex flex-col justify-center">
                      <p className="text-purple-500 text-[10px] sm:text-xs font-medium leading-tight">10:00</p>
                      <p className="text-white text-[10px] sm:text-xs leading-tight truncate" title="História">
                        <span className="hidden sm:inline">História</span>
                        <span className="sm:hidden">Hist</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-gradient-to-r from-[#007BFF] to-[#00FF88] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Adicionar Evento
          </button>
        </div>
      </div>
    );
  };

  // Materials View
  const MaterialsView = () => {
    const [selectedType, setSelectedType] = useState<'all' | 'note' | 'pdf' | 'link'>('all');
    
    const filteredMaterials = selectedType === 'all' 
      ? materials 
      : materials.filter(m => m.type === selectedType);

    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Materiais</h1>
            <p className="text-[#B3B3B3]">Organize seus recursos de estudo</p>
          </div>
          <button className="bg-gradient-to-r from-[#007BFF] to-[#00FF88] text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Adicionar Material
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Todos', icon: FileText },
            { id: 'note', label: 'Anotações', icon: Edit },
            { id: 'pdf', label: 'PDFs', icon: Download },
            { id: 'link', label: 'Links', icon: Link }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedType(filter.id as any)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm ${
                selectedType === filter.id 
                  ? 'bg-[#007BFF] text-white' 
                  : 'bg-[#141414] text-[#B3B3B3] hover:bg-[#1A1A1A]'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Lista de materiais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6 hover:border-[#007BFF] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
                  material.type === 'note' ? 'bg-blue-500/20' :
                  material.type === 'pdf' ? 'bg-red-500/20' : 'bg-green-500/20'
                }`}>
                  {material.type === 'note' && <Edit className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />}
                  {material.type === 'pdf' && <Download className="w-5 h-5 md:w-6 md:h-6 text-red-500" />}
                  {material.type === 'link' && <Link className="w-5 h-5 md:w-6 md:h-6 text-green-500" />}
                </div>
                <button className="text-[#B3B3B3] hover:text-white transition-colors">
                  <Star className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
              
              <h3 className="text-white font-medium mb-2 text-sm md:text-base">{material.title}</h3>
              <p className="text-[#B3B3B3] text-xs md:text-sm mb-4">{material.subject}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-[#B3B3B3] text-xs">
                  {new Date(material.createdAt).toLocaleDateString('pt-BR')}
                </span>
                <div className="flex items-center gap-2">
                  <button className="text-[#B3B3B3] hover:text-[#007BFF] transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-[#B3B3B3] hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Tasks View
  const TasksView = () => {
    const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
    
    const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Tarefas e Metas</h1>
            <p className="text-[#B3B3B3]">Gerencie suas atividades acadêmicas</p>
          </div>
          <button className="bg-gradient-to-r from-[#007BFF] to-[#00FF88] text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Todas', count: tasks.length },
            { id: 'pending', label: 'Pendentes', count: tasks.filter(t => t.status === 'pending').length },
            { id: 'in-progress', label: 'Em Progresso', count: tasks.filter(t => t.status === 'in-progress').length },
            { id: 'completed', label: 'Concluídas', count: tasks.filter(t => t.status === 'completed').length }
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id as any)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors text-sm ${
                filter === filterOption.id 
                  ? 'bg-[#007BFF] text-white' 
                  : 'bg-[#141414] text-[#B3B3B3] hover:bg-[#1A1A1A]'
              }`}
            >
              <span className="hidden sm:inline">{filterOption.label}</span>
              <span className="sm:hidden">{filterOption.label.split(' ')[0]}</span>
              <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                {filterOption.count}
              </span>
            </button>
          ))}
        </div>

        {/* Lista de tarefas */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6 hover:border-[#007BFF] transition-colors">
              <div className="flex items-start gap-4">
                <button className="mt-1 flex-shrink-0">
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00FF88]" />
                  ) : task.status === 'in-progress' ? (
                    <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-[#007BFF]" />
                  ) : (
                    <Circle className="w-5 h-5 md:w-6 md:h-6 text-[#B3B3B3]" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <h3 className={`font-medium text-sm md:text-base ${task.status === 'completed' ? 'text-[#B3B3B3] line-through' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-green-500/20 text-green-500'
                      }`}>
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-[#B3B3B3] mb-3">
                    <span>{task.subject}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  {task.description && (
                    <p className="text-[#B3B3B3] text-xs md:text-sm mb-3">{task.description}</p>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <button className="text-[#B3B3B3] hover:text-[#007BFF] transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-[#B3B3B3] hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de Metas */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">Metas de Longo Prazo</h2>
            <button className="bg-[#141414] border border-gray-700 text-white px-4 py-2 rounded-xl font-medium hover:bg-[#1A1A1A] transition-colors flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Nova Meta
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-1 text-sm md:text-base">{goal.title}</h3>
                    <p className="text-[#B3B3B3] text-xs md:text-sm">{goal.description}</p>
                  </div>
                  <span className="text-[#00FF88] font-bold text-lg ml-2">{goal.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-[#007BFF] to-[#00FF88] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs md:text-sm">
                  <span className="text-[#B3B3B3]">{goal.category}</span>
                  <span className="text-[#B3B3B3]">
                    Prazo: {new Date(goal.targetDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Pomodoro View
  const PomodoroView = () => {
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const resetTimer = () => {
      setIsRunning(false);
      setPomodoroTime(25 * 60);
      setCurrentSession('work');
    };

    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Timer de Foco</h1>
          <p className="text-[#B3B3B3]">Técnica Pomodoro para máxima produtividade</p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-[#141414] border border-gray-800 rounded-3xl p-6 md:p-8 text-center">
            <div className="mb-6">
              <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-8 flex items-center justify-center mb-4 ${
                currentSession === 'work' 
                  ? 'border-[#007BFF] bg-[#007BFF]/10' 
                  : 'border-[#00FF88] bg-[#00FF88]/10'
              }`}>
                <span className="text-2xl md:text-4xl font-bold text-white">
                  {formatTime(pomodoroTime)}
                </span>
              </div>
              
              <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                {currentSession === 'work' ? 'Tempo de Foco' : 'Pausa'}
              </h2>
              <p className="text-[#B3B3B3] text-sm">
                {currentSession === 'work' 
                  ? 'Concentre-se na sua tarefa atual' 
                  : 'Relaxe e descanse um pouco'
                }
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-colors ${
                  isRunning 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-[#007BFF] hover:bg-[#0056b3]'
                }`}
              >
                {isRunning ? (
                  <Pause className="w-6 h-6 md:w-8 md:h-8 text-white" />
                ) : (
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
                )}
              </button>
              
              <button
                onClick={resetTimer}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#141414] border border-gray-700 rounded-full flex items-center justify-center hover:bg-[#1A1A1A] transition-colors"
              >
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6 text-[#B3B3B3]" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-[#1A1A1A] rounded-xl p-3 md:p-4">
                <div className="text-xl md:text-2xl font-bold text-[#007BFF] mb-1">{pomodoroCount}</div>
                <div className="text-[#B3B3B3] text-xs md:text-sm">Pomodoros Hoje</div>
              </div>
              <div className="bg-[#1A1A1A] rounded-xl p-3 md:p-4">
                <div className="text-xl md:text-2xl font-bold text-[#00FF88] mb-1">
                  {Math.floor(studySessions.reduce((acc, s) => acc + s.duration, 0) / 60)}h
                </div>
                <div className="text-[#B3B3B3] text-xs md:text-sm">Tempo Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessões recentes */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-4">Sessões Recentes</h3>
          <div className="space-y-3">
            {studySessions.slice(0, 5).map((session) => (
              <div key={session.id} className="bg-[#141414] border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    session.type === 'pomodoro' ? 'bg-[#007BFF]' : 'bg-[#00FF88]'
                  }`} />
                  <div>
                    <h4 className="text-white font-medium text-sm">{session.subject}</h4>
                    <p className="text-[#B3B3B3] text-xs">
                      {new Date(session.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-sm">{Math.floor(session.duration / 60)}min</div>
                  <div className="text-[#B3B3B3] text-xs capitalize">{session.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Analytics View
  const AnalyticsView = () => {
    const weeklyData = [
      { day: 'Seg', hours: 3 },
      { day: 'Ter', hours: 2.5 },
      { day: 'Qua', hours: 4 },
      { day: 'Qui', hours: 2 },
      { day: 'Sex', hours: 3.5 },
      { day: 'Sáb', hours: 1.5 },
      { day: 'Dom', hours: 2 }
    ];

    const subjectData = [
      { subject: 'Matemática', hours: 12, color: '#007BFF' },
      { subject: 'Física', hours: 8, color: '#00FF88' },
      { subject: 'História', hours: 6, color: '#FF6B6B' },
      { subject: 'Química', hours: 4, color: '#FFD93D' }
    ];

    return (
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Insights e Analytics</h1>
          <p className="text-[#B3B3B3]">Acompanhe sua evolução nos estudos</p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#007BFF]/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#007BFF]" />
              </div>
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#00FF88]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">18.5h</h3>
            <p className="text-[#B3B3B3] text-xs md:text-sm">Esta semana</p>
            <p className="text-[#00FF88] text-xs mt-1">+12% vs semana anterior</p>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#00FF88]/20 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-[#00FF88]" />
              </div>
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-[#007BFF]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">85%</h3>
            <p className="text-[#B3B3B3] text-xs md:text-sm">Taxa de conclusão</p>
            <p className="text-[#007BFF] text-xs mt-1">Meta: 90%</p>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Focus className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
              </div>
              <Award className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">7</h3>
            <p className="text-[#B3B3B3] text-xs md:text-sm">Dias consecutivos</p>
            <p className="text-yellow-500 text-xs mt-1">Recorde pessoal!</p>
          </div>

          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
              </div>
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#B3B3B3]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">2.6h</h3>
            <p className="text-[#B3B3B3] text-xs md:text-sm">Média diária</p>
            <p className="text-orange-500 text-xs mt-1">Acima da meta</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico semanal */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-white mb-4">Horas de Estudo - Semana</h3>
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center gap-4">
                  <span className="text-[#B3B3B3] text-sm w-8">{day.day}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#007BFF] to-[#00FF88] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(day.hours / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium w-12">{day.hours}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* Distribuição por matéria */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-white mb-4">Tempo por Matéria</h3>
            <div className="space-y-4">
              {subjectData.map((subject) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-white font-medium text-sm">{subject.subject}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold text-sm">{subject.hours}h</span>
                    <div className="text-[#B3B3B3] text-xs">
                      {Math.round((subject.hours / 30) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
          <h3 className="text-lg font-bold text-white mb-4">Insights Personalizados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A1A1A] rounded-xl p-4 border-l-4 border-[#00FF88]">
              <h4 className="text-[#00FF88] font-medium mb-2">Parabéns!</h4>
              <p className="text-[#B3B3B3] text-sm">
                Você manteve uma rotina consistente esta semana. Continue assim!
              </p>
            </div>
            <div className="bg-[#1A1A1A] rounded-xl p-4 border-l-4 border-[#007BFF]">
              <h4 className="text-[#007BFF] font-medium mb-2">Dica</h4>
              <p className="text-[#B3B3B3] text-sm">
                Considere aumentar o tempo de Física para equilibrar com Matemática.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Community View
  const CommunityView = () => {
    const [newPost, setNewPost] = useState({ title: '', content: '', subject: '' });
    
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Comunidade</h1>
            <p className="text-[#B3B3B3]">Conecte-se com outros estudantes</p>
          </div>
          <button className="bg-gradient-to-r from-[#007BFF] to-[#00FF88] text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Nova Discussão
          </button>
        </div>

        {/* Criar post */}
        <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
          <h3 className="text-lg font-bold text-white mb-4">Compartilhe uma dica ou dúvida</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Título da discussão..."
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white placeholder-[#B3B3B3] focus:border-[#007BFF] focus:outline-none transition-colors"
            />
            <select
              value={newPost.subject}
              onChange={(e) => setNewPost({...newPost, subject: e.target.value})}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white focus:border-[#007BFF] focus:outline-none transition-colors"
            >
              <option value="">Selecione a matéria</option>
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="História">História</option>
              <option value="Química">Química</option>
              <option value="Geral">Geral</option>
            </select>
            <textarea
              placeholder="Descreva sua dúvida ou compartilhe uma dica..."
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white placeholder-[#B3B3B3] focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
              rows={3}
            />
            <button className="bg-[#007BFF] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#0056b3] transition-colors flex items-center gap-2 text-sm">
              <Send className="w-4 h-4" />
              Publicar
            </button>
          </div>
        </div>

        {/* Posts da comunidade */}
        <div className="space-y-4">
          {forumPosts.map((post) => (
            <div key={post.id} className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6 hover:border-[#007BFF] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#007BFF] to-[#00FF88] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs md:text-sm">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-white font-medium text-sm">{post.author}</h3>
                    <span className="text-[#B3B3B3] text-sm">•</span>
                    <span className="text-[#B3B3B3] text-sm">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="bg-[#007BFF]/20 text-[#007BFF] px-2 py-1 rounded-full text-xs">
                      {post.subject}
                    </span>
                  </div>
                  
                  <h4 className="text-white font-medium text-base md:text-lg mb-2">{post.title}</h4>
                  <p className="text-[#B3B3B3] mb-4 text-sm">{post.content}</p>
                  
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-[#B3B3B3] hover:text-[#007BFF] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#B3B3B3] hover:text-[#007BFF] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.replies} respostas</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Profile View
  const ProfileView = () => {
    const [profileData, setProfileData] = useState({
      name: user?.name || '',
      course: user?.course || '',
      goals: user?.goals || ''
    });

    const handleProfileUpdate = (field: string, value: string) => {
      setProfileData(prev => ({ ...prev, [field]: value }));
      // Atualizar o usuário também
      if (user) {
        setUser({ ...user, [field]: value });
      }
    };

    return (
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Perfil</h1>
          <p className="text-[#B3B3B3]">Gerencie suas informações e preferências</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do usuário */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
              <h3 className="text-lg font-bold text-white mb-4">Informações Pessoais</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleProfileUpdate('name', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white focus:border-[#007BFF] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Curso</label>
                  <input
                    type="text"
                    value={profileData.course}
                    onChange={(e) => handleProfileUpdate('course', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white focus:border-[#007BFF] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Objetivos</label>
                  <textarea
                    value={profileData.goals}
                    onChange={(e) => handleProfileUpdate('goals', e.target.value)}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-xl text-white focus:border-[#007BFF] focus:outline-none transition-colors resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
              <h3 className="text-lg font-bold text-white mb-4">Preferências</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Notificações</h4>
                    <p className="text-[#B3B3B3] text-sm">Receber lembretes de tarefas</p>
                  </div>
                  <button className="w-12 h-6 bg-[#007BFF] rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Som do Timer</h4>
                    <p className="text-[#B3B3B3] text-sm">Alertas sonoros no Pomodoro</p>
                  </div>
                  <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Modo Escuro</h4>
                    <p className="text-[#B3B3B3] text-sm">Interface em tema escuro</p>
                  </div>
                  <button className="w-12 h-6 bg-[#007BFF] rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas do usuário */}
          <div className="space-y-6">
            <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-[#007BFF] to-[#00FF88] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg md:text-2xl">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{user?.name}</h3>
              <p className="text-[#B3B3B3] text-sm mb-4">{user?.course}</p>
              <button className="bg-[#1A1A1A] border border-gray-700 text-white px-4 py-2 rounded-xl font-medium hover:bg-[#2A2A2A] transition-colors text-sm">
                Alterar Foto
              </button>
            </div>

            <div className="bg-[#141414] border border-gray-800 rounded-2xl p-4 md:p-6">
              <h3 className="text-lg font-bold text-white mb-4">Conquistas</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Primeira Semana</h4>
                    <p className="text-[#B3B3B3] text-xs">7 dias consecutivos</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#007BFF]/20 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-[#007BFF]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Focado</h4>
                    <p className="text-[#B3B3B3] text-xs">10 pomodoros</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-xl">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00FF88]/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-[#00FF88]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Organizador</h4>
                    <p className="text-[#B3B3B3] text-xs">20 tarefas concluídas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderização principal
  if (showOnboarding && !user) {
    return <OnboardingView />;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col md:flex-row font-inter">
      {/* Header mobile */}
      <MobileHeader />
      
      {/* Sidebar */}
      <Navigation />
      
      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'planning' && <PlanningView />}
        {currentView === 'materials' && <MaterialsView />}
        {currentView === 'tasks' && <TasksView />}
        {currentView === 'pomodoro' && <PomodoroView />}
        {currentView === 'analytics' && <AnalyticsView />}
        {currentView === 'community' && <CommunityView />}
        {currentView === 'profile' && <ProfileView />}
      </main>
    </div>
  );
}