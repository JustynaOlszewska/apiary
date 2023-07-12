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
          flat
          bordered
          ref="tableRef"
          tabindex="0"
          :title="t('apiares')"
          :rows="dataApiary?.rows"
          :columns="dataApiary?.columns"
          :filter="filter"
          row-key="name"
          v-model:selected="selected"
          v-model:pagination="pagination"
        >
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
          </template>
        </q-table>
      </div>
    </div>
    <ChartApriaries />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue';
import { useApiary } from '../stores/apiary-store';
import ChartApriaries from '../components/ChartApriaries.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const apiaryStore = useApiary();
const { dataApiary } = toRefs(apiaryStore);
const filter = ref('');

const tableRef = ref(null);

// const navigationActive = ref(false);
onMounted(() => {
  const data = localStorage.getItem('dataApiary');
  apiaryStore.setAllDataApiary(JSON.parse(data));
});
const pagination = ref({});
const selected = ref([]);
</script>

<style scoped></style>
