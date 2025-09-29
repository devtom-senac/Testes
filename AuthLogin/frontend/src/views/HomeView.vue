<template>
    <div class="min-h-screen bg-gray-800 text-white p-8">
        <h1 class="text-3xl font-bold mb-6">Página Inicial (Home)</h1>
        
        <div v-if="usuarioLogado" class="bg-gray-700 p-6 rounded-lg shadow-xl max-w-lg">
            <h2 class="text-xl font-semibold mb-3">Bem-vindo, {{ usuarioLogado.name }}!</h2>
            <p>Você acessou o sistema com sucesso. Aqui será o painel principal de status.</p>
            <button 
                @click="handleLogout" 
                class="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                Sair
            </button>
        </div>
        <div v-else>
            <p>Carregando dados da sessão...</p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { usuarioLogado, logoutUsuario } from '../modeState.js';

const router = useRouter();

const handleLogout = () => {
    logoutUsuario();
    router.push({ name: 'login' });
};
</script>
