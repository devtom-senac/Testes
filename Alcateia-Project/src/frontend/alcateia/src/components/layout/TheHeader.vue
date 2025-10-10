<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/authStore';
import { useTasksStore } from '../../stores/tasksStore';

const authStore = useAuthStore();
const tasksStore = useTasksStore();

const { currentView } = storeToRefs(tasksStore);
const { currentUser } = storeToRefs(authStore);

const navItems = [
    { name: 'Dashboard', icon: 'fas fa-chart-pie', view: 'dashboard' },
    { name: 'Tarefas', icon: 'fas fa-tasks', view: 'tasks' },
    { name: 'Equipe', icon: 'fas fa-users', view: 'team' },
    { name: 'Projetos', icon: 'fas fa-project-diagram', view: 'projects' },
    { name: 'Analytics', icon: 'fas fa-chart-line', view: 'analytics' },
];

const switchView = (viewName) => {
    tasksStore.switchTab(viewName);
};
</script>

<template>
<header class="mb-8 fade-in-up">
    <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
            <div class="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <i class="fas fa-paw text-xl text-white"></i>
            </div>
            <div>
                <h1 class="text-4xl font-light bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Alcatéia
                </h1>
                <p class="text-slate-400">Sistema de Gestão de Tarefas</p>
            </div>
        </div>
        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <i :class="currentUser.role === 'admin' ? 'fas fa-crown' : 'fas fa-user'" class="text-white text-sm"></i>
                </div>
                <div class="text-right">
                    <div class="flex items-center space-x-2">
                        <p class="text-sm font-medium">{{ currentUser.name }}</p>
                        <span v-if="authStore.isAdmin" class="admin-badge">ADMIN</span>
                    </div>
                    <p class="text-xs text-slate-400">{{ new Date().toLocaleTimeString() }}</p>
                </div>
            </div>
            <div class="w-3 h-3 bg-green-500 rounded-full pulse-animation"></div>
        </div>
    </div>
    
    <div class="flex space-x-2 mb-6">
        <button 
            v-for="item in navItems"
            :key="item.view"
            :class="[
                'px-6 py-3 rounded-xl transition-all',
                currentView === item.view ? 'tab-active' : 'tab-inactive'
            ]"
            @click="switchView(item.view)"
        >
            <i :class="[item.icon, 'mr-2']"></i>{{ item.name }}
        </button>
    </div>
</header>
</template>