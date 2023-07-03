<template>
  <q-item-section avatar>
    <!-- <p>//{{ icon }}</p> -->
    <!-- <p>//{{ menu_book }}</p> -->
    <q-icon :name="icon"></q-icon>
  </q-item-section>
  <!-- <div> -->
  <router-link :to="link">{{ title }}</router-link>
  <!-- </div> -->
  <!-- <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item> -->
</template>

<script setup lang="ts">
// import { menu_book } from '@quasar/extras/material-icons';
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: ''
});
</script>
