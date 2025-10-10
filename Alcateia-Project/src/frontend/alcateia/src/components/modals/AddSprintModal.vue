<script setup>
import { ref, computed } from 'vue';
import { useProjectsStore } from '../../stores/projectStore';
import { validateSprint } from '../../helpers/validation';

const projectsStore = useProjectsStore();
const validationErrors = ref([]);

const sprintData = ref({
    name: '',
    description: '',
    duration: 14, 
});

const currentProject = computed(() => {
    return projectsStore.getProject(projectsStore.currentProjectId);
});

const handleSubmit = () => {
    validationErrors.value = validateSprint(sprintData.value);

    if (validationErrors.value.length === 0 && currentProject.value) {
        try {
            // Calcula as datas de início e fim da sprint baseadas na duração
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + parseInt(sprintData.value.duration));

            projectsStore.addSprintToProject(currentProject.value.id, {
                ...sprintData.value,
                startDate: startDate,
                endDate: endDate
            });
            
            // Fecha o modal atual e reabre o modal de detalhes do projeto
            projectsStore.closeAddSprintModal();
            projectsStore.openProjectDetails(currentProject.value.id);
            sprintData.value = { name: '', description: '', duration: 14 };
        } catch (e) {
            validationErrors.value.push(e.message);
        }
    }
};

const handleCancel = () => {
    // Fecha o modal e retorna para os detalhes do projeto
    projectsStore.closeAddSprintModal();
    projectsStore.openProjectDetails(currentProject.value.id);
};
</script>

<template>
<div v-if="projectsStore.isAddSprintModalOpen && currentProject" id="addSprintModal" class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div class="modal-content p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-light mb-6">Adicionar Sprint ao Projeto: {{ currentProject.name }}</h3>
        <form @submit.prevent="handleSubmit" id="addSprintForm" class="space-y-4">
            <div>
                <label class="block text-sm text-slate-400 mb-2">Nome do Sprint</label>
                <input type="text" v-model="sprintData.name" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Descrição</label>
                <textarea v-model="sprintData.description" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" rows="3"></textarea>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Duração (dias)</label>
                <input type="number" v-model.number="sprintData.duration" min="1" max="30" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
            </div>

            <div v-if="validationErrors.length" class="text-red-400 text-sm space-y-1 p-3 bg-red-900/20 rounded-lg border border-red-800/50">
                <p v-for="error in validationErrors" :key="error">{{ error }}</p>
            </div>

            <div class="flex space-x-4 pt-4">
                <button type="submit" class="btn-primary flex-1">Criar Sprint</button>
                <button type="button" class="btn-secondary flex-1" @click="handleCancel()">Cancelar</button>
            </div>
        </form>
    </div>
</div>
</template>