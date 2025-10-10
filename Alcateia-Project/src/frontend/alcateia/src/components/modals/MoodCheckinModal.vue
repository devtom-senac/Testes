<script setup>
import { ref, computed } from 'vue';
import { useTeamStore } from '../../stores/teamStore';
import { getMoodEmoji, getMoodText } from '../../helpers/ui';

const teamStore = useTeamStore();
const selectedMood = ref(null);

const moodOptions = [
    'excellent', 'energetic', 'good', 'neutral', 'low', 'stressed'
];

const confirmMoodCheckin = () => {
    if (selectedMood.value && teamStore.currentMemberIdForMood) {
        teamStore.addMoodCheckin(teamStore.currentMemberIdForMood, selectedMood.value);
        teamStore.closeMoodCheckinModal();
        selectedMood.value = null;
    }
};

const handleCancel = () => {
    teamStore.closeMoodCheckinModal();
    selectedMood.value = null;
};
</script>

<template>
<div v-if="teamStore.isMoodCheckinModalOpen" id="moodCheckinModal" class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div class="modal-content p-8 max-w-md w-full mx-4">
        <h3 class="text-xl font-light mb-6">Check-in de Humor</h3>
        <p class="text-slate-400 mb-6">Como você está se sentindo hoje?</p>
        <div class="grid grid-cols-3 gap-4 mb-6" id="moodOptions">
            <div 
                v-for="mood in moodOptions"
                :key="mood"
                :data-mood="mood"
                :title="getMoodText(mood)"
                :class="[
                    'mood-emoji text-center p-3 rounded-xl cursor-pointer transition-all border-2',
                    selectedMood === mood 
                        ? 'border-blue-500 bg-blue-900/50 scale-105' 
                        : 'border-transparent hover:bg-slate-800/50'
                ]"
                @click="selectedMood = mood"
            >
                <span class="text-4xl">{{ getMoodEmoji(mood) }}</span>
                <br>
                <span class="text-xs text-slate-400">{{ getMoodText(mood) }}</span>
            </div>
        </div>
        <div class="flex space-x-4">
            <button 
                id="confirmMoodBtn" 
                class="btn-primary flex-1" 
                :disabled="!selectedMood" 
                @click="confirmMoodCheckin"
            >
                Confirmar
            </button>
            <button class="btn-secondary flex-1" @click="handleCancel()">Cancelar</button>
        </div>
    </div>
</div>
</template>