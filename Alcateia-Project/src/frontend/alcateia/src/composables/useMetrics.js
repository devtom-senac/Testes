import { computed } from 'vue';
import { useTeamStore } from '../stores/teamStore';
import { useTasksStore } from '../stores/tasksStore';
import { useProjectsStore } from '../stores/projectStore';

export function useMetrics() {
    const teamStore = useTeamStore();
    const tasksStore = useTasksStore();
    const projectsStore = useProjectsStore();

    const getTodayMood = (moodHistory) => {
        const today = new Date().toISOString().split('T')[0];
        const todayEntry = moodHistory.find(entry => entry.date === today);
        return todayEntry ? todayEntry.mood : null;
    };

    const moodDistribution = computed(() => {
        const distribution = {};
        teamStore.members.forEach(member => {
            const todayMood = getTodayMood(member.moodHistory);
            if (todayMood) {
                distribution[todayMood] = (distribution[todayMood] || 0) + 1;
            }
        });
        return distribution;
    });

    const tasksByPriority = computed(() => {
        const activeTasks = tasksStore.tasks.filter(t => t.status !== 'completed');
        return {
            high: activeTasks.filter(t => t.priority === 'high').length,
            medium: activeTasks.filter(t => t.priority === 'medium').length,
            low: activeTasks.filter(t => t.priority === 'low').length
        };
    });

    const memberProductivity = computed(() => {
        return teamStore.membersWithStats
            .map(member => ({
                id: member.id,
                name: member.name,
                completedTasks: member.taskStats.completed,
                totalTasks: member.taskStats.total,
                completionRate: member.taskStats.total > 0
                    ? Math.round((member.taskStats.completed / member.taskStats.total) * 100)
                    : 0
            }))
            .sort((a, b) => b.completionRate - a.completionRate);
    });

    const dashboardMetrics = computed(() => {
        const totalActiveTasks = tasksStore.tasks.filter(t => t.status !== 'completed').length;
        const totalCompletedTasks = tasksStore.tasks.filter(t => t.status === 'completed').length;
        
        const totalCompleted = teamStore.membersWithStats.reduce((sum, m) => sum + m.taskStats.completed, 0);
        const totalAll = teamStore.membersWithStats.reduce((sum, m) => sum + m.taskStats.total, 0);
        const teamCompletionRate = totalAll > 0 ? Math.round((totalCompleted / totalAll) * 100) : 0;

        return {
            totalMembers: teamStore.members.filter(m => m.isActive).length,
            totalProjects: projectsStore.projects.filter(p => p.status === 'active').length,
            totalActiveTasks: totalActiveTasks,
            totalCompletedTasks: totalCompletedTasks,
            overdueTasks: tasksStore.overdueTasks.length, 
            teamCompletionRate: teamCompletionRate
        };
    });

    return {
        dashboardMetrics,
        moodDistribution,
        tasksByPriority,
        memberProductivity,
        projectsProgress: projectsStore.projectsProgress,
    };
}