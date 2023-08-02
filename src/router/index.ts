import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router';

import routes from './routes';
import { i18n } from '../boot/i18n';
// import { useAuth } from '../stores/auth-store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });
  // Router.afterEach(to, from, next) {
  //   const lang = to.params.lang;
  //   // const lang = from.params.lang;
  //   console.log('qqqqqqqqqqqqqqRouter111', lang, from.params.lang);

  //   if (!lang) {
  //     // i18n.locale = lang;
  //     return next(lang);
  //   }
  //   return next();
  //   }

  Router.beforeEach((to, from, next) => {
    // const authStore = useAuth();

    const langFroom = from.params.lang;
    const lang = to?.params?.lang;
    // const publicPages = ['login'];
    console.log(
      'qqqqqqqqqqqqqqRouter111fff',
      lang,
      localStorage.getItem('token')
    );
    // i18n.global.locale?.value
    // if (!localStorage.getItem('token') && lang) {
    //   return next('en/login');
    // } else
    if (!lang) {
      return next('pl/login');
    }
    // Router.replace({ params: { lang: 'en' } });
    else if (langFroom !== lang) {
      i18n.locale = langFroom;
    }

    // else {
    next();
    // }
  });
  return Router;
});
