<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">Status da Equipe</h2>
      <div class="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div v-for="employee in employees" :key="employee.employeeId"
             class="flex-shrink-0 relative cursor-pointer"
             @click="openStatusModal(employee)">
          <div class="p-1 rounded-full gradient-border">
            <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-900 transition-all duration-300 transform hover:scale-110">
              <img v-if="employee.image" :src="employee.image" :alt="employee.name" class="w-full h-full object-cover" />
              <span v-else class="text-gray-400 text-3xl">👤</span>
            </div>
          </div>
          <div class="absolute bottom-0 right-0 p-1 bg-gray-800 rounded-full border-2 border-gray-900 shadow-lg">
            <span class="text-xl leading-none">{{ getStatusInfo(employee.status).emoji }}</span>
          </div>
          <p class="mt-2 text-center text-xs text-gray-400">{{ employee.name.split(' ')[0] }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400">Total de Funcionários</p>
            <p class="text-3xl font-bold text-white">{{ employees.length }}</p>
          </div>
          <div class="bg-blue-500/20 p-4 rounded-2xl">
            <span class="text-blue-400 text-2xl">👥</span>
          </div>
        </div>
      </div>
      
      <div class="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400">Status Ativos</p>
            <p class="text-3xl font-bold text-white">{{ activeStatuses }}</p>
          </div>
          <div class="bg-green-500/20 p-4 rounded-2xl">
            <span class="text-green-400 text-2xl">🏷️</span>
          </div>
        </div>
      </div>
      
      <div class="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400">Energia da Equipe</p>
            <p class="text-3xl font-bold text-white">🔥 Alta</p>
          </div>
          <div class="bg-orange-500/20 p-4 rounded-2xl">
            <span class="text-orange-400 text-2xl">⚡</span>
          </div>
        </div>
      </div>
      
      <div class="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-400">Vibe Geral</p>
            <p class="text-3xl font-bold text-white">😎 Top</p>
          </div>
          <div class="bg-purple-500/20 p-4 rounded-2xl">
            <span class="text-purple-400 text-2xl">🎯</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="glass-effect rounded-2xl p-6">
      <h3 class="text-lg font-semibold text-white mb-4">Atividade Recente</h3>
      <div class="space-y-4">
        <div v-for="(activity, index) in recentActivities" :key="index"
             class="flex items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <span class="text-2xl mr-4">{{ activity.icon }}</span>
          <div class="flex-1">
            <p class="text-sm text-white">{{ activity.text }}</p>
            <p class="text-xs text-gray-400">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { teamService } from '../services/teamService';

const employees = ref([]);
const recentActivities = ref([]);

const availableStatus = [
  { id: 1, emoji: '💻', description: 'Codando' },
  { id: 2, emoji: '☕', description: 'Café Break' },
  { id: 3, emoji: '🎯', description: 'Em Reunião' },
  { id: 4, emoji: '🐛', description: 'Caçando Bugs' },
  { id: 5, emoji: '📚', description: 'Estudando' },
  { id: 6, emoji: '🎨', description: 'Modo Criativo' },
  { id: 7, emoji: '🎧', description: 'Foco Total' },
  { id: 8, emoji: '🚀', description: 'Produtivo' },
];

const activeStatuses = computed(() => {
  return employees.value.filter(emp => emp.status && emp.status.statusType).length;
});

const fetchDashboardData = async () => {
  try {
    employees.value = await teamService.getEmployees();
    
    recentActivities.value = [
      { icon: '🏷️', text: 'Heverton atualizou status para "Codando"', time: '2 min atrás' },
      { icon: '👥', text: 'Taylor Swift foi adicionada à equipe', time: '1 hora atrás' },
      { icon: '☕', text: 'Aline mudou status para "Café Break"', time: '2 horas atrás' },
      { icon: '🎧', text: 'Regis ativou modo "Foco Total"', time: '3 horas atrás' }
    ];
  } catch (error) {
    console.error('Falha ao buscar dados do dashboard:', error);
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

const openStatusModal = (employee) => {
  // A lógica do modal será implementada na próxima etapa para manter o código limpo
  alert(`Abrindo status de: ${employee.name}`);
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<style scoped>
.gradient-border {
  background: linear-gradient(45deg, #FFD700, #FF8C00, #FF1493, #8A2BE2);
  padding: 3px;
  border-radius: 9999px;
  transition: all 0.3s ease;
}
.gradient-border:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
}

.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 20px;
  border: 3px solid transparent;
}
</style>