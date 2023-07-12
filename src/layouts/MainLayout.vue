<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated :class="'bg-grey-10'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerClick"
        />
        <!-- <p>//wwwwww{{ lang }}</p>
        <p>//{{ defaultLang }}</p> -->
        <q-toolbar-title @click="onFocusInput">
          <div class="row">
            <q-select
              v-model="model"
              :options="options"
              color="teal"
              negative
              options-selected-class="text-deep-orange"
              :input-style="{ color: 'white' }"
              class="col-2 row tx-white"
              :class="[backgroundColorInInput ? 'bg-brown' : 'bg-red']"
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  ref="dropdownVisible"
                  :isOptionDisabled="() => false"
                  v-if="!scope.opt.hide"
                >
                  <q-item-section avatar>
                    <q-icon>
                      <img :src="scope.opt.icon" alt="flags" />
                    </q-icon>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>{{
                      scope.opt.description
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      class="bg-grey-10 text-white"
    >
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <a target="_blank" href="https://icons8.com/icon/NI6BPSi7hsoo/poland"
    >Poland</a
  >
  icon by <a target="_blank" href="https://icons8.com">Icons8</a>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import EssentialLink from '../../src/components/EssentialLink.vue';
import { options } from '../../src/constant/dataForm';
import { ModelValueLang } from '../../src/interfaces/form';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
// import { menu_book } from '@quasar/extras/material-icons';

const i18n = useI18n();
const router = useRouter();

const leftDrawerOpen = ref(false);
//zastąpione drawerClick
// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
const miniState = ref(false);

const drawerClick = (e) => {
  // if in "mini" state and user
  // click on drawer, we switch it to "normal" mode
  if (miniState.value) {
    miniState.value = false;

    // notice we have registered an event with capture flag;
    // we need to stop further propagation as this click is
    // intended for switching drawer to "normal" mode only
    e.stopPropagation();
  } else {
    miniState.value = true;
  }
};
const lang = computed(() => {
  // router.currentRoute.value.params.lang ||
  return i18n.locale.value;
});
const defaultLang = computed(() => {
  // i18n.locale.value = newValue.value;
  // const r = options.find((el) => el.value === lang.value);
  // const w = router.currentRoute.value.params.lang || i18n.locale.value;
  return options.find((el) => el.value === lang.value);
});

const essentialLinks: any[] = [
  {
    title: 'Apiaries',
    caption: 'quasar.dev',
    icon: 'signpost',
    // link: '/apiaries'
    link: `/${i18n.locale.value}/apiaries`
  },
  {
    title: 'Beehives',
    caption: 'github.com/quasarframework',
    icon: 'inventory_2',
    link: `/${i18n.locale.value}/behives`
  }
];
const model = ref<ModelValueLang | undefined>(defaultLang.value);
const backgroundColorInInput = ref<boolean>(false);
const dropdownVisible = ref<HTMLElement | null>(null);

const onFocusInput = () => {
  backgroundColorInInput.value = !backgroundColorInInput.value;
};
onMounted(() => {
  options?.forEach((el) => {
    if (el.value === router.currentRoute.value.params.lang) {
      el.hide = true;
    } else {
      el.hide = false;
    }
  });
  if (i18n.locale) {
    i18n.locale.value = router.currentRoute.value.params.lang;
  }
});
watch(
  () => model.value as ModelValueLang,
  (newValue: ModelValueLang) => {
    if (newValue) {
      options.forEach((el) => {
        if (el.value === newValue.value) {
          el.hide = true;
        } else {
          el.hide = false;
        }
      });
      i18n.locale.value = newValue.value;
      router.replace({ params: { lang: newValue.value } });
      backgroundColorInInput.value = false;
    }
  }
);
</script>
