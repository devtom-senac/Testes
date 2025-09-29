import { createRouter, createWebHistory } from 'vue-router';
import { getUsuarioLogado } from '../modeState.js'; 

import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView, 
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authRequired = to.meta.requiresAuth;
  const isLoginPage = to.name === 'login';
  const loggedIn = getUsuarioLogado(); 

  if (authRequired && !loggedIn) {
    next({ name: 'login' });
  } else if (loggedIn && isLoginPage) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
