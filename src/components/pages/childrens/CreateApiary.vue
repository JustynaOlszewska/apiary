<template>
  <div class="wrapeer-create-apiary">
    <div class="create-apiary">
      <div>
        <ButtonWrapper
          type="submit"
          form="myForm"
          label="Create"
          click="click"
          @someAction="permissionToValidate = true"
        />
        <ButtonWrapper
          label="Cancel"
          click="click"
          @someAction="comeBackToApiariesList"
          :flat="true"
          background="none"
          color="#000000"
        />
      </div>
    </div>
    <q-scroll-area class="scroll-area">
      <FormWrapperCreateApiary />
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { useRouter } from 'vue-router';
import FormWrapperCreateApiary from '@components/organism/forms/FormWrapperCreateApiary.vue';
import ButtonWrapper from '@components/organism/ButtonWrapper.vue';

const router = useRouter();

const permissionToValidate = ref(false);
provide('permissionToValidate', permissionToValidate);

const comeBackToApiariesList = () => {
  router.push({
    path: `/${sessionStorage.getItem('currentLang')?.toLowerCase()}/apiaries`
  });
};

onMounted(async () => {
  // var map = L.map('map').setView([51.505, -0.09], 13);
  permissionToValidate.value = false;
  // await myForm.value?.resetValidation();
});
</script>
<style scoped lang="scss">
.wrapeer-create-apiary {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .scroll-area {
    height: 80vh;
    max-width: 300px;
  }
  & .create-apiary:not(.inner) {
    height: 52px;
    width: 100vw;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    display: flex;
    justify-content: center;
    align-items: center;
    & div:not(.inner) {
      width: 70%;
      justify-content: end;
      display: flex;
    }
  }
}
:deep(.q-scrollarea) {
  width: 63%;
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
