<template>
  <q-item-section avatar>
    <q-icon :name="icon"></q-icon>
  </q-item-section>
  <router-link :to="link" @click="apiaryStore.getInitApiaryData()">{{
    title
  }}</router-link>
</template>

<script setup lang="ts">
import { useApiary } from '../stores/apiary-store';
const apiaryStore = useApiary();
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
