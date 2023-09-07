<template>
  <q-btn-dropdown class="btn" icon="download" text-color="black">
    <q-list>
      <q-item
        v-for="option in options"
        :key="option.extention"
        clickable
        v-close-popup
        @click="() => $emit('someAction', option.extention, 'List of apiaries')"
      >
        <q-item-section>
          <q-item-label>{{ option.title }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { ButtonDropDownProps } from '@interfaces/apiary';

withDefaults(defineProps<ButtonDropDownProps>(), {
  background: '#ffb74d',
  color: '#ffff',
  margin: '20px 12px 20px 0'
});
defineEmits<{
  (e: 'someAction', extention: string, title: string): any;
}>();
</script>

<style scoped lang="scss">
.btn {
  background-color: v-bind(background);
  border-radius: 0;
  color: v-bind(color);
}
.btn {
  font-size: 13px;
  font-family: sans-serif;
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }
  .button-icon {
    font-size: 1.2em;
    margin-right: 7px;
  }
}
button {
  margin: v-bind(margin);
}
</style>
