<template>
 <header class="bg-gray-800 shadow-xl border-b border-gray-700 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div>
            <img class="w-20 h-15" src="../assets/logo.png" alt="">
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Websupply</h1>
            <p class="text-sm text-gray-400">Dashboard de Equipe</p>
          </div>
        </div>
        <nav class="flex space-x-2">
          <button class="px-6 py-3 rounded-xl font-medium transition-all duration-300">
            Dashboard
          </button>
          <button class="px-6 py-3 rounded-xl font-medium transition-all duration-300">
            Equipe
          </button>
          <button class="px-6 py-3 rounded-xl font-medium transition-all duration-300">
            Status
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};

</script>

<style scoped>

header {
  color: #fff;
}

.nav-btn {
  background-color: transparent;
  color: #9ca3af;
}

</style>
