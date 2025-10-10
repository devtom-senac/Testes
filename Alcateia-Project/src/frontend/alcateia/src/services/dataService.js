import { loadData } from './localStorageService';
import { getRoleIcon } from '../helpers/ui';

const generateMoodHistory = () => {
    const moods = ['excellent', 'good', 'neutral', 'low', 'stressed', 'energetic'];
    const history = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        history.push({
            date: date.toISOString().split('T')[0],
            mood: moods[Math.floor(Math.random() * moods.length)],
            moodValue: Math.floor(Math.random() * 5) + 1
        });
    }
    return history;
};

const mockMembers = [
    { 
        id: 1, 
        name: "Ana Silva", 
        role: "Tech Lead", 
        icon: getRoleIcon("Tech Lead"),
        email: "ana.silva@alcateia.com",
        isActive: true,
        createdAt: new Date('2024-01-15'),
        moodHistory: generateMoodHistory(),
        weeklyMoodAverage: 0,
        taskStats: { pending: 0, inProgress: 0, completed: 0, total: 0 }
    },
    { 
        id: 2, 
        name: "Carlos Santos", 
        role: "Frontend Developer", 
        icon: getRoleIcon("Frontend Developer"),
        email: "carlos.santos@alcateia.com",
        isActive: true,
        createdAt: new Date('2024-01-20'),
        moodHistory: generateMoodHistory(),
        weeklyMoodAverage: 0,
        taskStats: { pending: 0, inProgress: 0, completed: 0, total: 0 }
    },
    { 
        id: 3, 
        name: "Maria Costa", 
        role: "Backend Developer", 
        icon: getRoleIcon("Backend Developer"),
        email: "maria.costa@alcateia.com",
        isActive: true,
        createdAt: new Date('2024-01-18'),
        moodHistory: generateMoodHistory(),
        weeklyMoodAverage: 0,
        taskStats: { pending: 0, inProgress: 0, completed: 0, total: 0 }
    }
];

const mockTasks = [
    {
        id: 1,
        title: "Revisar código do sistema de login",
        description: "Realizar code review completo do módulo de autenticação",
        status: "pending", 
        priority: "high", 
        assigneeId: 1,
        assignedBy: 'admin_001',
        projectId: 1,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completedAt: null,
        estimatedHours: 4,
        tags: ['code-review', 'security']
    },
    {
        id: 2,
        title: "Implementar componente de dashboard",
        description: "Criar componente React/Vue para exibição de métricas",
        status: "in_progress",
        priority: "medium",
        assigneeId: 2,
        assignedBy: 'admin_001',
        projectId: 2,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        completedAt: null,
        estimatedHours: 8,
        tags: ['frontend', 'react']
    },
    {
        id: 3,
        title: "Configurar banco de dados",
        description: "Setup inicial do PostgreSQL com migrations",
        status: "completed",
        priority: "high",
        assigneeId: 3,
        assignedBy: 'admin_001',
        projectId: 1,
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        estimatedHours: 6,
        tags: ['database', 'setup']
    }
];

const mockProjects = [
    { 
        id: 1, 
        name: "Sistema de Login", 
        description: "Implementação de autenticação segura", 
        priority: "high",
        status: "active",
        members: [1, 3],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date(),
        sprints: [
            { 
                id: 1, 
                name: "Sprint 1 - Autenticação Básica", 
                description: "Implementar login e logout", 
                duration: 14, 
                completed: true, 
                completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                startDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            },
            { 
                id: 2, 
                name: "Sprint 2 - Segurança", 
                description: "Adicionar 2FA e validações", 
                duration: 14, 
                completed: false, 
                completedAt: null,
                startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        ]
    },
    { 
        id: 2, 
        name: "Dashboard Analytics", 
        description: "Painel de métricas e relatórios", 
        priority: "medium",
        status: "active",
        members: [1, 2],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date(),
        sprints: [
            { 
                id: 3, 
                name: "Sprint 1 - Interface Base", 
                description: "Criar layout e componentes", 
                duration: 14, 
                completed: true, 
                completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                startDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
                endDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
            }
        ]
    }
];

export async function fetchMembers() {
    return loadData('members', mockMembers);
}

export async function fetchTasks() {
    return loadData('tasks', mockTasks);
}

export async function fetchProjects() {
    return loadData('projects', mockProjects);
}