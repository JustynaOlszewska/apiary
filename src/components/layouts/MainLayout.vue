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
        <SelectLang />
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
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          :title="link.title"
          v-bind="link"
          @get-data="apiaryStore.getInitApiaryData"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <a target="_blank" href="https://icons8.com/icon/NI6BPSi7hsoo/poland"
      >Poland</a
    >
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EssentialLink from '../EssentialLink.vue';
import SelectLang from '../lang/SelectLang.vue';
import { useI18n } from 'vue-i18n';
import { useApiary } from '../../stores/apiary-store';
const apiaryStore = useApiary();
const i18n = useI18n();

const leftDrawerOpen = ref(true);
//zastąpione drawerClick
// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
const miniState = ref(false);
const titlePage = ref([]);
onMounted(() => {
  titlePage.value.map((el) => {
    // el.has;
  });
});
const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false;
    e.stopPropagation();
  } else {
    miniState.value = true;
  }
};

const essentialLinks: any[] = [
  {
    title: 'Apiaries',
    caption: 'quasar.dev',
    icon: 'signpost',
    link: `/${i18n.locale.value}/apiaries`
  },
  {
    title: 'Beehives',
    caption: 'github.com/quasarframework',
    icon: 'inventory_2',
    link: `/${i18n.locale.value}/beehives`
  },
  {
    title: 'Login',
    caption: 'github.com/quasarframework',
    icon: 'inventory_2',
    link: `/${i18n.locale.value}/login`
  },
  {
    title: 'Register',
    caption: 'github.com/quasarframework',
    icon: 'inventory_2',
    link: `/${i18n.locale.value}/register`
  }
];
</script>
<style lag="scss" scoped>
:deep(.q-field__inner .relative-position .col .self-stretch) {
  width: 15%;
}

:deep(.q-list) {
  margin-top: 20px;
}
</style>
