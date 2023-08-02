import { RouteRecordRaw } from 'vue-router';
// import { i18n } from '../boot/i18n';
const routes: RouteRecordRaw[] = [
  {
    path: '/:lang',
    component: () => import('../components/layouts/MainLayout.vue'),
    // redirect: (to) => {
    //   console.log('qqqqqqqqqqqqqqRouter111', to);

    //   // the function receives the target route as the argument
    //   // we return a redirect path/location here.
    //   return { path: 'pl/login' };
    // },
    beforeEnter(to, from, next) {
      const lang = to.params.lang;
      // const lang1 = from?.params?.lang;

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
        component: () => import('../components/pages/ApiariesList.vue'),
        beforeEnter(to, from, next) {
          //   // const langStore = useSettingLang()
          // const lang = to.params.lang;
          // console.log('qqqqqqqqqqqqqqRouter2222', lang, from.params.lang);
          return next();
        }
      },
      {
        path: 'beehives',
        name: 'beehives',
        component: () => import('../components/pages/BeehivesList.vue'),
        beforeEnter(to, from, next) {
          // const langStore = useSettingLang()
          // const lang = to.params.lang
          return next();
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../components/auth/LoginForm.vue'),
        beforeEnter(to, from, next) {
          // const langStore = useSettingLang()
          // const lang = to.params.lang
          return next();
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../components/auth/RegisterForm.vue'),
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
