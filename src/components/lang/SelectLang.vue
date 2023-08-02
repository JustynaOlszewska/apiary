<template>
  <q-toolbar-title @click="onFocusInput">
    <div class="row">
      <q-select
        v-model="model"
        :options="options"
        color="teal"
        negative
        options-selected-class="text-deep-orange"
        :input-style="{ color: 'white' }"
        class="col-2 row tx-white"
        :class="[backgroundColorInInput ? 'bg-brown' : 'closed-options']"
      >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            ref="dropdownVisible"
            :isOptionDisabled="() => false"
            v-if="!scope.opt.hide"
          >
            <q-item-section avatar>
              <q-icon>
                <img :src="scope.opt.icon" alt="flags" />
              </q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </q-toolbar-title>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { options } from '../../constant/dataForm';
import { ModelValueLang } from '../../interfaces/form';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useApiary } from '../../stores/apiary-store';
const apiaryStore = useApiary();

const i18n = useI18n();
const router = useRouter();
const backgroundColorInInput = ref<boolean>(false);
const dropdownVisible = ref<HTMLElement | null>(null);

const lang = computed(() => {
  const currentLang = sessionStorage.getItem('currentLang');
  // return currentLang || i18n.locale.value;
  return currentLang;
});
const defaultLang = computed(() => {
  return options.find((el) => el.value === lang.value);
});
const model = ref<ModelValueLang | undefined>(defaultLang.value);

const onFocusInput = () => {
  backgroundColorInInput.value = !backgroundColorInInput.value;
};
onMounted(() => {
  options?.forEach((el) => {
    if (el.value === router.currentRoute.value.params.lang) {
      el.hide = true;
    } else {
      el.hide = false;
    }
  });
  if (i18n.locale) {
    const currentLang = sessionStorage.getItem('currentLang');
    // i18n.locale.value = currentLang || router.currentRoute.value.params.lang;

    i18n.locale.value = currentLang;
  }
});
watch(
  () => model.value as ModelValueLang,
  (newValue: ModelValueLang) => {
    if (newValue) {
      options.forEach((el) => {
        if (el.value === newValue.value) {
          el.hide = true;
        } else {
          el.hide = false;
        }
      });
      i18n.locale.value = newValue.value;
      apiaryStore.setCurrentLang(newValue.value);
      router.replace({ params: { lang: newValue.value } });
      backgroundColorInInput.value = false;
    }
  }
);
</script>

<style scoped>
.closed-options {
  background-color: goldenrod;
}
</style>
