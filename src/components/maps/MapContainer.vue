<template>
  <div style="height: 400px; width: 100%">
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 400px"
      @click="(event) => $emit('setCoordinates', event)"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />
      <ol-fullscreen-control />
      <!-- <ol-fullscreen-control v-if="fullscreencontrol" /> -->
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-point :coordinates="coordinates"> </ol-geom-point>
            <ol-style>
              <!-- <ol-style-circle :radius="radius"> -->
              <ol-style-text text="Hellooooo"></ol-style-text>
              <ol-style-icon
                :src="imgUrlUnitedPoland"
                :scale="0.1"
              ></ol-style-icon>

              <!--     <ol-style-fill :color="fillColor"></ol-style-fill>
                <ol-style-stroke
                  :color="strokeColor"
                  :width="strokeWidth"
                ></ol-style-stroke> -->
              <!-- </ol-style-circle> -->
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import imgUrlUnitedPoland from '@assets/images/icons8-poland-30.png';

import 'vue3-openlayers/dist/vue3-openlayers.css';
defineProps({
  coordinates: Array<number | null>
});
const center = ref([47.41322, 4.619482]);
const projection = ref('EPSG:4326');
const zoom = ref(8);
const rotation = ref(0);

const radius = ref(40);
const strokeWidth = ref(10);
const strokeColor = ref('red');
const fillColor = ref('white');
// const coordinate = ref([40, 40]);
// const map = ref();

defineEmits<{
  (e: 'setCoordinates', coordinates: { lat: number; lng: number }): void;
}>();

// onMounted(() => {
//   console.log('map', map.value);
//   //   var marker = L.marker([51.5, -0.09]).addTo(map);
// });
</script>

<style scoped lang="scss">
// :deep(.leaflet-left) {
//   left: 95%;
// }
// :deep(.leaflet-top) {
//   top: 75%;
// }
</style>
