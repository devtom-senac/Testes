import { defineStore } from 'pinia';
import { fetchTasks, fetchMembers  } from '../services/dataService';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        tasks: [],
        members: [], // Novo estado para membros
        isLoading: false,
    }),

    getters: {
        totalActiveTasks: (state) => {
            return state.tasks.filter(t => t.status !== 'completed').length;
        },

        totalCompletedTasks: (state) => {
            return state.tasks.filter(t => t.status === 'completed').length;
        },
        
        // Novo Getter: Membros com status 'active'
        totalActiveMembers: (state) => {
            return state.members.filter(m => m.status === 'active').length;
        },
    },

    actions: {
        async loadDashboardData() {
            this.isLoading = true;
            try {
                // Busca de ambas as listas
                const [tasks, members] = await Promise.all([
                    fetchTasks(),
                    fetchMembers(),
                ]);
                
                this.tasks = tasks;
                this.members = members;
                
            } catch (error) {
                console.error("Erro ao carregar dados do Dashboard:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});