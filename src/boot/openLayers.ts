import { boot } from 'quasar/wrappers';
import 'vue3-openlayers/styles.css';
/* eslint-enable @typescript-eslint/no-empty-interface */
import OpenLayersMap, {
  type Vue3OpenlayersGlobalOptions
} from 'vue3-openlayers';
// ...

const options: Vue3OpenlayersGlobalOptions = {
  debug: true
};
export default boot(({ app }) => {
  app.use(OpenLayersMap, options);
});
