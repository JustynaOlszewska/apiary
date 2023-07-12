import { RouteRecordRaw } from 'vue-router';
// import { i18n } from '../boot/i18n';
const routes: RouteRecordRaw[] = [
  {
    path: '/:lang',
    component: () => import('../layouts/MainLayout.vue'),
    beforeEnter(to, from, next) {
      const lang = to.params.lang;
      const lang1 = from?.params?.lang;
      console.log('qqqqqqqqqqqqqqRouter111', lang, lang1);

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
        component: () => import('../components/ApiariesList.vue'),
        beforeEnter(to, from, next) {
          //   // const langStore = useSettingLang()
          // const lang = to.params.lang;
          // console.log('qqqqqqqqqqqqqqRouter2222', lang, from.params.lang);
          return next();
        }
      },
      {
        path: 'behives',
        name: 'behives',
        component: () => import('../components/BeehivesList.vue'),
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
