import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/:lang',
    component: () => import('../layouts/MainLayout.vue'),
    beforeEnter(to, from, next) {
      const lang = to.params.lang;
      if (!lang) {
        // i18n.locale = lang;
        return next(lang);
      }
      return next();
    },
    children: [
      {
        path: 'apiaries',
        name: 'apiaries',
        component: () => import('../components/Apiaries-List.vue'),
        beforeEnter(to, from, next) {
          //   // const langStore = useSettingLang()
          //   // const lang = to.params.lang
          return next();
        }
      },
      {
        path: 'behives',
        name: 'behives',
        component: () => import('../components/Beehives-List.vue'),
        beforeEnter(to, from, next) {
          // const langStore = useSettingLang()
          // const lang = to.params.lang
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
