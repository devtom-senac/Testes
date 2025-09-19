<template>
  <div class="glass-effect rounded-2xl p-8 flex flex-col hover:bg-white/10 transition-all duration-300 fade-in group">
    
    <div class="flex items-center space-x-6 mb-4">
      <div class="flex-shrink-0">
        <div class="w-20 h-20 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden border-2 border-gray-600 group-hover:border-blue-500 transition-colors">
          <img v-if="employee.photo" :src="employee.photo" :alt="employee.name" class="w-full h-full object-cover">
          <svg v-else class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>
      </div>
      
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2 mb-1">
          <h3 class="font-bold text-white text-xl leading-tight">
            {{ employee.name }}
          </h3>
          <span v-if="employee.isActive" class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-900 text-green-300">
            Ativo
          </span>
        </div>
        <p class="text-blue-400 text-sm font-medium leading-tight">
          {{ employee.position }}
        </p>
      </div>
    </div>
    
    <div class="bg-gray-800/50 rounded-lg px-4 py-3 mb-6 w-full">
      <div class="flex items-center space-x-2">
        <img v-if="employee.status?.statusType?.iconUrl" :src="employee.status.statusType.iconUrl" class="w-6 h-6 rounded-full" :alt="employee.status.statusType.description"/>
        <p class="text-sm font-medium text-white">
          {{ employee.status?.statusType?.description || 'Sem status' }}
        </p>
      </div>
      <p v-if="employee.status?.customText" class="text-xs text-gray-400 mt-2">
        {{ employee.status.customText }}
      </p>
      <p class="text-xs text-gray-500 mt-2">
        Última atualização: {{ statusInfo.time }}
      </p>
    </div>
    
    <div class="w-full mt-auto">
      <button @click="$emit('edit-employee', employee.employeeId)"
              class="w-full bg-gray-700/50 hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-all duration-300 p-3 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        <span class="font-medium">Editar</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  employee: {
    type: Object,
    required: true,
  },
});

const statusInfo = computed(() => {
  const updatedAt = props.employee.status?.updateAt;
  const timeAgo = updatedAt ? getTimeAgo(updatedAt) : 'Nunca';

  return {
    time: timeAgo,
  };
});

const getTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'Agora mesmo';
  if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
  return `${Math.floor(diffInMinutes / 1440)}d atrás`;
};
</script>