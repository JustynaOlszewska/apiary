<template>
  <q-btn
    class="btn"
    v-on:[click]="$emit('someAction')"
    :flat="flat"
    :type="type"
    :form="formName"
  >
    <q-icon class="button-icon" v-if="src">
      <img :src="getImageUrl()" :alt="src" />
    </q-icon>
    <div class="btn" v-if="label">{{ label }}</div>
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ButtonWrapperProps } from '@interfaces/apiary';

const props = withDefaults(defineProps<ButtonWrapperProps>(), {
  flat: false,
  background: '#ffb74d',
  color: '#ffff',
  margin: '20px 12px 20px 0'
});
const background = computed(() => {
  return props.background;
});
defineEmits<{
  (e: 'someAction'): void;
}>();
const getImageUrl = () => {
  // This path must be correct for your file
  if (props.src) {
    return new URL(props.src, import.meta.url);
  }
};
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
