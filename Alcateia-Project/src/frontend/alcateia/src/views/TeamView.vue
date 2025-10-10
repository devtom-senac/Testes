<script setup>
import { useTeamStore } from '../stores/teamStore';
import { useAuthStore } from '../stores/authStore';

const teamStore = useTeamStore();
const authStore = useAuthStore();
</script>

<template>
<div id="view-team" class="view-content">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-light">Gerenciamento da Equipe</h2>
        <button v-if="authStore.hasPermission('manage_members')" class="btn-primary" @click="teamStore.openAddMemberModal">
            <i class="fas fa-plus mr-2"></i>Adicionar Membro
        </button>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" id="teamGrid">
        <div v-for="member in teamStore.membersWithStats" :key="member.id" class="card p-6">
            <div class="flex justify-between items-start">
                <div>
                    <i :class="[member.icon, 'text-blue-400 text-xl mb-2']"></i>
                    <p class="text-lg font-semibold">{{ member.name }}</p>
                    <p class="text-sm text-slate-400">{{ member.role }}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs text-slate-400 mb-1">Produtividade</p>
                    <div class="text-xl font-bold" :class="member.taskStats.total > 0 ? 'text-green-400' : 'text-slate-500'">
                        {{ member.taskStats.total > 0 ? Math.round((member.taskStats.completed / member.taskStats.total) * 100) : 0 }}%
                    </div>
                </div>
            </div>
            
            <div class="mt-4 border-t border-slate-700 pt-4 flex justify-between text-sm">
                <span>Tarefas Ativas:</span>
                <span>{{ member.taskStats.pending + member.taskStats.inProgress }}</span>
            </div>
            <button class="btn-secondary mt-4 w-full" @click="teamStore.openMoodCheckin(member.id)">Check-in Humor</button>
        </div>
    </div>
</div>
</template>