<template>
  <div>
    <h5>{{ $t('chartTitle') }}</h5>
    <p>//{{ dataChart }}</p>
    <p>//{{ options }}</p>
    <div style="width: 80%">
      <Bar :data="dataChart" :options="options" v-if="loaded" />
    </div>
    <!-- <Line :data="data" /> -->
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { data, options } from '../components/chartData';
import { useApiary } from '../stores/apiary-store';
const apiaryStore = useApiary();
const { dataChart } = toRefs(apiaryStore);
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale
);
const loaded = ref(true);
onMounted(() => {
  loaded.value = true;
});
// export default {
//   name: 'App',
//   components: {
//     Line
//   },
//   data() {
//     return { data, options };
//   }
// };
</script>

<style scoped></style>
