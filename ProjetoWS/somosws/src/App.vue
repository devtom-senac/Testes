<template>
  <div class="bg-gray-900 min-h-screen text-white">
    <header class="p-4 bg-gray-800 shadow-xl border-b border-gray-700 text-center">
      <RouterLink to="/" class="p-2 rounded" :class="{ 'bg-blue-600': $route.path === '/' }">
        Home
      </RouterLink>
      <RouterLink to="/team" class="p-2 rounded" :class="{ 'bg-blue-600': $route.path === '/equipe' }">
        Equipe
      </RouterLink>
      <RouterLink to="/status" class="p-2 rounded" :class="{ 'bg-blue-600': $route.path === '/status' }">
        Status
      </RouterLink>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { teamService } from './services/teamService';
import { ref, onMounted } from 'vue';

const route = useRoute();
const currentRoute = ref(route.path);

onMounted(() => {
  // Inicializa o modo de mocks ao carregar o app
  teamService.setMode('mock');
});
</script>

<style>
/* Seus estilos globais aqui */
</style>