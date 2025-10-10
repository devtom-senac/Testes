import { defineStore } from 'pinia';
import { fetchProjects } from '../services/dataService';
import { saveData } from '../services/localStorageService';
import { useTasksStore } from './tasksStore';

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
        isLoading: false,
        isAddProjectModalOpen: false,
        isAddSprintModalOpen: false,
        isAssignMemberModalOpen: false,
        isProjectDetailsModalOpen: false,
        currentProjectId: null,
    }),

    getters: {
        getProject: (state) => (projectId) => {
            return state.projects.find(p => p.id === projectId);
        },

        projectsProgress: (state) => {
            return state.projects.map(project => {
                const totalSprints = project.sprints.length;
                const completedSprints = project.sprints.filter(sprint => sprint.completed).length;
                const progress = totalSprints > 0 ? Math.round((completedSprints / totalSprints) * 100) : 0;
                
                return {
                    id: project.id,
                    name: project.name,
                    progress: progress,
                    priority: project.priority,
                    totalSprints,
                    completedSprints,
                    status: project.status,
                    members: project.members
                };
            });
        },

        projectTasks: (state) => (projectId) => {
            const tasksStore = useTasksStore();
            return tasksStore.getTasksByProject(projectId);
        },
    },

    actions: {
        async loadProjects() {
            this.isLoading = true;
            try {
                this.projects = await fetchProjects();
            } catch (error) {
                console.error("Erro ao carregar projetos:", error);
            } finally {
                this.isLoading = false;
            }
        },

        addProject(projectData) {
            const newProjectId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
            const newProject = {
                ...projectData,
                id: newProjectId,
                status: 'active',
                members: [],
                sprints: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            this.projects.push(newProject);
            saveData('projects', this.projects);
            return newProject;
        },

        removeProject(projectId) {
            this.projects = this.projects.filter(p => p.id !== projectId);
            saveData('projects', this.projects);
        },

        assignMemberToProject(projectId, memberId) {
            const project = this.getProject(projectId);
            const id = parseInt(memberId);
            if (project && !project.members.includes(id)) {
                project.members.push(id);
                saveData('projects', this.projects);
            }
        },

        removeMemberFromProject(projectId, memberId) {
            const project = this.getProject(projectId);
            if (project) {
                project.members = project.members.filter(id => id !== memberId);
                saveData('projects', this.projects);
            }
        },

        addSprintToProject(projectId, sprint) {
            const project = this.getProject(projectId);
            if (project) {
                const newSprintId = project.sprints.length > 0 ? Math.max(...project.sprints.map(s => s.id)) + 1 : 1;
                const newSprint = {
                    ...sprint,
                    id: newSprintId,
                    completed: false,
                    completedAt: null
                };
                project.sprints.push(newSprint);
                saveData('projects', this.projects);
            }
        },

        completeSprint(projectId, sprintId) {
            const project = this.getProject(projectId);
            if (project) {
                const sprint = project.sprints.find(s => s.id === sprintId);
                if (sprint) {
                    sprint.completed = true;
                    sprint.completedAt = new Date();
                    saveData('projects', this.projects);
                }
            }
        },
        
        openAddProjectModal() { this.isAddProjectModalOpen = true; },
        closeAddProjectModal() { this.isAddProjectModalOpen = false; },
        openProjectDetails(projectId) {
            this.currentProjectId = projectId;
            this.isProjectDetailsModalOpen = true;
        },
        closeProjectDetailsModal() {
            this.isProjectDetailsModalOpen = false;
            this.currentProjectId = null;
        },
        openAssignMemberModal(projectId) {
            this.currentProjectId = projectId;
            this.isAssignMemberModalOpen = true;
        },
        closeAssignMemberModal() { this.isAssignMemberModalOpen = false; },
        openAddSprintModal(projectId) {
            this.currentProjectId = projectId;
            this.isAddSprintModalOpen = true;
        },
        closeAddSprintModal() { this.isAddSprintModalOpen = false; },
    },
});