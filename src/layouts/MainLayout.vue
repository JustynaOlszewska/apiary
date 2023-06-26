<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title  @click="onFocusInput"
>
          <div class="row" >
          <q-select
         

        v-model="model"
        :options="options"
        color="teal"
        negative
        options-selected-class="text-deep-orange"
        :input-style="{ color: 'white' }"
 class="col-2 row  tx-white"   
 :class="[backgroundColorInInput ? 'bg-brown': 'bg-red']" 
 
    >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" ref="dropdownVisible" :isOptionDisabled="()=>false" v-if="!scope.opt.hide">
            <q-item-section avatar>
              <q-icon>
                <img :src="scope.opt.icon" alt="flags"/>
              </q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select></div>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

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
  <a target="_blank" href="https://icons8.com/icon/NI6BPSi7hsoo/poland">Poland</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
</template>

<script setup lang="ts">
import { ref,  watch } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { options } from '../../src/constant/dataForm'
import {ModelValueLang } from '../../src/interfaces/form'

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const model = ref<ModelValueLang | null>(null);
const backgroundColorInInput = ref<boolean>(false);
const dropdownVisible = ref<HTMLElement | null>(null)

const onFocusInput =  () => {
  backgroundColorInInput.value = !backgroundColorInInput.value
}
watch(() => model.value as ModelValueLang, (newValue: ModelValueLang) => {

  if (newValue) {
    options.forEach(el=> {if(el.value === newValue.value) {el.hide =true}else {el.hide = false}})

  }
})
</script>
