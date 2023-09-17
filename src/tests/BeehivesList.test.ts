import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
// import BeehivesList from '@components/pages/BeehivesList.vue';
import BeehivesList from '../components/pages/BeehivesList.vue';

describe('BeehivesList', () => {
  const $route = { path: 'BeeHivesList' };

  const wrapper = mount(BeehivesList, {
    global: {
      mocks: {
        $t: (msg: string) => msg,
        $route: {
          path: 'BeeHivesList'
        }
      }
    }
  });
  it('goes to path', () => {
    expect(wrapper.vm.$route.path).toBe($route.path);
  });
});
