<template>
  <!-- <div id="q-app" style="min-height: 100vh"> -->
  <div class="wrapeer-create-apiary">
    <div class="create-apiary">
      <div>
        <q-btn
          label="Create"
          @click="apiaryStore.addApiaryData"
          flat
          class="btn"
        />
        <q-btn label="Cancel" @click="comeBackToApiariesList" flat />
      </div>
    </div>
    <q-scroll-area style="height: 80vh; max-width: 300px">
      <!-- <div v-for="n in 300" :key="n" class="q-py-xs">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div> -->
      <!-- class="q-py-xs" -->
      <div>
        <q-form class="form-wrapper-create-apiary q-gutter-md" ref="myForm">
          <h2>General</h2>
          <!-- <div id="map"></div> -->
          <!-- <div style="height: 600px; width: 800px">
            <l-map
              ref="map"
              v-model:zoom="zoom"
              :center="[47.41322, -1.219482]"
            >
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              ></l-tile-layer>
            </l-map>
          </div> -->
          <div class="border">
            <div class="wrapper-input">
              <label>Name</label>
              <q-input filled label="Enter apiary name." />
            </div>
            <div class="wrapper-input">
              <label>Forages</label>
              <q-input filled label="Select forages." />
            </div>
            <div class="wrapper-input">
              <label>Type</label>
              <q-input filled label="Select type." />
            </div>
            <div class="wrapper-input">
              <label>Sun exposure</label>
              <q-input filled label="Select sun exposure." />
            </div>
            <div class="wrapper-input">
              <label>Description</label>
              <q-input filled label="Select description." />
            </div>
          </div>
          <h2>Address</h2>

          <div class="border">
            <div class="wrapper-input">
              <label>Address</label>
              <q-input filled label="Enter address." />
            </div>
            <div class="wrapper-input">
              <label>Zip</label>
              <q-input filled label="Select zip." />
            </div>
            <div class="wrapper-input">
              <label>City</label>
              <q-input filled label="Select city." />
            </div>
            <div class="wrapper-input">
              <label>State</label>
              <q-input filled label="Select state." />
            </div>
            <div class="wrapper-input">
              <label>Country</label>
              <q-input filled label="Select country." />
            </div>
          </div>
          <h2>Map coordiantes</h2>

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
        </q-form>
        <div class="create-apiary inner">
          <q-btn label="Get coordinates" />
          <q-btn label="Select coordinates" @click="modal = true" />
        </div>
      </div>
    </q-scroll-area>
  </div>
  <Teleport to="body">
    <!-- <div v-if="modal" @click="modal = false" class="modal">
      sssssssssssssssssssssssss
    </div> -->
    <TheModal v-if="modal" v-model="modal" />
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApiary } from '@stores/apiary-store';
import { useRouter } from 'vue-router';
import TheModal from '@components/modals/TheModal.vue';
import 'leaflet/dist/leaflet.css';
// import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
// import L from "leaflet";
import { provide } from 'vue';

const router = useRouter();
const apiaryStore = useApiary();
const modal = ref(false);
const setModal = () => {
  modal.value = false;
};
provide('modal', setModal);
// const zoom = ref(2);
const comeBackToApiariesList = () => {
  router.push({
    path: `/${sessionStorage.getItem('currentLang')?.toLowerCase()}/apiaries`
  });
};

// onMounted(() => {
//   var map = L.map('map').setView([51.505, -0.09], 13);
// })
</script>

<style scoped lang="scss">
.wrapeer-create-apiary {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .create-apiary {
    height: 52px;

    background-color: #f5f5f5;
    &:not(.inner) {
      width: 100vw;
    }
    display: flex;
    justify-content: center;
    & div {
      display: flex;
      justify-content: end;
      align-items: center;
      width: 65%;
      .btn {
        background-color: #ffb74d;
        height: 40px;
        width: 68px;
        font-size: 13px;
        border-radius: 0;
      }
    }
  }
  & .form-wrapper-create-apiary {
    width: 100%;
    // height: 90vh;
    & h2 {
      text-align: center;
    }
    & .border {
      border: 2px solid black;
      & .wrapper-input {
        display: flex;
        // justify-content: space-between;
      }
      :deep(.q-field__inner .relative-position .col .self-stretch) {
        margin: 10px 0;
      }
      :deep(.items-start) {
        // background-color: red;

        width: 90%;
      }

      & label {
        width: 10%;
        margin: 5px;
        align-items: center;
        display: flex;
      }
    }
    // background-color: red;
  }
}
:deep(.q-scrollarea) {
  width: 100%;
  max-width: 80% !important;
}
:deep(.q-scrollarea__content) {
  width: 100%;
}
:deep(.block) {
  font-size: 13px;
  font-family: sans-serif;
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
  }
}
#map {
  height: 180px;
}
</style>
