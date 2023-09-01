<template>
  <div class="wrapper-coordinates">
    <h2>Map Coordinates</h2>
    <section class="wrapper-content">
      <div class="border">
        <InputWrapper
          v-model="lat"
          label="Latitude"
          placeholder="Select state."
        />
        <InputWrapper
          v-model="lng"
          label="Longitude"
          placeholder="Select country."
        />
      </div>
      <MapContainer
        @set-coordinates="setCoordinates"
        :coordinates="[lat, lng]"
        class="map-margin"
      />
      <div class="button-wrapper">
        <ButtonWrapper
          src="../../assets/images/icons8-tick-24.png"
          label="Set Coordiantes"
          click="click"
          @someAction="
            (event) => {
              $emit('setCoordinates', { lat, lng });
              setModal(false);
            }
          "
        />
      </div>
    </section>
    <div>Click on map to mark location and get coordinates</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapContainer from '@components/maps/MapContainer.vue';
import { inject } from 'vue';
import ButtonWrapper from '@components/organism/ButtonWrapper.vue';
import InputWrapper from '@components/molecules/InputWrapper.vue';

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
.wrapper-coordinates {
  margin: 10px 10px 10px 10px;
  & .wrapper-content {
    border: 1px solid #aaa;
    margin-bottom: 10px;
    & .button-wrapper {
      display: flex;
      justify-content: center;
    }
    & .map-margin {
      margin: 10px 10px 10px 10px;
      width: auto !important;
    }
  }
  & h2 {
    margin-top: 20px;
    margin-bottom: 2px;
    text-align: center;
    color: #31869b !important;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Open Sans', 'Helvetica Neue', helvetica, arial, sans-serif;
    line-height: 1.3;
  }
  & > div {
    text-align: center;
    color: #6666;
  }
  & .border {
    // border: 2px solid black;
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
}
</style>
