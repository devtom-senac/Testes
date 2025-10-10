<script setup>
import { useProjectsStore } from '../stores/projectStore';
import { useAuthStore } from '../stores/authStore';

const projectsStore = useProjectsStore();
const authStore = useAuthStore();
</script>

<template>
<div id="view-projects" class="view-content">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-light">Gerenciamento de Projetos</h2>
        <button v-if="authStore.hasPermission('manage_members')" class="btn-primary" @click="projectsStore.openAddProjectModal">
            <i class="fas fa-plus mr-2"></i>Novo Projeto
        </button>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" id="projectsGrid">
        <div v-for="project in projectsStore.projectsProgress" :key="project.id" class="card p-6 cursor-pointer hover:bg-slate-800 transition-colors" @click="projectsStore.openProjectDetails(project.id)">
            <p class="text-lg font-semibold mb-2">{{ project.name }}</p>
            <div class="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: project.progress + '%' }"></div>
            </div>
            <p class="text-sm text-slate-400">{{ project.progress }}% Concluído ({{ project.completedSprints }} / {{ project.totalSprints }} Sprints)</p>
        </div>
    </div>
</div>
</template>