<template>
  <!-- <div id="q-app" style="min-height: 100vh"> -->
  <div class="wrapeer-create-apiary q-ma-md">
    <div class="create-apiary">
      <q-btn label="Create" @click="apiaryStore.addApiaryData" />
      <q-btn label="Cancel" @click="comeBackToApiariesList" />
    </div>
    <q-scroll-area style="height: 80vh; max-width: 300px">
      <!-- <div v-for="n in 300" :key="n" class="q-py-xs">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div> -->
      <div class="q-py-xs">
        <q-form class="form-wrapper-create-apiary q-gutter-md" ref="myForm">
          <div class="border">
            <h2>General</h2>
            <div class="wrapper-input">
              <label>Name</label>
              <q-input label="Enter apiary name." />
            </div>
            <div class="wrapper-input">
              <label>Forages</label>
              <q-input label="Select forages." />
            </div>
            <div class="wrapper-input">
              <label>Type</label>
              <q-input label="Select type." />
            </div>
            <div class="wrapper-input">
              <label>Sun exposure</label>
              <q-input label="Select sun exposure." />
            </div>
            <div class="wrapper-input">
              <label>Description</label>
              <q-input label="Select description." />
            </div>
          </div>
          <div class="border">
            <h2>Address</h2>
            <div class="wrapper-input">
              <label>Address</label>
              <q-input label="Enter address." />
            </div>
            <div class="wrapper-input">
              <label>Zip</label>
              <q-input label="Select zip." />
            </div>
            <div class="wrapper-input">
              <label>City</label>
              <q-input label="Select city." />
            </div>
            <div class="wrapper-input">
              <label>State</label>
              <q-input label="Select state." />
            </div>
            <div class="wrapper-input">
              <label>Country</label>
              <q-input label="Select country." />
            </div>
          </div>
          <div class="border">
            <h2>Map coordiantes</h2>
            <div class="wrapper-input">
              <label>Latitude</label>
              <q-input label="Select state." />
            </div>
            <div class="wrapper-input">
              <label>Longitude</label>
              <q-input label="Select country." />
            </div>
          </div>
        </q-form>
        <div class="create-apiary">
          <q-btn label="Get coordinates" />
          <q-btn label="Select coordinates" />
        </div>
      </div>
    </q-scroll-area>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { useApiary } from '../../../stores/apiary-store';
import { useRouter } from 'vue-router';

const router = useRouter();
const apiaryStore = useApiary();

const comeBackToApiariesList = () => {
  router.push({
    path: `/${sessionStorage.getItem('currentLang')?.toLowerCase()}/apiaries`
  });
};
</script>

<style scoped lang="scss">
.wrapeer-create-apiary {
  // overflow-y: hidden;
  width: 70%;
  // height: 110vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .create-apiary {
    background-color: #f5f5f5;
  }
  & .form-wrapper-create-apiary {
    width: 100%;
    // height: 90vh;
    & .border {
      border: 2px solid black;
      & .wrapper-input {
        display: flex;
      }
    }
    // background-color: red;
  }
}
:deep(.q-scrollarea) {
  width: 100%;
}
</style>
