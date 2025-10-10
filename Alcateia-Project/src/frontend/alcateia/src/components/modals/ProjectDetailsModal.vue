<script setup>
import { computed } from 'vue';
import { useProjectsStore } from '../../stores/projectStore';
import { useTeamStore } from '../../stores/teamStore';

const projectsStore = useProjectsStore();
const teamStore = useTeamStore();

const currentProject = computed(() => {
    if (!projectsStore.currentProjectId) return null;
    return projectsStore.getProject(projectsStore.currentProjectId);
});

const projectMembers = computed(() => {
    if (!currentProject.value) return [];
    return currentProject.value.members.map(memberId => 
        teamStore.members.find(m => m.id === memberId)
    ).filter(Boolean);
});

const projectSprints = computed(() => {
    return currentProject.value?.sprints || [];
});

const projectTasks = computed(() => {
    if (!currentProject.value) return [];
    return projectsStore.projectTasks(currentProject.value.id);
});

const openAssignMemberModal = () => {
    projectsStore.closeProjectDetailsModal();
    projectsStore.openAssignMemberModal(currentProject.value.id);
};

const openAddSprintModal = () => {
    projectsStore.closeProjectDetailsModal();
    projectsStore.openAddSprintModal(currentProject.value.id);
};

const removeMember = (memberId) => {
    if (confirm(`Tem certeza que deseja remover este membro do projeto ${currentProject.value.name}?`)) {
        projectsStore.removeMemberFromProject(currentProject.value.id, memberId);
    }
};
</script>

<template>
<div v-if="projectsStore.isProjectDetailsModalOpen && currentProject" id="projectDetailsModal" class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div class="modal-content p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-light" id="projectDetailsTitle">{{ currentProject.name }} ({{ currentProject.status.toUpperCase() }})</h3>
            <button class="text-slate-400 hover:text-white" @click="projectsStore.closeProjectDetailsModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <p class="text-slate-300 mb-6">{{ currentProject.description }}</p>

        <div class="space-y-6">
            
            <div>
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-light">Membros do Projeto ({{ projectMembers.length }})</h4>
                    <button class="btn-secondary text-sm" @click="openAssignMemberModal">
                        <i class="fas fa-plus mr-1"></i>Atribuir Membro
                    </button>
                </div>
                <div id="projectMembers" class="space-y-2 card p-4">
                    <div v-for="member in projectMembers" :key="member.id" class="flex justify-between items-center bg-slate-800 p-2 rounded-lg">
                        <span class="text-sm font-medium">{{ member.name }} ({{ member.role }})</span>
                        <button class="text-red-400 hover:text-red-500 text-xs" @click="removeMember(member.id)">
                            <i class="fas fa-trash"></i> Remover
                        </button>
                    </div>
                    <p v-if="projectMembers.length === 0" class="text-slate-500 text-sm">Nenhum membro atribuído.</p>
                </div>
            </div>

            <div>
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-light">Sprints ({{ projectSprints.length }})</h4>
                    <button class="btn-secondary text-sm" @click="openAddSprintModal">
                        <i class="fas fa-plus mr-1"></i>Adicionar Sprint
                    </button>
                </div>
                <div id="projectSprints" class="space-y-3 card p-4">
                    <div v-for="sprint in projectSprints" :key="sprint.id" class="p-3 bg-slate-800 rounded-lg border" :class="sprint.completed ? 'border-green-600/50' : 'border-yellow-600/50'">
                        <div class="flex justify-between items-center">
                            <h5 class="text-md font-semibold">{{ sprint.name }}</h5>
                            <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', sprint.completed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400']">
                                {{ sprint.completed ? 'CONCLUÍDA' : 'ATIVA' }}
                            </span>
                        </div>
                        <p class="text-sm text-slate-400 mt-1">{{ sprint.description }}</p>
                    </div>
                    <p v-if="projectSprints.length === 0" class="text-slate-500 text-sm">Nenhuma sprint definida.</p>
                </div>
            </div>

            <div>
                <h4 class="text-lg font-light mb-4">Tarefas Associadas ({{ projectTasks.length }})</h4>
                <div class="space-y-2 card p-4">
                    <div v-for="task in projectTasks" :key="task.id" class="flex justify-between items-center bg-slate-800 p-2 rounded-lg">
                        <span class="text-sm truncate">{{ task.title }}</span>
                        <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full capitalize', task.status === 'completed' ? 'text-green-400 bg-green-400/20' : 'text-yellow-400 bg-yellow-400/20']">{{ task.status.replace('_', ' ') }}</span>
                    </div>
                    <p v-if="projectTasks.length === 0" class="text-slate-500 text-sm">Nenhuma tarefa associada.</p>
                </div>
            </div>

        </div>
    </div>
</div>
</template>