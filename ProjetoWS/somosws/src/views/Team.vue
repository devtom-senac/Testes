<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <!-- Add Employee Form -->
    <div class="glass-effect rounded-2xl p-6 mb-8">
      <h2 class="text-xl font-semibold text-white mb-6">Adicionar Funcionário</h2>
      <form id="employee-form" class="flex flex-col lg:flex-row gap-6">
        <div class="flex flex-col items-center lg:w-1/5">
          <div class="relative">
            <div id="image-preview" class="w-24 h-24 bg-gray-700 rounded-2xl flex items-center justify-center border-2 border-gray-600 overflow-hidden hover:border-blue-500 transition-colors">
              <span class="text-gray-400 text-2xl">📷</span>
            </div>
            <input type="file" id="image-input" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
          </div>
          <p class="text-xs text-gray-400 mt-2 text-center">Foto do perfil</p>
        </div>
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nome Completo</label>
            <input type="text" id="name-input" required class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400">
          </div>
          <!-- Outros campos... -->
        </div>
      </form>
    </div>

    <!-- Team Grid -->
    <div class="rounded-2xl p-6">
      <h2 class="text-xl font-semibold text-black">Equipe Websupply</h2>
      <div id="team-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Membros da equipe serão renderizados aqui -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Team',
};
</script>

<style scoped>
/* Estilos específicos para a página da equipe */
</style>