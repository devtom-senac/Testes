<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="glass-effect rounded-2xl p-6">
        <p class="text-sm font-medium text-gray-400">Total de Funcionários</p>
        <p class="text-3xl font-bold text-white">{{ totalEmployees }}</p>
      </div>
      <div class="glass-effect rounded-2xl p-6">
        <p class="text-sm font-medium text-gray-400">Status Ativos</p>
        <p class="text-3xl font-bold text-white">{{ activeStatuses }}</p>
      </div>
    </div>

    <!-- Atividade Recente -->
    <div class="glass-effect rounded-2xl p-6">
      <h3 class="text-lg font-semibold text-white mb-4">Atividade Recente</h3>
      <ul>
        <li v-for="activity in recentActivities" :key="activity.id" class="text-gray-300">
          {{ activity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      totalEmployees: 4,
      activeStatuses: 3,
      recentActivities: ['Funcionário A atualizou o status.', 'Funcionário B foi adicionado.'],
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para o Dashboard */
</style>