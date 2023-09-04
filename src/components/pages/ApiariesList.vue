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
        <p>//{{ apiaryStore.status.pending }}</p>
        <q-table
          :visible-columns="[
            'desc',
            'name',
            'address',
            'type',
            'sun exposure',
            'hives'
          ]"
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
            <q-inner-loading
              :showing="apiaryStore.status.pending"
              color="primary"
            />
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
            <router-link :to="`/${i18n.locale.value}/apiaries/create`"
              ><q-btn label="Create"
            /></router-link>
            <q-btn label="Refresh" @click="apiaryStore.getInitApiaryData" />
            <q-btn label="Remove" @click="showRemoveAndEditIcon" />
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
              <q-slide-transition
                v-show="permissionShowRemoveAndEditIcon"
                :duration="1000"
              >
                <q-th
                  auto-width
                  style="overflow: hidden; position: relative"
                  class="display-el display"
                  id="wrapper-column"
                  ><p class="hiding-el transform" id="actions-column">
                    Actions
                  </p></q-th
                >
              </q-slide-transition>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
              <q-slide-transition
                id="slide-transition"
                v-show="permissionShowRemoveAndEditIcon"
                :duration="1000"
              >
                <q-td
                  auto-width
                  class="visibility-el visibility actions-row display display-el wrapper-row"
                >
                  <ButtonWrapper
                    src="../../assets/images/icons8-delete-24.png"
                    :flat="true"
                    background="none"
                    color="#000000"
                    margin="0"
                    @click="apiaryStore.removeApiary(props.row._id)"
                  />
                  <ButtonWrapper
                    src="../../assets/images/icons8-pencil-48.png"
                    :flat="true"
                    background="none"
                    color="#000000"
                    margin="0"
                  />
                </q-td>
              </q-slide-transition>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <ChartApriaries />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, computed } from 'vue';
import { useApiary } from '@stores/apiary-store';
import ChartApriaries from '@components/ChartApriaries.vue';
import ButtonWrapper from '@components/organism/ButtonWrapper.vue';
import { apiary } from '@constant/dataForm';
import { cloneDeep } from 'lodash';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
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
  if (sessionStorage.getItem('dataApiary')) {
    // apiaryStore.dataApiary = JSON.parse(sessionStorage.getItem('dataApiary'));
    apiaryStore.setAllDataApiary(
      JSON.parse(sessionStorage.getItem('dataApiary'))
    );
    // apiaryStore.setChartApiary(
    //   JSON.parse(sessionStorage.getItem('chartApiary'))
    // );
  }

  selectDataApiary();
});
const resetSelectedData = () => {
  preperedDataApiary.value = dataApiary.value;
  selectApiary.value = null;
  // selectDataApiary(null);
};
// const inputRef = ref<Element | null>(null);

const permissionShowRemoveAndEditIcon = ref(false);
const showRemoveAndEditIcon = () => {
  const actionsRow = document.querySelectorAll('.actions-row');
  const wrapperRow = document.querySelectorAll('.wrapper-row');
  const wrapperColumn = document.getElementById('wrapper-column');
  const actionsColumn = document.getElementById('actions-column');
  // if (permissionShowRemoveAndEditIcon.value)
  //   actionsColumn?.classList.toggle('smooth-hiding');
  actionsColumn?.classList.toggle('smooth-hiding');

  actionsRow.forEach((el) => {
    el.classList.toggle('smooth-visibility');
  });

  // wrapperColumn?.classList.toggle('smooth-display');
  // wrapperRow.forEach((el) => {
  //   el.classList.toggle('smooth-display');
  // });

  setTimeout(() => {
    permissionShowRemoveAndEditIcon.value =
      !permissionShowRemoveAndEditIcon.value;
    console.log(
      'qqqqqqqqqqqqqqqqqqqqqqqqsss',
      permissionShowRemoveAndEditIcon.value
    );
  }, 1500);
};
const covertedDataApiaryForSelect = computed(() => {
  const preperedDataApiary = cloneDeep(dataApiary.value).map((apiary) => {
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

<style scoped>
.hiding-el {
  transform: translateX(100%);
  background-color: red;
}
.smooth-hiding {
  transform: translateX(0);
  background-color: green;
}
.transform {
  transition: all 2s ease;
  /* transition-delay: 1s; */
}
.visibility-el {
  visibility: hidden;
}
.smooth-visibility {
  visibility: visible;
}
.visibility {
  transition: all 0.3s ease;
  transition-delay: 1s;
}
/* .display-el { */
/* opacity: 0; */
/* background-color: red; */
/* transform: scale(0); */
/* display: none; */
/* } */
/* .smooth-display { */
/* opacity: 1; */
/* background-color: green; */
/* transform: scale(1); */
/* display: block; */
/* } */
/* .display {
  transition: all 0.2s ease;
  transition-delay: 2s;
} */
</style>
