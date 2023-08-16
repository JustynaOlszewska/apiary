<template>
  <h5>Map Coordinates</h5>
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
    <MapContainer />
  </section>
  <p>Click on map to mark location and get coordinates</p>
</template>

<script setup lang="ts">
import MapContainer from '@components/maps/MapContainer.vue';
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
