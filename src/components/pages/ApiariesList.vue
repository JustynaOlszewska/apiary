<template>
  <!--
Forked from:
https://quasar.dev/vue-components/table#example--keyboard-navigation
-->
  <!-- :class="tableClass" -->
  <!-- :filter="filter" -->
  <!-- @focusin="activateNavigation"
        @focusout="deactivateNavigation"
        @keydown="onKey" -->
  <div>
    <div id="q-app">
      <div class="q-pa-md">
        <q-table
          v-if="preperedDataApiary && columns"
          :loading="loading"
          flat
          bordered
          ref="tableRef"
          tabindex="0"
          :title="t('apiares')"
          :rows="preperedDataApiary"
          :columns="columns"
          :filter="filter"
          row-key="name"
          v-model:selected="selected"
          v-model:pagination="pagination"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              :placeholder="t('search')"
            >
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>

            <q-select
              square
              outlined
              ref="refSelectApiary"
              v-model="selectApiary"
              :options="covertedDataApiaryForSelect"
              @update:model-value="(value) => selectDataApiary(value)"
              label="Square outlined"
            />
            <q-btn label="REset" @click.stop.prevent="resetSelectedData" />
          </template>
        </q-table>
      </div>
    </div>
    <ChartApriaries />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, computed } from 'vue';
import { useApiary } from '../../stores/apiary-store';
import ChartApriaries from '../ChartApriaries.vue';
import { apiary } from '../../constant/dataForm';
import { useI18n } from 'vue-i18n';
import { cloneDeep } from 'lodash';
const { t } = useI18n();

const apiaryStore = useApiary();
const { loading, dataApiary } = toRefs(apiaryStore);
const filter = ref('');
// const loading = ref(false);
const tableRef = ref(null);
const selectApiary = ref(null);
const refSelectApiary = ref<HTMLInputElement | null>(null);
const columns = apiary.columns;
// const navigationActive = ref(false);
onMounted(() => {
  // loading.value = true;
  localStorage.getItem('dataApiary');
  selectDataApiary();
  // if (data) {
  //   loading.value = false;
  // }
  // const r = { data, apiary };
  // console.log('dataApiary', r);
  // apiaryStore.setAllDataApiary(JSON.parse(r));
});
const resetSelectedData = () => {
  console.log('zzzzzzzzzzzzzzz', preperedDataApiary.value, selectApiary.value);
  preperedDataApiary.value = dataApiary.value;
  selectApiary.value = null;
  // selectDataApiary(null);
  console.log(
    'zzzzzzzzzzzzzzzAFTER',
    preperedDataApiary.value,
    selectApiary.value
  );
};
const covertedDataApiaryForSelect = computed(() => {
  const preperedDataApiary = cloneDeep(dataApiary.value)?.map((apiary) => {
    // apiary.label = apiary.name
    return { label: apiary.name, id: apiary.id };
  });

  return preperedDataApiary;
});
const pagination = ref({});
const selected = ref([]);
const preperedDataApiary = ref(null);
const selectDataApiary = (chosenApiary?: any) => {
  if (!chosenApiary) {
    preperedDataApiary.value = dataApiary.value;
    return;
  }
  preperedDataApiary.value = cloneDeep(dataApiary.value).filter((apiary) => {
    // apiary.label = apiary.name
    return chosenApiary.id === apiary.id;
    // return { label: apiary.name, id: apiary.id };
  });
  console.log('preperedDataApiary', preperedDataApiary);
};
</script>

<style scoped></style>
