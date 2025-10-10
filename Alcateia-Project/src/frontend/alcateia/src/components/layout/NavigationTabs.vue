<template>
  <div class="flex space-x-2 mb-6 border-b border-gray-700/50 pb-1 overflow-x-auto">
    <router-link
      v-for="tab in tabs"
      :key="tab.route"
      :to="tab.route"
      class="tab-link"
      active-class="tab-active"
      inactive-class="tab-inactive"
    >
      {{ tab.label }}
    </router-link>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const tabs = reactive([
  { label: 'Dashboard', route: '/dashboard' },
  { label: 'Tarefas', route: '/tasks' },
  { label: 'Equipe', route: '/team' },
  { label: 'Projetos', route: '/projects' },
  { label: 'Analytics', route: '/analytics' },
]);
</script>

<style scoped>
/*
  As classes 'tab-link', 'tab-active' e 'tab-inactive'
  DEVEM ser definidas no seu 'src/style.css' global.
  
  Exemplo de como elas seriam definidas para manter o estilo do guia:
  .tab-link {
    @apply px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ease-in-out;
  }
  .tab-inactive {
    @apply text-gray-400 hover:text-white hover:bg-gray-800;
  }
  .tab-active {
    @apply bg-blue-600/30 text-blue-400 font-bold border-b-2 border-blue-400/80;
  }
*/
</style>