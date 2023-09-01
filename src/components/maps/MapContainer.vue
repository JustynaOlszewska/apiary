<template>
  <div style="height: 305px; width: 100%">
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 305px"
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
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature>
            <ol-geom-point :coordinates="coordinates"> </ol-geom-point>
            <ol-style>
              <ol-style-icon
                :opacity="0.8"
                :src="imgUrlUnitedPoland"
                :scale="0.8"
              ></ol-style-icon>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import imgUrlUnitedPoland from '@assets/images/icons8-bee-box-48.png';

import 'vue3-openlayers/dist/vue3-openlayers.css';
defineProps({
  coordinates: Array<number | null>
});

const center = ref([47.41322, 4.619482]);
const projection = ref('EPSG:4326');
const zoom = ref(8);
const rotation = ref(0);

defineEmits<{
  (e: 'setCoordinates', coordinates: { lat: number; lng: number }): void;
}>();
</script>
