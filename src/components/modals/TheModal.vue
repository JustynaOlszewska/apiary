<template>
  <div class="background-modal">
    <div class="modal">
      <ModalHeaderClose>
        <slot></slot>
      </ModalHeaderClose>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalHeaderClose from '@components/modals/headersInModals/ModalHeaderClose.vue';

defineEmits<{
  (e: 'update:modelValue'): void;
}>();
</script>

<style scoped lang="scss">
.background-modal {
  background-color: rgba(10, 10, 10, 0.3);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999998;
  display: none;
  @media (min-width: 768px) {
    display: block;
    .modal {
      z-index: 999999;
      position: fixed;
      top: 50%;
      left: 70%;
      transform: translate(-50%, -50%);
      margin-left: -150px;
      width: 60vw;
      height: 81vh;
      background-color: #ffff;
      @media (min-width: 769px) {
        left: 60vw;
      }
    }
  }
}
</style>
