import axios, { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { DataChart, InitChart } from '../interfaces/apiary';
import { i18n } from '../boot/i18n';

interface State {
  counter: number;
}
export const useAuth = defineStore('auth', {
  state: (): State => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async LoginUser(dataUser) {
      // const dataa = JSON.stringify({
      //   email: 'justa@wp.pl',
      //   password: 'password'
      // });
      try {
        const data = await axios.post('http://localhost:3000/login', dataUser);
        if (data) {
          console.log('datalogin', data, dataUser);
        }
      } catch (error) {
        console.log('errorlogin', error);
      }
    },
    async registerUser(dataNewUser) {
      const dataa = JSON.stringify({
        email: 'justa@wp.pl',
        password: 'password'
      });
      try {
        const data = await axios.post(
          'http://localhost:3000/users',
          dataNewUser
        );
        if (data) {
          console.log('data', data);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    // setAllDataApiary(data) {
    //   this.dataApiary = data;
    //   this.setChartApiary(data);
    //   localStorage.setItem('dataApiary', JSON.stringify(data));
    // },
    // setChartApiary(data: Pick<InitChart, 'rows'>) {
    //   const uniqueRowsChart = [...new Set(data.rows.map((el) => el.type))];

    //   const array = new Array(uniqueRowsChart.length).fill(0);
    //   const sum = data.rows.reduce(
    //     (accumulator: Array<number>, currentValue) => {
    //       return uniqueRowsChart.map((el, i) => {
    //         if (el === currentValue.type) {
    //           return accumulator[i] + currentValue.hives;
    //         } else {
    //           return accumulator[i];
    //         }
    //       });
    //     },
    //     array
    //   );
    //   console.log('zzzzzzzzzzzzzzzz', sum);

    //   this.dataChart.labels = uniqueRowsChart;
    //   // this.dataChart.datasets[0].label = i18n.t('countBehives');
    //   this.dataChart.datasets[0].label = 'Liczba uli';

    //   this.dataChart.datasets[0].backgroundColor = '#f87979';
    //   this.dataChart.datasets[0].data = sum;

    //   console.log(data);
    // }
  }
});
