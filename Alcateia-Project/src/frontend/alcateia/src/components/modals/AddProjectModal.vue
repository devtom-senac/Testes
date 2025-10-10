<script setup>
import { ref } from 'vue';
import { useProjectsStore } from '../../stores/projectStore';
import { validateProject } from '../../helpers/validation';

const projectsStore = useProjectsStore();
const validationErrors = ref([]);
const projectData = ref({ 
    name: '', 
    description: '', 
    priority: 'medium' 
});

const handleSubmit = () => {
    validationErrors.value = validateProject(projectData.value);
    
    if (validationErrors.value.length === 0) {
        try {
            projectsStore.addProject(projectData.value);
            
            projectsStore.closeAddProjectModal();
            projectData.value = { 
                name: '', 
                description: '', 
                priority: 'medium' 
            };
        } catch (e) {
            validationErrors.value.push(e.message);
        }
    }
};
</script>

<template>
<div v-if="projectsStore.isAddProjectModalOpen" id="addProjectModal" class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div class="modal-content p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-light mb-6">Criar Novo Projeto</h3>
        <form @submit.prevent="handleSubmit" id="addProjectForm" class="space-y-4">
            <div>
                <label class="block text-sm text-slate-400 mb-2">Nome do Projeto</label>
                <input type="text" v-model="projectData.name" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Descrição</label>
                <textarea v-model="projectData.description" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" rows="3"></textarea>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Prioridade</label>
                <select v-model="projectData.priority" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                </select>
            </div>

            <div v-if="validationErrors.length" class="text-red-400 text-sm space-y-1 p-3 bg-red-900/20 rounded-lg border border-red-800/50">
                <p v-for="error in validationErrors" :key="error">{{ error }}</p>
            </div>

            <div class="flex space-x-4 pt-4">
                <button type="submit" class="btn-primary flex-1">Criar Projeto</button>
                <button type="button" class="btn-secondary flex-1" @click="projectsStore.closeAddProjectModal()">Cancelar</button>
            </div>
        </form>
    </div>
</div>
</template>