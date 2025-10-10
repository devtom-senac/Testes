<script setup>
import { ref, computed } from 'vue';
import { useTasksStore } from '../../stores/tasksStore';
import { useTeamStore } from '../../stores/teamStore';
import { useProjectsStore } from '../../stores/projectStore';

const tasksStore = useTasksStore();
const teamStore = useTeamStore();
const projectsStore = useProjectsStore();

const taskData = ref({
    title: '',
    description: '',
    priority: 'medium',
    assigneeId: '',
    projectId: '',
    dueDate: '',
});
const validationErrors = ref([]);

const memberOptions = computed(() => teamStore.members.filter(m => m.isActive));
const projectOptions = computed(() => projectsStore.projects.filter(p => p.status === 'active'));

const handleSubmit = () => {
    validationErrors.value = [];
    if (!taskData.value.title.trim()) {
        validationErrors.value.push('Título da Tarefa é obrigatório.');
    }
    if (!taskData.value.assigneeId) {
        validationErrors.value.push('Atribuir para é obrigatório.');
    }

    if (validationErrors.value.length === 0) {
        try {
            tasksStore.createTask(taskData.value);
            
            tasksStore.closeCreateTaskModal();
            taskData.value = { 
                title: '', 
                description: '', 
                priority: 'medium', 
                assigneeId: '', 
                projectId: '', 
                dueDate: '' 
            };
        } catch (e) {
            validationErrors.value.push(e.message);
        }
    }
};
</script>

<template>
<div v-if="tasksStore.isCreateTaskModalOpen" id="createTaskModal" class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div class="modal-content p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-light mb-6">Criar Nova Tarefa</h3>
        <form @submit.prevent="handleSubmit" id="createTaskForm" class="space-y-4">
            <div>
                <label class="block text-sm text-slate-400 mb-2">Título da Tarefa</label>
                <input type="text" v-model="taskData.title" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Descrição</label>
                <textarea v-model="taskData.description" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" rows="3"></textarea>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Prioridade</label>
                <select v-model="taskData.priority" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                </select>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Atribuir para</label>
                <select v-model="taskData.assigneeId" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
                    <option value="">Selecione um membro</option>
                    <option v-for="member in memberOptions" :key="member.id" :value="member.id">{{ member.name }}</option>
                </select>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Projeto (Opcional)</label>
                <select v-model="taskData.projectId" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white">
                    <option value="">Nenhum projeto</option>
                    <option v-for="project in projectOptions" :key="project.id" :value="project.id">{{ project.name }}</option>
                </select>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Data de Vencimento</label>
                <input type="date" v-model="taskData.dueDate" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white">
            </div>

            <div v-if="validationErrors.length" class="text-red-400 text-sm space-y-1 p-3 bg-red-900/20 rounded-lg border border-red-800/50">
                <p v-for="error in validationErrors" :key="error">{{ error }}</p>
            </div>

            <div class="flex space-x-4 pt-4">
                <button type="submit" class="btn-primary flex-1">Criar Tarefa</button>
                <button type="button" class="btn-secondary flex-1" @click="tasksStore.closeCreateTaskModal()">Cancelar</button>
            </div>
        </form>
    </div>
</div>
</template>