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
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('./views/Groups.vue')
    },
    {
      path: '/addGroup',
      name: 'addGroup',
      component: () => import('./views/AddGroup.vue')
    },
    {
      path: '/addSurvey',
      name: 'addSurvey',
      component: () => import('./views/AddSurvey.vue')
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('./views/Reports.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/fill/:id',
      name: 'fill',
      component: () => import('./views/Fill.vue')
    }
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('isLoggedIn');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (loggedIn && to.path == '/login')
     return next('/');

  next();
})
