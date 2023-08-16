<template>
  <div class="modal">
    <ModalHeaderClose>
      <ModalHeaderContent />
      <!-- <h5>Map Coordinates</h5>
      <section>
        <div class="border">
            <div class="wrapper-input">
              <label>Latitude</label>
              <q-input filled label="Select state." />
            </div>
            <div class="wrapper-input">
              <label>Longitude</label>
              <q-input filled label="Select country." />
            </div>
          </div>
      </section>
      <p>Click on map to mark location and get coordinates</p> -->
    </ModalHeaderClose>
    <!-- <div class="modal-content">
      <header class="header">
        <div>
          <h6>Map</h6>
          <q-btn @click="$emit('update:modelValue', false)" flat class="btn"
            >close</q-btn
          >
        </div>
      </header>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import ModalHeaderClose from '@components/modals/headersInModals/ModalHeaderClose.vue';
import ModalHeaderContent from '@components/modals/headersInModals/ModalHeaderContent.vue';

defineEmits<{
  (e: 'update:modelValue'): void;
}>();
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 60vw;
  //   width: 300px;
  transform: translate(-50%, -50%);
  margin-left: -150px;
  width: 60vw;
  height: 92vh;
  background-color: #f5f5f5;
  //   & .modal-content {
  //     // width: 80%;
  //     // height: 80%;
  //     // background-color: #f5f5f5;
  //     & .header {
  //       color: #f5f5f5;
  //       display: flex;
  //       justify-content: end;
  //       width: 100%;
  //       height: 80px;
  //       background-color: #ffb74d;
  //       & > div {
  //         display: flex;
  //         width: 50%;
  //         justify-content: space-between;
  //         align-items: center;
  //         & .btn::first-letter {
  //           text-transform: lowercase;
  //         }
  //       }
  //     }
  //   }
}
// :deep(
//     .q-btn__content
//       .text-center
//       .col
//       .items-center
//       .q-anchor--skip
//       .justify-center
//       .row
//   ) {
//   text-transform: lowercase;
// }
</style>
