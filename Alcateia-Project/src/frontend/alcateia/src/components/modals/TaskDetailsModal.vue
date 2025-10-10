<script setup>
import { computed } from 'vue';
import { useTasksStore } from '../../stores/tasksStore';
import { useTeamStore } from '../../stores/teamStore';
import { useProjectsStore } from '../../stores/projectStore';
import { getPriorityClass } from '../../helpers/ui';

const tasksStore = useTasksStore();
const teamStore = useTeamStore();
const projectsStore = useProjectsStore();

const currentTask = computed(() => {
    if (!tasksStore.currentTaskId) return null;
    return tasksStore.getTask(tasksStore.currentTaskId);
});

const assignee = computed(() => {
    if (!currentTask.value) return null;
    return teamStore.members.find(m => m.id === currentTask.value.assigneeId);
});

const project = computed(() => {
    if (!currentTask.value || !currentTask.value.projectId) return null;
    return projectsStore.getProject(currentTask.value.projectId);
});

const formattedDueDate = computed(() => {
    if (!currentTask.value?.dueDate) return 'N/A';
    return new Date(currentTask.value.dueDate).toLocaleDateString('pt-BR');
});
</script>

<template>
<div v-if="tasksStore.isTaskDetailsModalOpen && currentTask" id="taskDetailsModal" class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div class="modal-content p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-light" id="taskDetailsTitle">{{ currentTask.title }}</h3>
            <button class="text-slate-400 hover:text-white" @click="tasksStore.closeTaskDetailsModal()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div id="taskDetailsContent" class="space-y-6">
            
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="card p-3">
                    <p class="text-slate-400">Status</p>
                    <p class="font-semibold capitalize">{{ currentTask.status.replace('_', ' ') }}</p>
                </div>
                <div class="card p-3">
                    <p class="text-slate-400">Prioridade</p>
                    <p :class="['font-semibold capitalize text-sm', getPriorityClass(currentTask.priority)]">{{ currentTask.priority }}</p>
                </div>
                <div class="card p-3">
                    <p class="text-slate-400">Atribuída a</p>
                    <p class="font-semibold">{{ assignee ? assignee.name : 'Membro Desconhecido' }}</p>
                </div>
                <div class="card p-3">
                    <p class="text-slate-400">Projeto</p>
                    <p class="font-semibold">{{ project ? project.name : 'Nenhum' }}</p>
                </div>
                <div class="card p-3">
                    <p class="text-slate-400">Vencimento</p>
                    <p class="font-semibold">{{ formattedDueDate }}</p>
                </div>
                <div class="card p-3">
                    <p class="text-slate-400">Criada em</p>
                    <p class="font-semibold">{{ new Date(currentTask.createdAt).toLocaleDateString('pt-BR') }}</p>
                </div>
            </div>

            <div class="card p-4">
                <h4 class="text-lg font-light mb-2">Descrição</h4>
                <p class="text-slate-300">{{ currentTask.description || 'Nenhuma descrição fornecida.' }}</p>
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button v-if="currentTask.status !== 'completed'" class="btn-success" @click="tasksStore.updateTaskStatus(currentTask.id, 'completed'); tasksStore.closeTaskDetailsModal()">
                    <i class="fas fa-check mr-2"></i>Concluir Tarefa
                </button>
                <button class="btn-danger" @click="tasksStore.deleteTask(currentTask.id); tasksStore.closeTaskDetailsModal()">
                    <i class="fas fa-trash-alt mr-2"></i>Deletar
                </button>
            </div>
        </div>
    </div>
</div>
</template>