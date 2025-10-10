<template>
  <div class="p-6 md:p-10">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-light">Gerenciamento de Tarefas</h2>
      <PrimaryButton @click="openCreateTaskModal">
        <i class="fas fa-plus mr-2"></i>Nova Tarefa
      </PrimaryButton>
    </div>

    <div class="flex space-x-4 mb-6">
      <select 
        :value="tasksStore.filters.status"
        @change="tasksStore.updateFilter('status', $event.target.value)"
      >
        <option value="all">Todos os Status</option>
        <option value="pending">Pendentes</option>
        <option value="in_progress">Em Progresso</option>
        <option value="completed">Concluídas</option>
      </select>

      <select 
        :value="tasksStore.filters.priority"
        @change="tasksStore.updateFilter('priority', $event.target.value)"
      >
        <option value="all">Todas as Prioridades</option>
        <option value="high">Alta</option>
        <option value="medium">Média</option>
        <option value="low">Baixa</option>
      </select>
      
      <select 
        :value="tasksStore.filters.assignee"
        @change="tasksStore.updateFilter('assignee', $event.target.value)"
      >
        <option value="all">Todos os Membros</option>
        <option 
          v-for="member in tasksStore.memberOptions" 
          :key="member.id" 
          :value="member.id"
        >
          {{ member.name }}
        </option>
      </select>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" id="tasksGrid">
      <div v-if="tasksStore.isLoading" class="text-slate-400 col-span-full">
        <i class="fas fa-spinner fa-spin mr-2"></i> Carregando tarefas...
      </div>
      
      <div v-else-if="tasksStore.filteredTasks.length === 0" class="text-slate-400 col-span-full">
        Nenhuma tarefa encontrada. Ajuste seus filtros.
      </div>
      
      <div v-else class="col-span-full">
        <p class="text-white">Total de tarefas filtradas: {{ tasksStore.filteredTasks.length }}</p>
      </div>
    </div>
  </div>
  
  <CreateTaskModal />
</template>

<script setup>
import { onMounted } from 'vue';
import { useTasksStore } from '../stores/tasksStore'; 
import PrimaryButton from '../components/base/PrimaryButton.vue';
import CreateTaskModal from '../components/modals/CreateTaskModal.vue';

const tasksStore = useTasksStore();

// Conecta a função ao action do Pinia
const openCreateTaskModal = () => {
  tasksStore.openCreateTaskModal();
};

onMounted(() => {
  // Garante que os dados sejam carregados ao entrar na view
  tasksStore.loadTasks();
});
</script>