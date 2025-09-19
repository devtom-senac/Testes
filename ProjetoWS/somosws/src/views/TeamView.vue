<template>
  <div class="p-8 bg-gray-900 min-h-screen text-gray-100">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Equipe</h1>
      <div class="flex items-center space-x-4">
        <span class="text-sm font-medium text-gray-400">Modo:</span>
        <button
          @click="toggleMode"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            isMockMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          ]"
        >
          {{ isMockMode ? 'Testando (Mocks)' : 'Produção (API)' }}
        </button>
      </div>
    </div>
    
    <TeamForm
      :initial-data="editingEmployee"
      @submit="handleFormSubmit"
      @cancel-edit="clearEditingEmployee"
      class="mb-8"
    />

    <div v-if="loading" class="text-center">Carregando...</div>
    <div v-else-if="employees.length === 0" class="text-center">Nenhum funcionário encontrado.</div>
    <div v-else class="glass-effect rounded-2xl p-6 max-w-7xl mx-auto">
      <h2 class="text-xl font-semibold text-white mb-6">Funcionários Ativos</h2>
      <div class="flex flex-wrap justify-center gap-6">
        <TeamCard
          v-for="employee in employees"
          :key="employee.employeeId"
          :employee="employee"
          @edit-employee="handleEditEmployee"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { teamService } from '../services/teamService.js';
import TeamCard from '../components/team/TeamCard.vue';
import TeamForm from '../components/team/TeamForm.vue';

const employees = ref([]);
const loading = ref(true);
const editingEmployee = ref(null);
const isMockMode = ref(false);

async function fetchEmployees() {
    loading.value = true;
    try {
        const data = await teamService.getEmployees();
        employees.value = data;
    } catch (error) {
        console.error('Falha ao buscar funcionários:', error);
    } finally {
        loading.value = false;
    }
}

const toggleMode = () => {
  isMockMode.value = !isMockMode.value;
  teamService.setMode(isMockMode.value ? 'mock' : 'api');
  fetchEmployees(); // Re-fetch os dados com a nova configuração
};

function handleEditEmployee(employeeId) {
    editingEmployee.value = employees.value.find(e => e.employeeId === employeeId);
}

function clearEditingEmployee() {
    editingEmployee.value = null;
}

async function handleFormSubmit(employeeData) {
    try {
        if (editingEmployee.value) {
            await teamService.updateEmployee(employeeData);
            const index = employees.value.findIndex(e => e.employeeId === employeeData.employeeId);
            if (index !== -1) {
                employees.value[index] = employeeData;
            }
            clearEditingEmployee();
            alert('Funcionário atualizado com sucesso!');
        } else {
            const newEmployee = await teamService.addEmployee(employeeData);
            employees.value.push(newEmployee);
            alert('Funcionário adicionado com sucesso!');
        }
    } catch (error) {
        console.error('Falha na operação:', error);
    }
}

onMounted(() => {
    // Configura o modo inicial
    teamService.setMode(isMockMode.value ? 'mock' : 'api');
    fetchEmployees();
});
</script>