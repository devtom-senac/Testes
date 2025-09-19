<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <div class="glass-effect rounded-2xl p-6 mb-8">
      <h2 class="text-2xl font-semibold text-white mb-2">Defina sua Plaquinha de Status</h2>
      <p class="text-gray-400 mb-6">Escolha uma plaquinha divertida para mostrar como você está hoje!</p>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div v-for="status in availableStatus" :key="status.id" 
             class="status-card glass-effect rounded-2xl p-4 text-center cursor-pointer transition-all duration-300"
             :class="{ 'selected border-blue-500': selectedStatusId === status.id }"
             @click="selectStatus(status.id)">
          <div class="text-4xl mb-2">{{ status.emoji }}</div>
          <div class="text-sm font-medium text-white">{{ status.description }}</div>
          <div class="text-xs text-gray-400">{{ status.tooltip }}</div>
        </div>
      </div>
      
      <div class="flex gap-4">
        <input type="text" v-model="customStatusText" placeholder="Ou escreva seu próprio status..." 
               class="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400">
        <button @click="updateStatus" 
                class="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
          🏷️ Atualizar Status
        </button>
      </div>
    </div>
    
    <div class="glass-effect rounded-2xl p-6">
      <h2 class="text-xl font-semibold text-white mb-6">Quadro de Status da Equipe</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="employee in employees" :key="employee.employeeId"
             class="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
                <img v-if="employee.image" :src="employee.image" alt="Ícone do funcionário" class="w-full h-full object-cover">
                <span v-else class="text-gray-400 text-xl">👤</span>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-white">{{ employee.name }}</h3>
              <p class="text-gray-400 text-sm">{{ employee.position }}</p>
            </div>
            <div class="text-right">
              <div class="flex items-center space-x-2 mb-1">
                <span class="text-2xl">{{ getStatusInfo(employee.status).emoji }}</span>
                <span class="text-white font-medium">{{ getStatusInfo(employee.status).text }}</span>
              </div>
              <p v-if="employee.status && employee.status.customText" class="text-gray-400 text-xs">"{{ employee.status.customText }}"</p>
              <p class="text-gray-500 text-xs mt-2">{{ getStatusInfo(employee.status).time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { teamService } from '../services/teamService';

const employees = ref([]);
const selectedStatusId = ref(null);
const customStatusText = ref('');

const availableStatus = [
  { id: 1, emoji: '💻', description: 'Codando', tooltip: 'No flow total' },
  { id: 2, emoji: '☕', description: 'Café Break', tooltip: 'Recarregando energia' },
  { id: 3, emoji: '🎯', description: 'Em Reunião', tooltip: 'Alinhando ideias' },
  { id: 4, emoji: '🐛', description: 'Caçando Bugs', tooltip: 'Modo detetive' },
  { id: 5, emoji: '📚', description: 'Estudando', tooltip: 'Sempre evoluindo' },
  { id: 6, emoji: '🎨', description: 'Modo Criativo', tooltip: 'Ideias fluindo' },
  { id: 7, emoji: '🎧', description: 'Foco Total', tooltip: 'Não perturbe' },
  { id: 8, emoji: '🚀', description: 'Produtivo', tooltip: 'Decolando hoje' },
];

const fetchEmployees = async () => {
  try {
    employees.value = await teamService.getEmployees();
  } catch (error) {
    console.error('Falha ao buscar funcionários:', error);
  }
};

const selectStatus = (statusId) => {
  selectedStatusId.value = statusId;
  customStatusText.value = '';
};

const updateStatus = async () => {
  const selectedEmployeeId = 1; // Substitua isso pela lógica de seleção de funcionário
  const selectedEmployee = employees.value.find(emp => emp.employeeId === selectedEmployeeId);
  
  if (!selectedEmployee) {
    alert('Nenhum funcionário selecionado. Este é um exemplo, a lógica de seleção real precisa ser implementada.');
    return;
  }

  let statusTypeId = selectedStatusId.value;
  let customText = '';

  if (customStatusText.value) {
    // ID de um status genérico para textos customizados
    statusTypeId = 99; // Um ID que você pode usar para status customizado
    customText = customStatusText.value;
  }

  if (!statusTypeId) {
    alert('Por favor, selecione um status ou escreva um personalizado.');
    return;
  }
  
  try {
    const updatedStatus = await teamService.updateEmployeeStatus(selectedEmployeeId, statusTypeId, customText);
    selectedEmployee.status = updatedStatus;
    alert('Status atualizado com sucesso!');
    selectedStatusId.value = null;
    customStatusText.value = '';
  } catch (error) {
    console.error('Falha ao atualizar status:', error);
    alert('Erro ao atualizar status.');
  }
};

const getStatusInfo = (status) => {
  if (!status || !status.statusType) {
    return { emoji: '😴', text: 'Sem status', time: 'Nunca' };
  }
  
  const foundStatus = availableStatus.find(s => s.id === status.statusTypeId);
  
  if (foundStatus) {
    return {
      emoji: foundStatus.emoji,
      text: foundStatus.description,
      time: getTimeAgo(status.updatedAt)
    };
  } else if (status.customText) {
    return {
      emoji: '🏷️',
      text: status.customText,
      time: getTimeAgo(status.updatedAt)
    };
  }
  
  return { emoji: '❓', text: 'Status desconhecido', time: 'Nunca' };
};

const getTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'Agora mesmo';
  if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
  return `${Math.floor(diffInMinutes / 1440)}d atrás`;
};

onMounted(() => {
  fetchEmployees();
});
</script>

<style scoped>
.status-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
.status-card.selected {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  border: 1px solid #3b82f6;
}
</style>