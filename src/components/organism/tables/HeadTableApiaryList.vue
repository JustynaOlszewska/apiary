<template>
  <q-tr :props="props">
    <q-th v-for="col in props.cols" :key="col.name" :props="props">
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
    ></q-tr
  >
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

defineProps({
  props: Object
});
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
