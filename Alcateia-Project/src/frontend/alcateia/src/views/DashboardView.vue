<script setup>
import { useMetrics } from '../composables/useMetrics';
import { useTasksStore } from '../stores/tasksStore';
import { computed } from 'vue';

const { dashboardMetrics } = useMetrics();
const tasksStore = useTasksStore();

const totalMembers = computed(() => dashboardMetrics.value.totalMembers);
const totalActiveTasks = computed(() => dashboardMetrics.value.totalActiveTasks);
const totalCompletedTasks = computed(() => dashboardMetrics.value.totalCompletedTasks);
const totalProjects = computed(() => dashboardMetrics.value.totalProjects);

const recentTasks = computed(() => {
    return tasksStore.tasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
});
</script>

<template>
<div id="view-dashboard" class="view-content">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 fade-in-up">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-sm mb-1">Membros Ativos</p>
                    <p class="text-3xl font-light">{{ totalMembers }}</p>
                </div>
                <i class="fas fa-users text-2xl text-blue-400"></i>
            </div>
        </div>
        <div class="card p-6 fade-in-up">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-sm mb-1">Tarefas Ativas</p>
                    <p class="text-3xl font-light">{{ totalActiveTasks }}</p>
                </div>
                <i class="fas fa-tasks text-2xl text-purple-400"></i>
            </div>
        </div>
        <div class="card p-6 fade-in-up">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-sm mb-1">Tarefas Concluídas</p>
                    <p class="text-3xl font-light">{{ totalCompletedTasks }}</p>
                </div>
                <i class="fas fa-check-circle text-2xl text-green-400"></i>
            </div>
        </div>
        <div class="card p-6 fade-in-up">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-sm mb-1">Projetos</p>
                    <p class="text-3xl font-light">{{ totalProjects }}</p>
                </div>
                <i class="fas fa-rocket text-2xl text-indigo-400"></i>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card p-6">
            <h3 class="text-xl font-light mb-4">Resumo da Equipe</h3>
            <div id="teamSummary" class="space-y-3">
                <p class="text-slate-400">Conteúdo do Resumo da Equipe (a ser implementado)</p>
            </div>
        </div>
        <div class="card p-6">
            <h3 class="text-xl font-light mb-4">Tarefas Recentes</h3>
            <div id="recentTasks" class="space-y-3">
                <div v-for="task in recentTasks" :key="task.id" class="p-3 bg-slate-800 rounded-lg flex justify-between items-center">
                    <span class="text-sm truncate">{{ task.title }}</span>
                    <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full capitalize', task.status === 'completed' ? 'text-green-400 bg-green-400/20' : 'text-yellow-400 bg-yellow-400/20']">{{ task.status.replace('_', ' ') }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>