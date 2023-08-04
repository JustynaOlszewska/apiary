import axios from 'axios';
import { defineStore } from 'pinia';
// import { DataChart, InitChart } from '../interfaces/apiary';
// import { i18n } from '../boot/i18n';
import { setToken } from '../utils/setToken';
interface State {
  counter: number;
  errorLogin: boolean;
  isAuthenticated: boolean;
}
export const useAuth = defineStore('auth', {
  state: (): State => ({
    counter: 0,
    errorLogin: false,
    isAuthenticated: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async LoginUser(dataUser) {
      // const user = JSON.stringify({
      //   email: 'pp6@wp.pl',
      //   password: 'pierwszeprobne'
      // });
      const config = { headers: { 'content-type': 'application/json' } };

      try {
        const data = await axios.post(
          'http://localhost:5000/api/apiary/auth',
          dataUser,
          config
        );
        if (data) {
          console.log('datalogin', data, dataUser);
          this.errorLogin = false;
          this.isAuthenticated = true;
          sessionStorage.setItem('token', data.data.token);
          if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
          }
          // sessionStorage.setItem('token', data);
        }
      } catch (error) {
        console.log('errorlogin', error);
        this.errorLogin = true;
        this.isAuthenticated = false;
      }
    },
    async registerUser(newUser) {
      // const newUser = JSON.stringify({
      //   name: 'Przemysław O',
      //   email: 'adam@wp.pl',
      //   password: 'password'
      // });
      const config = { headers: { 'content-type': 'application/json' } };
      try {
        const data = await axios.post(
          'http://localhost:5000/api/apiary/users',
          JSON.stringify(newUser),
          config
        );
        if (data) {
          this.isAuthenticated = true;
          console.log('data', data.data.token);
          sessionStorage.setItem('token', data.data.token);
          if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'));
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    async loadData() {
      try {
        const data = await axios.get('http://localhost:5000/api/apiary/apiary');
        if (data) {
          console.log('data', data);
          // this.setAllDataApiary(data.apiary);
          // this.dataApiary = data.data;
          // localStorage.setItem('dataApiary', data.data);

          // this.dataApiary && this.setChartApiary(this.dataApiary);
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
    //   // this.dataChart.datasets[0].label = i18n.t('countBeehives');
    //   this.dataChart.datasets[0].label = 'Liczba uli';

    //   this.dataChart.datasets[0].backgroundColor = '#f87979';
    //   this.dataChart.datasets[0].data = sum;

    //   console.log(data);
    // }
  }
});
