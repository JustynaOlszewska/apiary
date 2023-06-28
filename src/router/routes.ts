import { RouteRecordRaw } from 'vue-router';
// import { useSettingLang } from '../../src/stores/langManagement'

const routes: RouteRecordRaw[] = [
  {
    path: '/:lang',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter (to, from, next) {
      // const langStore = useSettingLang()
      // const lang = to.params.lang
        return next()
    },
    children: [],
  },
  // { path: '', component: () => import('pages/IndexPage.vue') }
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/ErrorNotFound.vue'),
  // },
];

export default routes;
