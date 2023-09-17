// import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { expect, beforeEach, afterEach, describe, it } from 'vitest';
import waitForExpect from 'wait-for-expect';
import LoginForm from '../components/auth/LoginForm.vue';
// import { enableAutoUnmount } from '@vue/test-utils';
import { enableAutoUnmount, mount, VueWrapper, config } from '@vue/test-utils';
// src/css/quasar.variables.scss
import { createTestingPinia } from '@pinia/testing';
import { useAuth } from '../stores/auth-store';
import { createI18n } from 'vue-i18n';
import { Quasar, QInput, QForm, useQuasar, Dark } from 'quasar';
// @ts-ignore
// import { Quasar, QuasarPluginOptions } from 'quasar/dist/quasar.esm.prod';
// import { Quasar, QInput, QForm } from '@quasar/quasar-app-extension-testing';
// installQuasarPlugin();
describe('LoginForm', async () => {
  // config.global.plugins.unshift([Quasar]);

  let wrapper: VueWrapper<InstanceType<typeof LoginForm>>;
  let store;
  const i18n = createI18n({
    locale: 'pl',
    legacy: false,
    fallbackLocale: 'pl' // Set the fallback locale
  });
  beforeEach(() => {
    wrapper = mount(LoginForm, {
      // config: { dark: 'auto' },
      global: {
        stubs: {
          // Quasar,
          QInput,
          QForm
        },
        mocks: {
          $t: (msg: string) => msg
          // $q: (dark) => dark
          //   errorLogin: 'erorr login'
          // $route: {
          //   path: 'BeeHivesList'
          // }
        },
        plugins: [
          // Quasar,
          i18n,
          createTestingPinia({
            initialState: {
              //   errorLogin: 'erorr login',
              auth: { errorLogin: 'erorr login' }
            }
          })
          // installQuasar()
        ]
      }
    });
  });
  // const $q = useQuasar();
  // $q.dark.set(false);
  //   afterEach(() => wrapper.unmount());
  //   enableAutoUnmount(afterEach);

  it('on change', async () => {
    store = useAuth();
    // await waitForExpect(() => {
    //   });
    // const form = wrapper.findComponent('[data-test="form"]');
    const form = wrapper.findComponent(QForm);

    // const name = wrapper.findComponent('[data-test="nombre_caja"]');
    // const password = wrapper.findComponent('#test-login-password');
    // name.wrapperElement._vei.value = '';
    // change value
    // waitForExpect(async () => {
    //   await name.setValue('');
    //   await password.setValue('');
    // });
    console.log('ppppppppppppppppppppppppppp', form);

    // wait for the promises to fulfill
    // await flushPromises();

    // await waitForExpect(() => {
    //   expect(name.element.nextSibling.textContent).toBe('name is required');
    //   expect(password.element.nextSibling.textContent).toBe(
    //     'password is required'
    //   );
    // });
  });

  //   it('on submit', async () => {
  //     const name = wrapper.find('input#name');
  //     const password = wrapper.find('input#password');

  //     // trigger `submit` event instead `click`
  //     await wrapper.find('button').trigger('submit');

  //     // wait for the promises to fulfill
  //     await flushPromises();

  //     await waitForExpect(() => {
  //       expect(name.element.nextSibling.textContent).toBe('name is required');
  //       expect(password.element.nextSibling.textContent).toBe(
  //         'password is required'
  //       );
  //     });
  //   });
});
