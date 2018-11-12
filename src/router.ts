import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/surveys',
      name: 'surveys',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Surveys.vue'),
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/SurveysHistory.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue'),
    }
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
