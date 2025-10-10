<script setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTeamStore } from './stores/teamStore';
import { useTasksStore } from './stores/tasksStore';
import { useProjectsStore } from './stores/projectStore';

import TheHeader from './components/layout/TheHeader.vue';

import DashboardView from './views/DashboardView.vue';
import TasksView from './views/TasksView.vue';
import TeamView from './views/TeamView.vue';
import ProjectsView from './views/ProjectsView.vue';
import AnalyticsView from './views/AnalyticsView.vue';

import AddMemberModal from './components/modals/AddMemberModal.vue';
import CreateTaskModal from './components/modals/CreateTaskModal.vue';
import AddProjectModal from './components/modals/AddProjectModal.vue';
import MoodCheckinModal from './components/modals/MoodCheckinModal.vue';
import ProjectDetailsModal from './components/modals/ProjectDetailsModal.vue';
import TaskDetailsModal from './components/modals/TaskDetailsModal.vue';
import AssignMemberModal from './components/modals/AssignMemberModal.vue';
import AddSprintModal from './components/modals/AddSprintModal.vue';

const teamStore = useTeamStore();
const tasksStore = useTasksStore();
const projectsStore = useProjectsStore();

const { currentView } = storeToRefs(tasksStore);
const { isLoading: tasksLoading } = storeToRefs(tasksStore);
const { isLoading: teamLoading } = storeToRefs(teamStore);
const { isLoading: projectsLoading } = storeToRefs(projectsStore);

const isAppLoading = computed(() => tasksLoading.value || teamLoading.value || projectsLoading.value);

const viewComponents = {
    dashboard: DashboardView,
    tasks: TasksView,
    team: TeamView,
    projects: ProjectsView,
    analytics: AnalyticsView,
};

onMounted(async () => {
    await Promise.all([
        teamStore.loadMembers(),
        tasksStore.loadTasks(),
        projectsStore.loadProjects(),
    ]);
    console.log('🐺 Alcatéia - Sistema de Gestão de Tarefas inicializado com sucesso!');
});

const isAnyModalOpen = computed(() => {
    return teamStore.isAddMemberModalOpen || 
           teamStore.isMoodCheckinModalOpen || 
           tasksStore.isCreateTaskModalOpen || 
           tasksStore.isTaskDetailsModalOpen ||
           projectsStore.isAddProjectModalOpen ||
           projectsStore.isProjectDetailsModalOpen ||
           projectsStore.isAssignMemberModalOpen ||
           projectsStore.isAddSprintModalOpen;
});
</script>

<template>
<div class="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white h-full" :class="{ 'overflow-hidden': isAnyModalOpen }">

    <div id="notifications" class="fixed top-4 right-4 z-50 space-y-2"></div>
    
    <div class="min-h-full p-6 max-w-7xl mx-auto">
        
        <TheHeader />

        <main>
            <div v-if="isAppLoading" class="text-center py-20">
                <i class="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
                <p class="mt-4 text-slate-400">Carregando dados da Alcatéia...</p>
            </div>
            
            <component 
                v-else 
                :is="viewComponents[currentView]" 
                :key="currentView"
                class="view-content"
            />
        </main>
    </div>

    <AddMemberModal />
    <CreateTaskModal />
    <AddProjectModal />
    <MoodCheckinModal />
    <ProjectDetailsModal />
    <TaskDetailsModal />
    <AssignMemberModal />
    <AddSprintModal />
</div>
</template>