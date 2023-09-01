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
          @click="
            (event) => {
              hideNavigationDescription();
              drawerClick(event);
            }
          "
        />
        <!-- <div> -->
        <!-- <div>+ Add apiary</div> -->
        <SelectLang />
        <!-- </div> -->
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
          v-for="link in apiaryStore.essentialLinks"
          :key="link.link"
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
import { ref, watch } from 'vue';
import EssentialLink from '@components/EssentialLink.vue';
import SelectLang from '@components//lang/SelectLang.vue';
import { useApiary } from '@stores/apiary-store';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const apiaryStore = useApiary();

const leftDrawerOpen = ref(true);

const miniState = ref(false);

const drawerClick = (e: Event) => {
  if (miniState.value) {
    miniState.value = false;
    e.stopPropagation();
  } else {
    miniState.value = true;
  }
};
const hideNavigationDescription = () => {
  var elements = document.querySelectorAll('.navigation-description');
  console.log('elements', elements);
  elements.forEach((element) => {
    element?.classList.toggle('toggle-navigation-description');
  });
};

watch(
  () => i18n.locale.value,
  (newValue) => {
    console.log('watch', newValue);
    apiaryStore.essentialLinks.forEach((el) => {
      el.link = `/${newValue}/${el.route}`;
    });
  }
);
</script>
<style lag="scss" scoped>
:deep(.q-field__inner .relative-position .col .self-stretch) {
  width: 15%;
}
:deep(.q-list) {
  margin-top: 20px;
}
:deep(.q-toolbar__title) {
  background-color: white;
  position: absolute;
  right: 0;
  left: 53px;
}
:deep(.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini) {
  width: 53px !important;
}
</style>
