<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <!-- O Header será exibido em todas as páginas -->
  <Header />

  <!-- O router-view renderiza o componente correspondente à rota atual -->
  <router-view />
</template>

<style scoped>

</style>