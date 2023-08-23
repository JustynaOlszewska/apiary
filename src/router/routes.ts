import { RouteRecordRaw } from 'vue-router';
// import { i18n } from '../boot/i18n';
import { useApiary } from '../stores/apiary-store';

const routes: RouteRecordRaw[] = [
  {
    path: '/:lang',
    component: () => import('../components/layouts/MainLayout.vue'),
    beforeEnter(to, from, next) {
      return next();
    },
    children: [
      {
        path: 'apiaries',
        name: 'apiaries',
        component: () => import('../components/pages/ApiariesList.vue'),
        async beforeEnter(to, from, next) {
          const apiaryStore = useApiary();
          await apiaryStore.getInitApiaryData();
          return next();
        }
      },
      // children: [
      {
        path: 'apiaries/create',
        name: 'create',
        component: () =>
          import('../components/pages/childrens/CreateApiary.vue')
        // beforeEnter(to, from, next) {
        //   return next();
        // }
        // }
        // ]
      },
      {
        path: 'beehives',
        name: 'beehives',
        component: () => import('../components/pages/BeehivesList.vue'),
        beforeEnter(to, from, next) {
          return next();
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../components/auth/LoginForm.vue'),
        beforeEnter(to, from, next) {
          return next();
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../components/auth/RegisterForm.vue'),
        beforeEnter(to, from, next) {
          return next();
        }
      }
    ]
  }
  // { path: '', component: () => import('pages/IndexPage.vue') }
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/ErrorNotFound.vue'),
  // },
];

export default routes;
