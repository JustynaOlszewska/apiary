<template>
  <h5>Map Coordinates</h5>
  <section>
    <div class="border">
      <div class="wrapper-input">
        <label>Latitude</label>
        <q-input filled label="Select state." v-model="lat" />
      </div>
      <div class="wrapper-input">
        <label>Longitude</label>
        <q-input filled label="Select country." v-model="lng" />
      </div>
    </div>
    <MapContainer @set-coordinates="setCoordinates" :coordinates="[lat, lng]" />
    <!-- <div class="wrapper-input"> -->
    <q-btn
      label="setCoordiantes"
      @click="
        (event) => {
          $emit('setCoordinates', { lat, lng });
          setModal();
        }
      "
    />

    <!-- </div> -->
  </section>
  <p>Click on map to mark location and get coordinates</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapContainer from '@components/maps/MapContainer.vue';
import { inject } from 'vue';

defineEmits<{
  (e: 'setCoordinates', coordinates: { lat: number; lng: number }): void;
}>();
const lat = ref<number | null>(null);
const lng = ref<number | null>(null);
const setModal = inject('modal');

const setCoordinates = (coordinates) => {
  lat.value = coordinates.coordinate[0];
  lng.value = coordinates.coordinate[1];
};
</script>

<style scoped lang="scss">
.border {
  border: 2px solid black;
  & .wrapper-input {
    display: flex;
  }
  :deep(.q-field__inner .relative-position .col .self-stretch) {
    margin: 10px 0;
  }
  :deep(.items-start) {
    width: 90%;
  }

  & label {
    width: 10%;
    margin: 5px;
    align-items: center;
    display: flex;
  }
}
</style>
