<template>
  <div class="wrapper-tasks-btn">
    <ButtonWrapper
      src="../../assets/images/icons8-calendar-50.png"
      label="Calendar"
      background="none"
      flat
      click="click"
      color="#00000"
      @someAction="tab = CalendarApiariesPlans"
      :class="[tab === CalendarApiariesPlans && 'underlining-btn']"
    />
    <ButtonWrapper
      src="../../assets/images/icons8-tasks-24.png"
      label="Tasks"
      flat
      color="#00000"
      background="none"
      click="click"
      @someAction="tab = TasksApiaries"
      :class="[tab === TasksApiaries && 'underlining-btn']"
    />
  </div>
  <KeepAlive> <component :is="tab" /></KeepAlive>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import CalendarApiariesPlans from '@components/templates/CalendarApiariesPlans.vue';
import TasksApiaries from '@components/templates/TasksApiaries.vue';
import ButtonWrapper from '@components/organism/ButtonWrapper.vue';

const tab = shallowRef(CalendarApiariesPlans);
</script>

<style scoped lang="scss">
.wrapper-tasks-btn {
  display: flex;
  justify-content: center;
}
.underlining-btn {
  border-bottom: 2px solid #ffb74d;
}
</style>
