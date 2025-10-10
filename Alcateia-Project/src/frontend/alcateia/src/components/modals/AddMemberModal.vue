<script setup>
import { ref } from 'vue';
import { useTeamStore } from '../../stores/teamStore';
import { validateMember } from '../../helpers/validation';

const teamStore = useTeamStore();
const memberData = ref({ name: '', role: '' });
const validationErrors = ref([]);

const availableRoles = [
    'Tech Lead', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'DevOps Engineer', 'UX/UI Designer', 'QA Engineer', 'Product Manager'
];

const handleSubmit = () => {
    validationErrors.value = validateMember(memberData.value);
    
    if (validationErrors.value.length === 0) {
        try {
            teamStore.addMember(memberData.value);
            teamStore.closeAddMemberModal();
            memberData.value = { name: '', role: '' };
        } catch (e) {
            validationErrors.value.push(e.message);
        }
    }
};
</script>

<template>
<div v-if="teamStore.isAddMemberModalOpen" id="addMemberModal" class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div class="modal-content p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-light mb-6">Adicionar Novo Membro</h3>
        <form @submit.prevent="handleSubmit" id="addMemberForm" class="space-y-4">
            <div>
                <label class="block text-sm text-slate-400 mb-2">Nome</label>
                <input type="text" v-model="memberData.name" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-2">Cargo</label>
                <select v-model="memberData.role" class="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white" required>
                    <option value="">Selecione um cargo</option>
                    <option v-for="role in availableRoles" :key="role" :value="role">{{ role }}</option>
                </select>
            </div>
            
            <div v-if="validationErrors.length" class="text-red-400 text-sm space-y-1 p-3 bg-red-900/20 rounded-lg border border-red-800/50">
                <p v-for="error in validationErrors" :key="error">{{ error }}</p>
            </div>

            <div class="flex space-x-4 pt-4">
                <button type="submit" class="btn-primary flex-1">Adicionar</button>
                <button type="button" class="btn-secondary flex-1" @click="teamStore.closeAddMemberModal()">Cancelar</button>
            </div>
        </form>
    </div>
</div>
</template>