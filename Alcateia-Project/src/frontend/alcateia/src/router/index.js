import { createRouter, createWebHistory } from 'vue-router';

import DashboardView from '../views/DashboardView.vue';
import TasksView from '../views/TasksView.vue';
import TeamView from '../views/TeamView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard', // Define o Dashboard como a página inicial
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksView,
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamView,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: AnalyticsView,
  },
];

const router = createRouter({
  // Cria URLs limpas (semelhante ao que o history mode faz)
  history: createWebHistory(), 
  routes,
});

export default router;