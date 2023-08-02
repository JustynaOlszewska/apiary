import axios from 'axios';
export const setToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    axios.defaults.headers.common['x-auth-token'];
  }
};
