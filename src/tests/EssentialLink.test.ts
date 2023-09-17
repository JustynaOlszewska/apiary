// import { describe, it, expect, vi, beforeEach } from 'vitest';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import EssentialLink from '../components/EssentialLink.vue';
import { createTestingPinia } from '@pinia/testing';

// import { createRouter, Router } from 'vue-router';
// import routes from '../router/routes';
// import { createWebHistory } from 'vue-router';
describe('EssentialLink', () => {
  const title = 'title';
  // const mockRoute = {
  //   path: '/pl/login'
  // };
  // const mockRouter = {
  //   push: vi.fn()
  // };
  let wrapper: VueWrapper<InstanceType<typeof EssentialLink>>;
  beforeEach(() => {
    wrapper = mount(EssentialLink, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        },
        mocks: {
          props: {
            title,
            to: 'link'
          }
          // $route: mockRoute,
          // $router: mockRouter
        },
        plugins: [createTestingPinia()]
      }
    });
  });
  afterEach(() => wrapper.unmount());

  // let router: Router;

  // beforeEach(async () => {
  //   router = createRouter({
  //     history: createWebHistory(),
  //     routes: routes
  //   });

  //   router.push('/pl/login');
  //   await router.isReady();
  // });
  it('calls setStyleActiveElement', () => {
    const title = wrapper.vm.setStyleActiveElement('title');
    expect(title).toBe(undefined);
  });
  it('exists RouterLink', async () => {
    expect(wrapper.exists()).toBe(true);
    const routerLink = wrapper.findComponent(RouterLinkStub);
    expect(routerLink.exists()).to.equal(true);
  });
});
