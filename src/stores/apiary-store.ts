import axios, { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { DataChart, InitChart } from '../interfaces/apiary';
import { i18n } from '../boot/i18n';

interface State {
  counter: number;
  dataApiary: null;
  dataChart: DataChart;
}
export const useApiary = defineStore('apiary', {
  state: (): State => ({
    counter: 0,
    dataApiary: null,
    dataChart: {
      labels: null,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: null
        }
      ]
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async getInitApiaryData() {
      try {
        const data = await axios.get('http://localhost:3000/apiary');
        if (data) {
          this.setAllDataApiary(data.data);
          // this.dataApiary = data.data;
          // localStorage.setItem('dataApiary', data.data);

          // this.dataApiary && this.setChartApiary(this.dataApiary);
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    setAllDataApiary(data) {
      this.dataApiary = data;
      this.setChartApiary(data);
      localStorage.setItem('dataApiary', JSON.stringify(data));
    },
    setChartApiary(data: Pick<InitChart, 'rows'>) {
      const uniqueRowsChart = [...new Set(data.rows.map((el) => el.type))];

      const array = new Array(uniqueRowsChart.length).fill(0);
      const sum = data.rows.reduce(
        (accumulator: Array<number>, currentValue) => {
          return uniqueRowsChart.map((el, i) => {
            if (el === currentValue.type) {
              return accumulator[i] + currentValue.hives;
            } else {
              return accumulator[i];
            }
          });
        },
        array
      );
      console.log('zzzzzzzzzzzzzzzz', sum);

      this.dataChart.labels = uniqueRowsChart;
      // this.dataChart.datasets[0].label = i18n.t('countBehives');
      this.dataChart.datasets[0].label = 'Liczba uli';

      this.dataChart.datasets[0].backgroundColor = '#f87979';
      this.dataChart.datasets[0].data = sum;

      console.log(data);
    }
  }
});
