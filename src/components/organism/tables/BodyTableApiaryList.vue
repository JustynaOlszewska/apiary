<template>
  <!-- <p>//{{ props }}</p> -->
  <!--  <div> -->
  <!-- <template v-slot:body="props"> -->
  <!-- <q-tr :props="props"> -->

  <q-td v-for="col in props?.cols" :key="col.name" :props="props">
    {{ col.value }}
  </q-td>
  <q-td
    class="display-el display"
    id="wrapper-row"
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
        @click="apiaryStore.removeApiary(props?.row._id)"
      />
      <router-link
        v-if="permissionshowRemoveAndEditIcons"
        :to="`/${i18n.locale.value}/apiaries/${props?.row._id}/edit`"
        ><ButtonWrapper
          v-if="permissionshowRemoveAndEditIcons"
          src="../../assets/images/icons8-pencil-48.png"
          :flat="true"
          background="none"
          color="#000000"
          margin="0"
      /></router-link>
    </div>
  </q-td>

  <!-- </q-tr> -->
  <!-- </template> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import { useApiary } from '@stores/apiary-store';
import { useI18n } from 'vue-i18n';
import ButtonWrapper from '@components/organism/ButtonWrapper.vue';

const i18n = useI18n();

const apiaryStore = useApiary();

defineProps({
  props: Object,
  permissionshowRemoveAndEditIcons: Boolean
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
// :deep(.q-table__card .q-table__middle) {
//   height: 300px;
// }
// :deep(.q-table__top .q-table__control) {
//   flex-wrap: nowrap;
//   height: 100%;
// }
// :deep(.q-table__container > div:first-child) {
//   background-color: lightgrey;
//   height: 54px;
// }
// :deep(.q-table__container > div:last-child) {
//   background-color: lightgrey;
// }
.width {
  width: 140px;
}
</style>
