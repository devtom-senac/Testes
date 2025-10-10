import { defineStore } from 'pinia';
import { fetchMembers } from '../services/dataService';
import { saveData } from '../services/localStorageService';
import { getRoleIcon } from '../helpers/ui';
import { useTasksStore } from './tasksStore';

const calculateWeeklyMoodAverage = (moodHistory) => {
    if (!moodHistory || moodHistory.length === 0) return 0;
    
    const moodValues = {
        'excellent': 5, 'energetic': 5, 'good': 4, 'neutral': 3, 'low': 2, 'stressed': 1
    };
    const total = moodHistory.reduce((sum, entry) => sum + (moodValues[entry.mood] || 3), 0);
    return Math.round((total / moodHistory.length) * 20);
};

const getMoodValue = (mood) => {
    const values = {
        'excellent': 5, 'energetic': 5, 'good': 4, 'neutral': 3, 'low': 2, 'stressed': 1
    };
    return values[mood] || 3;
};

const generateMoodHistory = () => {
    const moods = ['excellent', 'good', 'neutral', 'low', 'stressed', 'energetic'];
    const history = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        history.push({
            date: date.toISOString().split('T')[0],
            mood: moods[Math.floor(Math.random() * moods.length)],
            moodValue: Math.floor(Math.random() * 5) + 1
        });
    }
    return history;
};

export const useTeamStore = defineStore('team', {
    state: () => ({
        members: [],
        isLoading: false,
        isAddMemberModalOpen: false, 
        isMoodCheckinModalOpen: false,
        currentMemberIdForMood: null
    }),

    getters: {
        membersWithStats: (state) => {
            const tasksStore = useTasksStore();
            
            return state.members.map(member => {
                const taskStats = tasksStore.calculateMemberTaskStats(member.id);
                const weeklyMoodAverage = calculateWeeklyMoodAverage(member.moodHistory);
                
                return {
                    ...member,
                    taskStats, 
                    weeklyMoodAverage, 
                };
            });
        },
        
        getTodayMood: (state) => (memberId) => {
            const member = state.members.find(m => m.id === memberId);
            if (!member) return null;

            const today = new Date().toISOString().split('T')[0];
            const todayEntry = member.moodHistory.find(entry => entry.date === today);
            return todayEntry ? todayEntry.mood : null;
        }
    },

    actions: {
        async loadMembers() {
            this.isLoading = true;
            try {
                this.members = await fetchMembers();
            } catch (error) {
                console.error("Erro ao carregar membros:", error);
            } finally {
                this.isLoading = false;
            }
        },

        recalculateMemberStats(memberId) {
            saveData('members', this.members);
        },

        addMember(memberData) {
            const newMemberId = this.members.length > 0 ? Math.max(...this.members.map(m => m.id)) + 1 : 1;
            const newMember = {
                ...memberData,
                id: newMemberId,
                icon: getRoleIcon(memberData.role),
                email: memberData.email || `${memberData.name.toLowerCase().replace(' ', '.')}@alcateia.com`,
                isActive: true,
                createdAt: new Date(),
                moodHistory: generateMoodHistory(), 
                weeklyMoodAverage: 0,
                taskStats: { pending: 0, inProgress: 0, completed: 0, total: 0 }
            };
            
            newMember.weeklyMoodAverage = calculateWeeklyMoodAverage(newMember.moodHistory);
            this.members.push(newMember);
            saveData('members', this.members);
            return newMember;
        },

        removeMember(memberId) {
            const tasksStore = useTasksStore();
            const activeTasks = tasksStore.tasks.filter(t => t.assigneeId === memberId && t.status !== 'completed');

            if (activeTasks.length > 0) {
                throw new Error(`Não é possível remover membro com ${activeTasks.length} tarefa(s) ativa(s)`);
            }

            this.members = this.members.filter(m => m.id !== memberId);
            saveData('members', this.members);
        },

        addMoodCheckin(memberId, mood) {
            const member = this.members.find(m => m.id === memberId);
            if (!member) return;

            const today = new Date().toISOString().split('T')[0];
            const existingIndex = member.moodHistory.findIndex(entry => entry.date === today);
            
            const moodEntry = {
                date: today,
                mood: mood,
                moodValue: getMoodValue(mood)
            };
            
            if (existingIndex >= 0) {
                member.moodHistory[existingIndex] = moodEntry;
            } else {
                member.moodHistory.push(moodEntry);
                member.moodHistory = member.moodHistory.slice(-7);
            }
            
            member.weeklyMoodAverage = calculateWeeklyMoodAverage(member.moodHistory);
            saveData('members', this.members);
        },

        openAddMemberModal() { this.isAddMemberModalOpen = true; },
        closeAddMemberModal() { this.isAddMemberModalOpen = false; },
        openMoodCheckin(memberId) {
            this.currentMemberIdForMood = memberId;
            this.isMoodCheckinModalOpen = true;
        },
        closeMoodCheckinModal() {
            this.isMoodCheckinModalOpen = false;
            this.currentMemberIdForMood = null;
        }
    },
});