import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        currentUser: {
            id: 'admin_001',
            name: 'Heverton Souza',
            role: 'admin',
            permissions: ['create_tasks', 'assign_tasks', 'manage_members', 'view_analytics']
        },
    }),

    getters: {
        // Implementa hasPermission()
        hasPermission: (state) => (permission) => {
            return state.currentUser.permissions.includes(permission);
        },

        // Implementa isAdmin()
        isAdmin: (state) => {
            return state.currentUser.role === 'admin';
        }
    },
});