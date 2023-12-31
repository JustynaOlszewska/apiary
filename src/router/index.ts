import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router';

import routes from './routes';
// import { i18n } from '../boot/i18n';
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
    history: createHistory()
  });
  Router.beforeEach((to, from, next) => {
    const langFroom = from.params.lang;
    const lang = to?.params?.lang;

    if (!lang) {
      sessionStorage.setItem('currentLang', 'pl');

      return next('pl/login');
    } else if (lang && !langFroom) {
      sessionStorage.setItem('currentLang', lang);
      //ciekwe cy ten komentrz nie popsuł jezyków
      // sessionStorage.setItem('currentLang', lang[0]);
      return next();
    }
    next();
  });
  return Router;
});
