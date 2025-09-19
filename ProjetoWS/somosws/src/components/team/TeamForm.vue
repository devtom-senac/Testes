<template>
  <div class="glass-effect rounded-2xl p-8 max-w-7xl mx-auto fade-in">
    <div class="flex flex-col md:flex-row gap-10">
      
      <div class="flex-1">
        <h2 class="text-xl font-semibold text-white mb-6">
          {{ isEditing ? 'Editar Funcionário' : 'Adicionar Novo Funcionário' }}
        </h2>
        <form @submit.prevent="submitForm">
          <div class="space-y-5">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-400">Nome Completo</label>
              <input type="text" id="name" v-model="formData.name" required
                     class="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-white focus:ring-blue-500 focus:border-blue-500 p-3">
            </div>
            <div>
              <label for="position" class="block text-sm font-medium text-gray-400">Cargo</label>
              <input type="text" id="position" v-model="formData.position" required
                     class="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-white focus:ring-blue-500 focus:border-blue-500 p-3">
            </div>
            <div>
              <label for="photo" class="block text-sm font-medium text-gray-400">URL da Foto</label>
              <input type="url" id="photo" v-model="formData.photo"
                     class="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-white focus:ring-blue-500 focus:border-blue-500 p-3">
            </div>
          </div>
          
          <button type="submit"
                  class="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            {{ isEditing ? 'Atualizar Funcionário' : 'Adicionar Funcionário' }}
          </button>
        </form>
        <button v-if="isEditing" @click="$emit('cancel-edit')"
                class="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
          Cancelar
        </button>
      </div>
      
      <div class="flex-1 flex justify-center items-center p-4">
        <div class="p-4 rounded-lg bg-gray-900/50 w-full max-w-md">
          <h3 class="text-white font-semibold text-lg mb-4">Pré-visualização</h3>
          <TeamCard :employee="formData" />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import TeamCard from './TeamCard.vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(['submit', 'cancel-edit']);

const defaultEmployeeData = {
  name: 'Novo Funcionário',
  position: 'Cargo',
  photo: 'https://tarefas.websupply.com.br/painel/assets/userDefault-uMDAqLiz.png',
  isActive: true,
  status: {
    customText: null,
    updateAt: new Date().toISOString(),
    statusType: {
      iconUrl: 'https://websupply.com.br/assets/placeholder-status.png',
      description: 'Sem status definido'
    }
  }
};

const formData = ref({ ...defaultEmployeeData });
const isEditing = ref(false);

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData };
    isEditing.value = true;
  } else {
    formData.value = { ...defaultEmployeeData };
    isEditing.value = false;
  }
}, { immediate: true });

const submitForm = () => {
  emits('submit', formData.value);
};
</script>