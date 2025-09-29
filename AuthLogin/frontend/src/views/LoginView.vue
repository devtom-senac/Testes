<template>
  <div class="px-8 py-20 bg-gray-900 min-h-screen text-gray-100 flex flex-col justify-center items-center relative">
    
    <div class="absolute top-4 right-4">
        <button 
            @click="handleToggleMock"
            :class="[isMockMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700']"
            class="text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 shadow-lg"
        >
            Modo: {{ isMockMode ? 'Desenvolvimento (Mock)' : 'Produção (API)' }}
        </button>
    </div>

    <div v-if="!selectedEmployee" class="glass-effect rounded-2xl p-6 text-center min-w-4xl max-w-7xl">
        <div class="p-2 flex items-center justify-center">
            <img src="https://cdn-icons-gif.flaticon.com/16904/16904032.gif" alt="" class="w-18 h-18 rounded-full">
        </div>
        <h2 class="text-2xl text-white mb-4">Selecione seu perfil</h2>
        <hr class="mb-10 text-gray-500">
        
        <div v-if="loading" class="text-center">Carregando perfis...</div>
        <div v-else class="flex flex-wrap justify-center gap-8">
            <div v-for="employee in employees" :key="employee.employeeId" @click="selectEmployee(employee)"
            class="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 duration-300 hover:text-red-500 saturate-0 hover:saturate-100">
            <div
                class="w-28 h-28 rounded-full overflow-hidden border-2 border-transparent hover:border-red-500 transition-colors duration-300 ">
                <img :src="employee.photo" :alt="employee.name" class="w-full h-full object-cover ">
            </div>
            <p class="mt-4 text-base font-medium truncate w-28">{{ employee.name }}</p>
            </div>
        </div>
    </div>

    <div v-else class="glass-effect rounded-2xl p-10 text-center max-w-md w-full">
        <div class="p-2 flex items-center justify-center mb-4">
            <div class="w-28 h-28 rounded-full overflow-hidden border-4 border-red-500">
            <img :src="selectedEmployee.photo" :alt="selectedEmployee.name" class="w-full h-full object-cover">
            </div>
        </div>

        <h2 class="text-2xl text-white mb-2">Entrar como {{ selectedEmployee.name }}</h2>
        <p v-if="selectedEmployee.position" class="text-sm text-gray-400 mb-6">{{ selectedEmployee.position }}</p>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
            <div class="relative">
                <input 
                    v-model="password"
                    :type="passwordVisible ? 'text' : 'password'" 
                    placeholder="Digite sua senha de acesso"
                    required
                    :disabled="loadingLogin"
                    class="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-red-500 pr-12 transition duration-300"
                >
                <button type="button" @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                    <span v-if="passwordVisible" class="text-xl">👁️</span>
                    <span v-else class="text-xl">🔒</span>
                </button>
            </div>

            <button 
            type="submit" 
            :disabled="loadingLogin"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
            >
            {{ loadingLogin ? 'Verificando...' : 'Entrar' }}
            </button>
        </form>

        <button 
            @click="resetSelection" 
            class="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-3 rounded-lg transition duration-300"
        >
            Voltar para a seleção de perfis
        </button>

        <p v-if="message" :class="{'text-red-500': isError, 'text-green-500': !isError}" class="mt-4 text-sm font-medium">
            {{ message }}
        </p>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { getEmployees, authenticateLogin } from '../services/employeeApi'; 
import { isMockMode, setUsuarioLogado, toggleMockMode } from '../modeState.js';

const passwordVisible = ref(false);

const router = useRouter();
const employees = ref([]);
const loading = ref(true);

const selectedEmployee = ref(null);
const password = ref('');
const loadingLogin = ref(false);
const message = ref('');
const isError = ref(false);

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};

const selectEmployee = (employee) => {
  selectedEmployee.value = employee;
  message.value = ''; 
  isError.value = false;
  password.value = ''; 
};

const handleLogin = async () => {
    loadingLogin.value = true;
    message.value = '';
    isError.value = false;

    try {
        const data = await authenticateLogin(selectedEmployee.value.employeeId, password.value); 
        
        if (data) {
            setUsuarioLogado(selectedEmployee.value.employeeId, selectedEmployee.value); 
            message.value = 'Login bem-sucedido!';
            router.push({ name: 'home' }); 
        }
    } catch (error) {
        const errorMessage = error.message || 'Erro de autenticação.'; 
        
        if (errorMessage.includes('Senha incorreta')) {
            message.value = 'Senha incorreta ou perfil inválido.';
        } else if (errorMessage.includes('Network Error') && !isMockMode.value) {
             message.value = 'Falha na conexão com a API de Produção. Verifique o servidor.';
        } else {
             message.value = errorMessage;
        }

        isError.value = true;
        password.value = ''; 
    } finally {
        loadingLogin.value = false;
    }
};

const resetSelection = () => {
  selectedEmployee.value = null;
  password.value = '';
  message.value = '';
};

const handleToggleMock = () => {
    toggleMockMode();
    resetSelection();
    fetchEmployees();
};

async function fetchEmployees() {
  if (isMockMode.value) {
    loading.value = true;
    message.value = 'Carregando perfis no modo MOCK...';
    isError.value = false;
  }
  
  loading.value = true;
  try {
    const data = await getEmployees(); 
    employees.value = data;
    message.value = isMockMode.value ? 'Perfis mockados carregados.' : '';
  } catch (error) {
    console.error('Falha ao buscar funcionários:', error);
    message.value = isMockMode.value 
        ? 'Erro ao carregar lista mockada.' 
        : 'Falha na conexão com a API de Produção.';
    isError.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchEmployees();
});

watch(isMockMode, () => {
  fetchEmployees();
});
</script>

<style scoped>
.glass-effect {
  backdrop-filter: blur(10px);
  background-color: rgba(31, 41, 55, 0.7); 
  border: 1px solid rgba(156, 163, 175, 0.2); 
}
</style>
