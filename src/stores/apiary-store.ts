// import axios, { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { DataChart } from '../interfaces/apiary';
// import { useI18n } from 'vue-i18n';
// import { I18n } from '../../node_modules/vue-i18n';

import { getAsync } from '../asyncAxios';
import { i18n } from '../boot/i18n';
interface State {
  counter: number;
  dataApiary: null;
  dataChart: DataChart;
  status: any;
  loading: boolean;
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
    },
    status: {
      error: {
        value: false,
        message: ''
      },
      success: false,
      pending: false
    },
    loading: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setCurrentRoute(actualPage: string) {
      sessionStorage.setItem('curentRoute', actualPage);
      // this.currentRoute = actualPage;
    },
    setCurrentLang(lang: string) {
      sessionStorage.setItem('currentLang', lang);
      // this.currentRoute = actualPage;
    },
    setStatus(newStatus: { key: keyof Response; value: any }) {
      this.status[newStatus.key] = newStatus.value;
    },
    async getInitApiaryData() {
      const token = localStorage.getItem('token');
      console.log('toke', token);
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      if (localStorage.getItem('token')) {
        try {
          // this.loading = true;
          const data = await getAsync({
            url: 'http://localhost:5000/api/apiary/rows',
            setStatus: this.setStatus,
            config
          });
          if (data) {
            this.setAllDataApiary(data);
            this.loading = false;
          }
        } catch (error) {
          this.loading = false;

          console.log('error');
        }
      } else {
        console.log(
          'qqqqqqqqqqq',
          localStorage.getItem('token'),
          i18n.global.locale?.value || i18n.locale.value
        );

        this.router.push({
          path: `/${i18n.global.locale?.value || i18n.locale.value}/login`
        });
      }
    },
    // async getListApiary() {
    //   try {
    //     const data = await axios.get('http://localhost:5000/api/apiary/rows');
    //     if (data) {
    //       console.log('data', data.apiary);
    //       this.setAllDataApiary(data.apiary);
    //       // this.dataApiary = data.data;
    //       // localStorage.setItem('dataApiary', data.data);

    //       // this.dataApiary && this.setChartApiary(this.dataApiary);
    //     }
    //   } catch (error) {
    //     console.log('error', error);
    //   }
    // },
    setAllDataApiary(data) {
      data.forEach((el, index) => {
        el.index = index + 1;
      });
      this.dataApiary = data;
      this.setChartApiary(data);
      localStorage.setItem('dataApiary', JSON.stringify(data));
    },
    // : Pick<InitChart, 'rows'>
    setChartApiary(data) {
      const uniqueRowsChart = [...new Set(data.map((el) => el.type))];
      console.log('uniqueRowsChart', uniqueRowsChart);

      const array = new Array(uniqueRowsChart.length).fill(0);
      const sum = data.reduce((accumulator: Array<number>, currentValue) => {
        return uniqueRowsChart.map((el, i) => {
          if (el === currentValue.type) {
            return accumulator[i] + currentValue.hives;
          } else {
            return accumulator[i];
          }
        });
      }, array);
      console.log('zzzzzzzzzzzzzzzz', sum);

      this.dataChart.labels = uniqueRowsChart;
      // this.dataChart.datasets[0].label = i18n.t('countBeehives');
      this.dataChart.datasets[0].label = 'Liczba uli';

      this.dataChart.datasets[0].backgroundColor = '#f87979';
      this.dataChart.datasets[0].data = sum;

      console.log(data);
    }
  }
});
