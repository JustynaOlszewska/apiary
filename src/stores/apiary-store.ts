import { defineStore } from 'pinia';
import { DataChart } from '../interfaces/apiary';

import { getAsync, postAsync, deleteAsync, putAsync } from '../asyncAxios';
import { i18n } from '../boot/i18n';
import { ApiaryData } from '@interfaces/apiary';
interface State {
  counter: number;
  dataApiary: ApiaryData[] | null;
  dataChart: DataChart;
  status: any;
  loading: boolean;
  essentialLinks: Array<{
    title: string;
    // caption: string;
    icon: string;
    link: string;
    route: string;
  }>;
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
          data: null,
        },
      ],
    },
    status: {
      error: {
        value: false,
        message: '',
      },
      success: false,
      pending: false,
    },
    loading: false,
    essentialLinks: [
      {
        title: 'Apiaries',
        // caption: 'quasar.dev',
        icon: 'signpost',
        link: '/pl/apiaries',
        route: 'apiaries',
      },
      {
        title: 'Calendar',
        // caption: 'quasar.dev',
        icon: 'event',
        link: '/pl/calendar',
        route: 'calendar',
      },
      {
        title: 'Beehives',
        // caption: 'github.com/quasarframework',
        icon: 'inventory_2',
        link: '/pl/beehives',
        route: 'beehives',
      },
      {
        title: 'Login',
        // caption: 'github.com/quasarframework',
        icon: 'inventory_2',
        link: '/pl/login',
        route: 'login',
      },
      {
        title: 'Register',
        // caption: 'github.com/quasarframework',
        icon: 'inventory_2',
        link: '/pl/register',

        route: 'register',
      },
    ],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setCurrentRoute(actualPage: string) {
      sessionStorage.setItem('curentRoute', actualPage);
    },
    setCurrentLang(lang: string) {
      sessionStorage.setItem('currentLang', lang);
    },
    setStatus(newStatus: { key: keyof Response; value: any }) {
      this.status[newStatus.key] = newStatus.value;
    },
    async removeApiary(id: string) {
      const token = sessionStorage.getItem('token');

      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      if (sessionStorage.getItem('token')) {
        try {
          this.loading = true;
          const r = await deleteAsync({
            url: `http://localhost:5000/api/apiary/rows/${id}`,
            // payload: id,
            setStatus: this.setStatus,
            config,
          });

          if (r) {
            console.log('toke', r);
            // this.setAllDataApiary(data);
            this.getInitApiaryData();
            this.loading = false;
          }
        } catch (error) {
          this.loading = false;

          console.log('error', error);
        }
      }
    },
    async getInitApiaryData() {
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      if (sessionStorage.getItem('token')) {
        try {
          // this.loading = true;
          const data = await getAsync({
            url: 'http://localhost:5000/api/apiary/rows',
            setStatus: this.setStatus,
            config,
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
          'rrrrrrrrrrrrrrrrrrrr',
          i18n?.global?.locale?.value,
          i18n.global.locale?.value,
          sessionStorage.getItem('currentLang')
        );
        this.router.push({
          path: `/${sessionStorage
            .getItem('currentLang')
            ?.toLowerCase()}/login`,
        });
      }
    },
    async addApiaryData(data) {
      const token = sessionStorage.getItem('token');

      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      // const data = {
      //   name: 'Testowy rzszerzony',
      //   id: 12,
      //   address: 'Kadyny',
      //   type: 'Warszawskie poszerzane',
      //   sun: 3.9,
      //   hives: 327,
      //   forages: 'colza',
      //   description: 'Opis najważnijszych cech pasieki',
      //   zip: '82-300',
      //   city: 'Słupsk',
      //   state: 'Warmińsko-mazurskie',
      //   country: 'Polska',
      //   latitude: '123456',
      //   longitude: '12345'
      // };
      if (sessionStorage.getItem('token')) {
        try {
          this.loading = true;
          const r = await postAsync({
            url: 'http://localhost:5000/api/apiary/rows',
            payload: data,
            setStatus: this.setStatus,
            config,
          });
          console.log('toke', r);

          if (r) {
            // this.setAllDataApiary(data);
            this.loading = false;
          }
        } catch (error) {
          this.loading = false;

          console.log('error', error);
        }
      }
      return true;
    },
    async updateApiaryData(data, id) {
      const token = sessionStorage.getItem('token');

      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      if (sessionStorage.getItem('token')) {
        try {
          this.loading = true;
          const r = await putAsync({
            url: `http://localhost:5000/api/apiary/rows/${id}`,
            payload: data,
            setStatus: this.setStatus,
            config,
          });
          console.log('toke', r);

          if (r) {
            // this.setAllDataApiary(data);
            this.loading = false;
          }
        } catch (error) {
          this.loading = false;

          console.log('error', error);
        }
      }
      return true;
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
      sessionStorage.setItem('dataApiary', JSON.stringify(data));
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
      console.log('zzzzzzzzzzzzzzzz2', this.dataChart.labels);

      // this.dataChart.datasets[0].label = i18n.t('countBeehives');
      this.dataChart.datasets[0].label = 'Liczba uli';

      this.dataChart.datasets[0].backgroundColor = '#f87979';
      this.dataChart.datasets[0].data = sum;

      console.log(data);
    },
  },
});
