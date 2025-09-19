import { createRouter, createWebHistory } from 'vue-router';
import TeamView from './views/TeamView.vue';
import HomeView from './views/HomeView.vue';
import StatusView from './views/StatusView.vue';


// Definimos as rotas do projeto
const routes = [
  { path: '/team', name: 'Team', component: TeamView },
  { path: '/', name: 'Home', component: HomeView },
  { path: '/status', name: 'Status', component: StatusView}
];

// roteador 
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;