<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <!-- Seleção de Status -->
    <div class="glass-effect rounded-2xl p-6 mb-8">
      <h2 class="text-2xl font-semibold text-white mb-2">Defina o Status</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          v-for="status in statuses"
          :key="status"
          @click="selectStatus(status)"
          class="status-card"
        >
          {{ status }}
        </button>
      </div>
    </div>

    <!-- Status Atual -->
    <div class="glass-effect rounded-2xl p-6">
      <h2 class="text-xl font-semibold text-white mb-6">Status Atual</h2>
      <p class="text-gray-300">{{ currentStatus }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Status',
  data() {
    return {
      statuses: ['Codando', 'Em Reunião', 'Café', 'Foco Total'],
      currentStatus: 'Nenhum',
    };
  },
  methods: {
    selectStatus(status) {
      this.currentStatus = status;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para a página de status */
</style>