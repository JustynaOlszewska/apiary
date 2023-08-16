<template>
  <div>
    <h1>{{ $t('welcome') }}</h1>
    <Transition> <div :key="$route.path">Beehives list</div></Transition>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  // background-color: red;
  // transition: background-color 0.5s ease;
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  // background-color: green;

  opacity: 0;
}
</style>
