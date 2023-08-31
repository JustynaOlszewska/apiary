<template>
  <div class="wrapper-input">
    <label>{{ label }}</label>
    <q-select
      v-if="options"
      outlined
      :square="true"
      :placeholder="placeholder"
      required
      :options="options"
      v-model="value"
      hide-bottom-space
      no-error-icon
      :error="permissionToValidate && !(value && value?.length > 0)"
    />
    <q-input
      v-else
      ref="refName"
      outlined
      :square="true"
      :placeholder="placeholder"
      required
      v-model="value"
      :type="type"
      no-error-icon
      hide-bottom-space
      :error="permissionToValidate && !(value && value?.length > 0)"
    >
      <template v-slot:append> <slot /></template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { InputWrapperProps } from '@interfaces/apiary';

const props = withDefaults(defineProps<InputWrapperProps>(), {
  type: 'text',
  append: false
});
const emit = defineEmits(['update:modelValue']);
const permissionToValidate: boolean | undefined = inject(
  'permissionToValidate'
);
const text = ref('');
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<style scoped lang="scss">
.wrapper-input {
  display: flex;
  color: #0d1114;
  & label {
    font: bold 13px/17px 'Open Sans', 'Helvetica Neue', helvetica, arial,
      sans-serif;
    font-size: 13px;
    width: 11%;
    margin: 5px;
    align-items: center;
    display: flex;
  }

  :deep(.q-field--outlined .q-field__control),
  :deep(.q-field--auto-height .q-field__control),
  :deep(.q-field--auto-height .q-field__native) {
    height: 38px;
    min-height: 38px;
  }
  :deep(.q-textarea .q-field__control) {
    height: 82px !important;
  }
  :deep(.q-field--outlined .q-field__control),
  :deep(.q-field--auto-height .q-field__control) {
    background-color: #f5f5f5;
  }
  :deep(.items-center) {
    height: 38px;
  }
  :deep(.relative-position) {
    font: 300 13px/17px 'Open Sans', 'Helvetica Neue', helvetica, arial,
      sans-serif;
  }
  :deep(.q-field__inner .relative-position .col .self-stretch) {
    margin: 10px 0;
  }
  :deep(.items-start) {
    width: 89%;
  }
}
</style>
