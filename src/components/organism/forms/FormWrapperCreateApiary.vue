<template>
  <div>
    <!-- <div v-for="n in 300" :key="n" class="q-py-xs">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div> -->
    <!-- class="q-py-xs" -->
    <q-form
      class="form-wrapper-create-apiary q-gutter-md"
      ref="myForm"
      id="myForm"
      @submit.prevent="onSubmit"
      @reset="onReset"
      :greedy="true"
    >
      <h2>{{ t('formHeaders.general') }}</h2>
      <div class="border">
        <div>
          <InputWrapper
            v-model="name"
            label="Name"
            placeholder="Enter apiary name."
          />
          <InputWrapper
            v-model="forages"
            label="Forages"
            placeholder="Select forages."
            :options="foragesOptions"
          />

          <InputWrapper
            v-model="type"
            label="Type"
            placeholder="Select type."
            :options="typeOptions"
          />
          <InputWrapper
            v-model="sun"
            label="Sun Exposure"
            placeholder="Select forages."
            :options="sunOptions"
          />

          <InputWrapper
            v-model="hives"
            label="Hives"
            placeholder="hives."
            type="number"
          />
          <InputWrapper
            v-model="description"
            label="Description"
            placeholder="Select description."
            type="textarea"
          />
        </div>
      </div>
      <h2>{{ t('formHeaders.address') }}</h2>
      <div class="border">
        <div>
          <InputWrapper
            v-model="address"
            label="Address"
            placeholder="Enter address."
          />
          <InputWrapper v-model="zip" label="Zip" placeholder="Select zip." />
          <InputWrapper
            v-model="city"
            label="City"
            placeholder="Select city."
          />
          <InputWrapper
            v-model="country"
            label="Country"
            placeholder="Select country."
          />
        </div>
      </div>
      <h2>{{ t('formHeaders.mapCoordiantes') }}</h2>
      <div class="border">
        <div>
          <InputWrapper
            v-model.number="lat"
            label="Latitude"
            placeholder="Select state."
            type="number"
            :append="true"
          >
            <q-icon
              name="close"
              @click="lat = null"
              class="cursor-pointer"
            ></q-icon>
          </InputWrapper>
          <InputWrapper
            v-model.number="lng"
            label="Longitude"
            placeholder="Select lng."
            type="number"
            :append="true"
          >
            <q-icon
              name="close"
              @click="lng = null"
              class="cursor-pointer"
            ></q-icon>
          </InputWrapper>
        </div>
      </div>
    </q-form>
    <div class="create-apiary inner">
      <div>
        <ButtonWrapper
          src="../../assets/images/icons8-arrow-50.png"
          label="Get coordinates"
        />
        <ButtonWrapper
          src="../../assets/images/icons8-candy-50.png"
          label="Select coordinates"
          click="click"
          @someAction="setModal(true)"
        />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <TheModal v-if="modal" v-model="modal">
      <ModalHeaderContent @set-coordinates="setCoordinates" />
    </TheModal>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { QForm } from 'quasar';
import { useApiary } from '@stores/apiary-store';
import TheModal from '@components/modals/TheModal.vue';
import 'leaflet/dist/leaflet.css';
import ModalHeaderContent from '@components/modals/headersInModals/ModalHeaderContent.vue';
import InputWrapper from '@components/molecules/InputWrapper.vue';
import ButtonWrapper from '@components/organism/ButtonWrapper.vue';
import { foragesOptions, sunOptions, typeOptions } from '@constant/dataInputs';
import { provide } from 'vue';
import { Coordinates } from '@interfaces/apiary';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps<{
  apiary?: Array<any>;
  id?: string;
}>();

const router = useRouter();

const modal = ref(false);
const setModal = (open: boolean) => {
  modal.value = open;
};
provide('modal', setModal);

const apiaryStore = useApiary();

const lat = ref<number | null>(null);
const lng = ref<number | null>(null);
const country = ref<number | null>(null);
const city = ref<number | null>(null);
const zip = ref<number | null>(null);
const address = ref<number | null>(null);
const description = ref(null);
const myForm = ref<QForm | null>(null);
const name = ref(null);
const forages = ref(null);
const type = ref(null);
const sun = ref(null);
const hives = ref(null);
onMounted(() => {
  if (props.apiary) {
    lat.value = props.apiary[0].lat;
    lng.value = props.apiary[0].lng;
    hives.value = props.apiary[0].hives;
    country.value = props.apiary[0].country;
    city.value = props.apiary[0].city;
    zip.value = props.apiary[0].zip;
    address.value = props.apiary[0].address;
    name.value = props.apiary[0].name;
    forages.value = props.apiary[0].forages;
    type.value = props.apiary[0].type;
    sun.value = props.apiary[0].sun;
    description.value = props.apiary[0].description;
  }
});
const onSubmit = async () => {
  const formData = {
    lat: lat.value,
    lng: lng.value,
    hives: hives.value,
    country: country.value,
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
  const dataSended = props?.apiary
    ? await apiaryStore.updateApiaryData(formData, props.id)
    : await apiaryStore.addApiaryData(formData);

  // }
  if (dataSended) {
    router.push({
      path: `/${sessionStorage.getItem('currentLang')?.toLowerCase()}/apiaries`
    });
    onReset();
  }
};
const setCoordinates = (coordinates: Coordinates) => {
  const { lat: latitude, lng: longitude } = coordinates;
  lat.value = latitude;
  lng.value = longitude;
};
const onReset = () => {
  lat.value = null;
  lng.value = null;
  hives.value = null;
  country.value = null;
  city.value = null;
  zip.value = null;
  address.value = null;
  name.value = null;
  forages.value = null;
  type.value = null;
  sun.value = null;
  description.value = null;
};
</script>

<style scoped lang="scss">
.form-wrapper-create-apiary {
  width: 100%;
  margin-top: 20px;
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
  & .border {
    border: 1px solid #aaa;
    margin-top: 0;
    & div {
      margin: 4px 5px 5px 5px;
    }
  }
}
</style>
