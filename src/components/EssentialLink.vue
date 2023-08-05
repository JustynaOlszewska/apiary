<template>
  <!-- <p>//{{ titlePage }}</p> -->
  <!-- <p>//{{ title }}</p>
  <p>//{{ active }}</p>
  <p>//{{ active === title }}</p> -->
  <!-- <p>//{{ titlePage[title].value.value }}</p> -->
  <!-- :class="active === title ? 'active' : 'not-active'" -->
  <!-- :class="
      titlePage[title]?.value && titlePage[title]?.value !== 'div' && 'active'
    " -->
  <!-- :ref="titlePage[title]" -->
  <!-- @click="setStyleActiveElement(title)" -->

  <Transition>
    <div class="route-wrapper" :data-active="title">
      <router-link
        :to="link"
        @click="title === Pages.APIARIES && $emit('getData')"
        class="text-link"
      >
        <q-item-section avatar>
          <q-icon :name="icon" class="avatar-icon" /> </q-item-section
        ><span class="avatar-description">{{ title }}</span>
      </router-link>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { Pages } from '../interfaces/apiary';
import { useApiary } from '../stores/apiary-store';
import { useRoute } from 'vue-router';

const route = useRoute();
const apiaryStore = useApiary();
defineEmits<{
  (e: 'getData'): void;
}>();
onMounted(() => {
  const currentRoute = sessionStorage.getItem('curentRoute') || Pages.LOGIN;

  if (!currentRoute) {
    return;
  }
  setStyleActiveElement(currentRoute, true);
});
const setStyleActiveElement = (title: string, init?: boolean) => {
  const groupElement = [...document.querySelectorAll('[data-active]')];
  groupElement.forEach((el) => {
    if (title !== props.title) {
      return;
    }
    if (title === props.title && el.getAttribute('data-active') === title) {
      el.classList.add('active');
      apiaryStore.setCurrentRoute(title);
      return;
    }
    if (!init) {
      el.classList.remove('active');
    }
  });
};
watch(
  () => route.path,
  (newValue) => {
    const currentRoute =
      newValue.includes(props.title.toLocaleLowerCase()) && props.title;
    if (!currentRoute) {
      return;
    }
    setStyleActiveElement(currentRoute);
  }
);

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  getData?: () => void;
  icon?: string;
}
const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  title: ''
});
</script>
<style scoped lang="scss">
:deep(.q-item__section--avatar) {
  width: 37px;
  min-width: 37px;
}
.route-wrapper {
  display: flex;
  width: 100%;
  padding: 16px;
  & .text-link {
    color: white;
    text-decoration: none;
    width: 100%;
    display: flex;
  }
  &.active {
    background-color: goldenrod;
  }
  & .avatar-icon {
    font-size: 1.3rem;
  }
  & .avatar-description {
    position: fixed;
    left: 60px;
  }
}
:deep(.v-enter-active),
:deep(.v-leave-active) {
  background-color: red;
  transition: opacity 0.5s ease;
}

:deep(.v-enter-from),
:deep(.v-leave-to) {
  opacity: 0;
}
</style>
