import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Team from './views/Team.vue';
import Status from './views/Status.vue';

// Definimos as rotas do projeto
const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/team', name: 'Team', component: Team },
  { path: '/status', name: 'Status', component: Status },
];

// roteador 
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;