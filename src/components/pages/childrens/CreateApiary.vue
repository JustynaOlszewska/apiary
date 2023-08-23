<template>
  <!-- <div id="q-app" style="min-height: 100vh"> -->
  <div class="wrapeer-create-apiary">
    <div class="create-apiary">
      <div>
        <q-btn label="Create" flat class="btn" type="submit" form="myForm" />
        <!-- @click="qqqqq()" -->

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
        <q-form
          class="form-wrapper-create-apiary q-gutter-md"
          ref="myForm"
          id="myForm"
          @submit.prevent="onSubmit"
          @reset="onReset"
          :greedy="true"
        >
          <!-- :greedy="true" -->
          <!-- @reset="onReset" -->

          <h2>General</h2>
          <div class="border">
            <div class="wrapper-input">
              <label>Name</label>
              <q-input
                filled
                placeholder="Enter apiary name."
                v-model="name"
                type="text"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>Forages</label>
              <q-select
                filled
                placeholder="Select forages."
                :options="foragesOptions"
                v-model="forages"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>Type</label>
              <q-input
                filled
                placeholder="Select type."
                v-model="type"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>Sun sun</label>
              <q-select
                filled
                placeholder="Select sun sun."
                :options="sunOptions"
                v-model="sun"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>Hives</label>
              <q-input
                filled
                placeholder="hives."
                v-model="hives"
                type="number"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>Description</label>
              <q-input
                filled
                placeholder="Select description."
                v-model="description"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
          </div>
          <h2>Address</h2>

          <div class="border">
            <div class="wrapper-input">
              <label>Address</label>
              <q-input
                filled
                label="Enter address."
                v-model="address"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>Zip</label>
              <q-input
                filled
                label="Select zip."
                v-model="zip"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>City</label>
              <q-input
                filled
                label="Select city."
                v-model="city"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>State</label>
              <q-input
                filled
                label="Select state."
                v-model="state"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>Country</label>
              <q-select
                filled
                label="Select country."
                :options="countryOptions"
                v-model="country"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
          </div>
          <h2>Map coordiantes</h2>

          <div class="border">
            <div class="wrapper-input">
              <label>Latitude</label>
              <q-input
                filled
                placeholder="Select state."
                type="number"
                v-model="lat"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
            </div>
            <div class="wrapper-input">
              <label>Longitude</label>
              <q-input
                filled
                placeholder="Select lng."
                type="number"
                v-model="lng"
                :rules="[(val) => (val && val?.length > 0) || 'Pole wymagane']"
              />
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
    <TheModal v-if="modal" v-model="modal">
      <ModalHeaderContent @set-coordinates="setCoordinates" />
    </TheModal>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApiary } from '@stores/apiary-store';
import { useRouter } from 'vue-router';
import TheModal from '@components/modals/TheModal.vue';
import 'leaflet/dist/leaflet.css';
import ModalHeaderContent from '@components/modals/headersInModals/ModalHeaderContent.vue';

// import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
// import L from "leaflet";
import { provide } from 'vue';
const lat = ref<number | null>(null);
const lng = ref<number | null>(null);
const country = ref<number | null>(null);
const state = ref<number | null>(null);
const city = ref<number | null>(null);
const zip = ref<number | null>(null);
const address = ref<number | null>(null);
// const greedy = ref<boolean>(false);

const setCoordinates = (coordinates) => {
  const { lat: latitude, lng: longitude } = coordinates;
  lat.value = latitude;
  lng.value = longitude;
};
const router = useRouter();
const apiaryStore = useApiary();
const modal = ref(false);
const name = ref(null);
const forages = ref(null);
const foragesOptions = [
  'Acacia',
  'Clover',
  'Honeydew',
  'Linden tree',
  'Multiflower'
];
const sunOptions = ['Sunny', 'Partial shade', 'Shade', 'Other'];
const typeOptions = ['Base', 'Migratory', 'Stationary', 'Other'];
const countryOptions = ['Poland', 'Germany', 'Ukraine', 'Hungary', 'Other'];
const type = ref(null);
const sun = ref(null);
const hives = ref(null);
const description = ref(null);

const myForm = ref(null);
const onSubmit = async () => {
  // const r = await myForm.value?.validate();
  const formData = {
    lat: lat.value,
    lng: lng.value,
    hives: hives.value,
    country: country.value,
    state: state.value,
    city: city.value,
    zip: zip.value,
    address: address.value,
    name: name.value,
    forages: forages.value,
    type: type.value,
    sun: sun.value,
    description: description.value
  };
  // if (r) {
  const dataSended = await apiaryStore.addApiaryData(formData);
  console.log('rrrrrrrrrrrrrrrrrrr', dataSended);

  // }
  if (dataSended) {
    router.push({
      path: `/${sessionStorage.getItem('currentLang')?.toLowerCase()}/apiaries`
    });
    onReset();
  }
  // myForm.value?.validate();
};
const onReset = () => {
  lat.value = null;
  lng.value = null;
  hives.value = null;
  country.value = null;
  state.value = null;
  city.value = null;
  zip.value = null;
  address.value = null;
  name.value = null;
  forages.value = null;
  type.value = null;
  sun.value = null;
  description.value = null;
  // await myForm.value?.resetValidation();
};
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
