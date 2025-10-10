import { defineStore } from 'pinia';
import { fetchTasks } from '../services/dataService'; 
import { saveData } from '../services/localStorageService'; 
import { useTeamStore } from './teamStore'; 

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
        filters: { status: 'all', priority: 'all', assignee: 'all' },
        isLoading: false,
        currentView: 'dashboard',
        isCreateTaskModalOpen: false,
        isTaskDetailsModalOpen: false,
        currentTaskId: null,
    }),

    getters: {
        calculateMemberTaskStats: (state) => (memberId) => {
            const memberTasks = state.tasks.filter(task => task.assigneeId === memberId);
            
            return {
                pending: memberTasks.filter(t => t.status === 'pending').length,
                inProgress: memberTasks.filter(t => t.status === 'in_progress').length,
                completed: memberTasks.filter(t => t.status === 'completed').length,
                total: memberTasks.length
            };
        },

        getTask: (state) => (taskId) => {
            return state.tasks.find(t => t.id === taskId);
        },

        overdueTasks: (state) => {
            const now = new Date();
            return state.tasks.filter(task => 
                task.dueDate && 
                new Date(task.dueDate) < now && 
                task.status !== 'completed'
            );
        },

        getTasksByMember: (state) => (memberId) => {
            return state.tasks.filter(task => task.assigneeId === memberId);
        },

        getTasksByProject: (state) => (projectId) => {
            return state.tasks.filter(task => task.projectId === projectId);
        },
    },

    actions: {
        async loadTasks() {
            this.isLoading = true;
            try {
                this.tasks = await fetchTasks();
            } catch (error) {
                console.error("Erro ao carregar tarefas:", error);
            } finally {
                this.isLoading = false;
            }
        },

        switchTab(viewName) {
            this.currentView = viewName;
        },

        updateMemberTaskStatsInTeamStore(memberId) {
            const teamStore = useTeamStore();
            teamStore.recalculateMemberStats(memberId);
        },

        createTask(taskData) {
            if (!taskData.title || !taskData.assigneeId) {
                throw new Error('Título e responsável são obrigatórios');
            }

            const newTask = {
                id: Date.now(),
                title: taskData.title.trim(),
                description: taskData.description?.trim() || '',
                status: 'pending',
                priority: taskData.priority || 'medium',
                assigneeId: parseInt(taskData.assigneeId),
                assignedBy: 'admin_001',
                projectId: taskData.projectId ? parseInt(taskData.projectId) : null,
                dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
                createdAt: new Date(),
                updatedAt: new Date(),
                completedAt: null,
                estimatedHours: taskData.estimatedHours || null,
                tags: taskData.tags || []
            };

            this.tasks.push(newTask);
            this.updateMemberTaskStatsInTeamStore(newTask.assigneeId);
            saveData('tasks', this.tasks);
            return newTask;
        },

        updateTaskStatus(taskId, newStatus) {
            const task = this.tasks.find(t => t.id === taskId);
            if (!task) {
                throw new Error('Tarefa não encontrada');
            }

            const oldStatus = task.status;
            task.status = newStatus;
            task.updatedAt = new Date();

            if (newStatus === 'completed' && oldStatus !== 'completed') {
                task.completedAt = new Date();
            } else if (newStatus !== 'completed') {
                task.completedAt = null;
            }

            this.updateMemberTaskStatsInTeamStore(task.assigneeId);
            saveData('tasks', this.tasks);
            return task;
        },

        deleteTask(taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (!task) {
                throw new Error('Tarefa não encontrada');
            }

            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.updateMemberTaskStatsInTeamStore(task.assigneeId);
            saveData('tasks', this.tasks);
        },

        openCreateTaskModal() { this.isCreateTaskModalOpen = true; },
        closeCreateTaskModal() { this.isCreateTaskModalOpen = false; },
        openTaskDetails(taskId) {
            this.currentTaskId = taskId;
            this.isTaskDetailsModalOpen = true;
        },
        closeTaskDetailsModal() {
            this.isTaskDetailsModalOpen = false;
            this.currentTaskId = null;
        }
    },
});