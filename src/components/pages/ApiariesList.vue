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
    <!-- <p>//{{ selected }}</p>
    <p>//{{ pagination }}</p> -->

    <div id="q-app">
      <div class="q-pa-md">
        <q-table
          v-if="preperedDataApiary && columns"
          :loading="loading"
          flat
          bordered
          ref="tableRef"
          tabindex="0"
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
            <ButtonWrapper
              src="../../assets/images/icons8-tools-48.png"
              click="click"
              @someAction="showRemoveAndEditIcons"
              background="#EFEFEF"
            />
            <ButtonDropdown :options="optionsDropDown" @someAction="getExel" />
          </template>
          <template v-slot:top-left>
            <q-input
              square
              outlined
              dense
              debounce="300"
              v-model="filter"
              :placeholder="t('search')"
              :style="{
                width: '110px',
                margin: '10px'
              }"
              filled
            >
              <template v-slot:prepend>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
            <q-select
              use-input
              filled
              square
              outlined
              :placeholder="t('placeholder')"
              ref="refSelectApiary"
              v-model="selectApiary"
              :options="covertedDataApiaryForSelect"
              @update:model-value="(value) => selectDataApiary(value)"
              :style="{
                width: '170px',
                margin: '10px'
              }"
            />
            <ButtonWrapper
              src="../../assets/images/icons8-reset-24.png"
              click="click"
              @someAction="resetSelectedData"
            />
            <router-link :to="`/${i18n.locale.value}/apiaries/create`">
              <ButtonWrapper
                src="../../assets/images/icons8-plus-24.png"
                :label="t('create')"
              />
            </router-link>

            <ButtonWrapper
              src="../../assets/images/icons8-refresh-30.png"
              click="click"
              @someAction="apiaryStore.getInitApiaryData"
            />
          </template>
          <template v-slot:header="props">
            <!-- <q-tr :props="props"> -->
            <HeadTableApiaryList :props="props" />
            <!-- <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
              <q-th
                auto-width
                style="overflow: hidden; position: relative"
                class="display-el display"
                id="wrapper-column"
                ><p class="hiding-el transform" id="actions-column">
                  {{ t('actions') }}
                </p></q-th
              > -->
            <!-- </q-tr> -->
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <BodyTableApiaryList
                :props="props"
                :permissionshowRemoveAndEditIcons="
                  permissionshowRemoveAndEditIcons
                "
              />
              <!-- <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
              <q-td
                class="display-el display wrapper-row"
                auto-width
                :class="{ width: permissionshowRemoveAndEditIcons }"
              >
                <div class="visibility-el visibility actions-row">
                  <ButtonWrapper
                    v-if="permissionshowRemoveAndEditIcons"
                    src="../../assets/images/icons8-delete-24.png"
                    :flat="true"
                    background="none"
                    color="#000000"
                    margin="0"
                    @click="apiaryStore.removeApiary(props.row._id)"
                  />
                  <router-link
                    v-if="permissionshowRemoveAndEditIcons"
                    :to="`/${i18n.locale.value}/apiaries/${props.row._id}/edit`"
                    ><ButtonWrapper
                      v-if="permissionshowRemoveAndEditIcons"
                      src="../../assets/images/icons8-pencil-48.png"
                      :flat="true"
                      background="none"
                      color="#000000"
                      margin="0"
                  /></router-link>
                </div>
              </q-td> -->
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
    <ChartApriaries />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, computed, nextTick, watch } from 'vue';
import { useApiary } from '@stores/apiary-store';
import ChartApriaries from '@components/ChartApriaries.vue';
import ButtonWrapper from '@components/organism/ButtonWrapper.vue';
import ButtonDropdown from '@components/organism/ButtonDropdown.vue';
import { ApiaryData } from '@interfaces/apiary';
import { apiary } from '@constant/dataForm';

import BodyTableApiaryList from '@components/organism/tables/BodyTableApiaryList.vue';
import HeadTableApiaryList from '@components/organism/tables/HeadTableApiaryList.vue';
import { cloneDeep } from 'lodash';
import { useI18n } from 'vue-i18n';
import { useExelFromObject } from '../../composable/useExelFromObject';
import {
  unnecessaryKeys,
  keyToCountMaxWidth,
  optionsDropDown
} from '@constant/dataInputs';

const i18n = useI18n();
const { t } = useI18n();

const permissionshowRemoveAndEditIcons = ref(false);
const apiaryStore = useApiary();
const { loading, dataApiary } = toRefs(apiaryStore);
const { getExel } = useExelFromObject(
  unnecessaryKeys,
  keyToCountMaxWidth,
  dataApiary
);

const filter = ref('');
const tableRef = ref(null);
const selectApiary = ref(null);
const refSelectApiary = ref<HTMLInputElement | null>(null);
const columns = apiary.columns;
onMounted(() => {
  if (sessionStorage.getItem('dataApiary')) {
    apiaryStore.setAllDataApiary(
      JSON.parse(sessionStorage.getItem('dataApiary'))
    );
  }

  selectDataApiary();
});
const resetSelectedData = () => {
  preperedDataApiary.value = dataApiary.value;
  selectApiary.value = null;
};

const showRemoveAndEditIcons = async (q) => {
  if (!q) {
    permissionshowRemoveAndEditIcons.value =
      !permissionshowRemoveAndEditIcons.value;
  }
  await nextTick();
  const actionsRow = document.querySelectorAll('.actions-row');
  const wrapperRow = document.querySelectorAll('.wrapper-row');

  const wrapperColumn = document.getElementById('wrapper-column');
  const actionsColumn = document.getElementById('actions-column');

  wrapperRow.forEach((el) => {
    // el.classList.toggle('smooth-display');
    if (!q) {
      el.classList.remove('smooth-display');
    } else {
      el.classList.toggle('smooth-display');
      if (!permissionshowRemoveAndEditIcons.value) {
        console.log('pppppppppppp');
        el.classList.remove('smooth-display');

        return;
      }
    }
  });
  actionsRow.forEach((el) => {
    // if (!q) {
    if (!q) {
      el.classList.remove('smooth-display');
    } else {
      el.classList.toggle('smooth-display');
      console.log('ppppppppppppwww', permissionshowRemoveAndEditIcons.value);

      if (!permissionshowRemoveAndEditIcons.value) {
        el.classList.remove('smooth-display');

        return;
      }
      el.classList.add('smooth-visibility');
      return;
    }

    el.classList.toggle('smooth-visibility');
  });
  if (!q) {
    wrapperColumn?.classList.toggle('smooth-display');
    actionsColumn?.classList.toggle('smooth-hiding');
  }

  setTimeout(() => {
    console.log(
      'qqqqqqqqqqqqqqqqeeeeinsied',
      q,
      permissionshowRemoveAndEditIcons.value
    );

    // if (!q) {
    //   permissionshowRemoveAndEditIcons.value =
    //     !permissionshowRemoveAndEditIcons.value;
    // }
    // else if (q && permissionshowRemoveAndEditIcons.value === true) {
    //   permissionshowRemoveAndEditIcons.value = false;
    // }
  }, 1500);
};

const covertedDataApiaryForSelect = computed(() => {
  const preperedDataApiary = cloneDeep(dataApiary.value).map(
    (apiary: ApiaryData) => {
      // apiary.label = apiary.name
      return { label: apiary.name, id: apiary.id };
    }
  );

  return preperedDataApiary;
});
const pagination = ref({});
const selected = ref([]);
const preperedDataApiary = ref(null);
watch(
  () => pagination.value,
  (newValue, oldValue) => {
    // oldValue?.page &&
    showRemoveAndEditIcons('q');
  },
  { immediate: true }
);

const selectDataApiary = (chosenApiary?: any) => {
  if (!chosenApiary) {
    preperedDataApiary.value = dataApiary.value;
    return;
  }
  preperedDataApiary.value = cloneDeep(dataApiary.value).filter(
    (apiary: ApiaryData) => {
      // apiary.label = apiary.name
      return chosenApiary.id === apiary.id;
      // return { label: apiary.name, id: apiary.id };
    }
  );
  console.log('preperedDataApiary', preperedDataApiary);
};
</script>

<style scoped lang="scss">
.hiding-el {
  transform: translateX(130px);
  width: 0;
}
.smooth-hiding {
  transform: translateX(0);
  width: 120px;
}
.transform {
  transition: all 2s ease;
}
.visibility-el {
  visibility: hidden;
}
.smooth-visibility {
  visibility: visible;
}
.visibility {
  transition: all 2s ease;
  transition-delay: 2s;
}
.display-el {
  width: 0;
}
.smooth-display {
  width: 40px;
}
.display {
  transition: all 0.2s ease;
}
:deep(.q-table__card .q-table__middle) {
  height: 300px;
}
:deep(.q-table__top .q-table__control) {
  flex-wrap: nowrap;
  height: 100%;
}
:deep(.q-table__container > div:first-child) {
  background-color: lightgrey;
  height: 54px;
}
:deep(.q-table__container > div:last-child) {
  background-color: lightgrey;
}
.width {
  width: 140px;
}
</style>
