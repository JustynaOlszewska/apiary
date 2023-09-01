<template>
  <div class="modal-content">
    <header class="header">
      <div>
        <h6>Map</h6>
        <q-btn @click="() => setModal(false)" flat class="btn">close</q-btn>
      </div>
    </header>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const setModal = inject('modal');
</script>

<style scoped lang="scss">
.modal-content {
  & .header {
    color: #f5f5f5;
    display: flex;
    justify-content: end;
    width: 100%;
    height: 56px;
    background-color: #ffb74d;
    & > div {
      display: flex;
      width: 50%;
      justify-content: space-between;
      align-items: center;

      & .btn {
        font-size: 13px;
        font-family: sans-serif;
        text-transform: lowercase;
        & span {
          text-transform: uppercase;
          color: red;
        }
      }
    }
  }
}
:deep(
    .q-btn__content
      .text-center
      .col
      .items-center
      .q-anchor--skip
      .justify-center
      .row
  ) {
  text-transform: lowercase;
}
</style>
