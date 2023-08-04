// import { api } from '@/axios/axios';
import { Response } from '@/interfaces/shared';
import axios from 'axios';

export const postAsync = async <T>(params: {
  url: string;
  payload: T;
  setStatus: (status: {
    key: keyof Response;
    value: Response[keyof Response];
  }) => void;
}) => {
  params.setStatus({ key: 'pending', value: true });

  try {
    const response = await api.post(params.url, params.payload);

    params.setStatus({ key: 'pending', value: false });
    params.setStatus({ key: 'error', value: { value: false, message: '' } });
    params.setStatus({ key: 'success', value: true });

    return response.data.data;
  } catch (e: any) {
    params.setStatus({ key: 'pending', value: false });
    if (e.response) {
      // handle router
      // if (e.response.status === 401) {
      //     const entryUrl = (router as any).history.current.query.entryUrl;
      //     router.push({
      //         path: '/login',
      //         query: {entryUrl},
      //     });
      // }
      if (e.response.data.error) {
        if (
          e.response.data.error.hasOwnProperty('errors') &&
          e.response.data.error.errors
        ) {
          params.setStatus({
            key: 'error',
            value: { value: true, message: e.response.data.error.errors }
          });
        } else {
          params.setStatus({
            key: 'error',
            value: { value: true, message: e.response.data.error.message }
          });
        }
      } else if (e.response.data.data?.msg) {
        params.setStatus({
          key: 'error',
          value: { value: true, message: e.response.data.data.message }
        });
      }
    }
    return e.response?.data;
  }
};

export const getAsync = async (params: {
  url: string;
  setStatus: (status: {
    key: keyof Response;
    value: Response[keyof Response];
  }) => void;
  config: any;
}) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL
  });
  console.log('qqqqqqqqqqqqqqqqqqqqqqqqqq', api)
  params.setStatus({ key: 'pending', value: true });

  try {
    const response = await api.get(params.url, params.config);
    console.log('data', response);

    params.setStatus({ key: 'pending', value: false });
    params.setStatus({ key: 'error', value: { value: false, message: '' } });
    params.setStatus({ key: 'success', value: true });

    return response.data;
  } catch (e: any) {
    params.setStatus({ key: 'pending', value: false });
    if (e.response) {
      // handle router
      // if (e.response.status === 401) {
      //     const entryUrl = (router as any).history.current.query.entryUrl;
      //     router.push({
      //         path: '/login',
      //         query: {entryUrl},
      //     });
      // }
      if (e.response.data.error) {
        if (
          e.response.data.error.hasOwnProperty('errors') &&
          e.response.data.error.errors
        ) {
          params.setStatus({
            key: 'error',
            value: { value: true, message: e.response.data.error.errors }
          });
        } else {
          params.setStatus({
            key: 'error',
            value: { value: true, message: e.response.data.error.message }
          });
        }
      } else if (e.response.data.message) {
        params.setStatus({
          key: 'error',
          value: { value: true, message: e.response.data.message }
        });
      } else if (e.response.data.data?.msg) {
        params.setStatus({
          key: 'error',
          value: { value: true, message: e.response.data.data.message }
        });
      }
    }
    return e.response?.data;
  }
};

export const putAsync = async <T>(params: {
  url: string;
  payload: T;
  setStatus: (status: {
    key: keyof Response;
    value: Response[keyof Response];
  }) => void;
}) => {
  params.setStatus({ key: 'pending', value: true });

  try {
    const response = await api.put(params.url, params.payload);

    params.setStatus({ key: 'pending', value: false });
    params.setStatus({ key: 'error', value: { value: false, message: '' } });
    params.setStatus({ key: 'success', value: true });

    return response.data.data;
  } catch (e: any) {
    params.setStatus({ key: 'pending', value: false });
    if (e.response) {
      // handle router
      // if (e.response.status === 401) {
      //     const entryUrl = (router as any).history.current.query.entryUrl;
      //     router.push({
      //         path: '/login',
      //         query: {entryUrl},
      //     });
      // }
      if (e.response.data.error) {
        if (
          e.response.data.error.hasOwnProperty('errors') &&
          e.response.data.error.errors
        ) {
          params.setStatus({
            key: 'error',
            value: { value: true, message: e.response.data.error.errors }
          });
        } else {
          params.setStatus({
            key: 'error',
            value: { value: true, message: e.response.data.error.message }
          });
        }
      } else if (e.response.data.data?.msg) {
        params.setStatus({
          key: 'error',
          value: { value: true, message: e.response.data.data.message }
        });
      }
    }

    return e.response.data;
  }
};

export const deleteAsync = async <T>(params: {
  url: string;
  payload: T;
  setStatus: (status: {
    key: keyof Response;
    value: Response[keyof Response];
  }) => void;
}) => {
  params.setStatus({ key: 'pending', value: true });

  try {
    const response = await api.delete(params.url, {
      data: { ...params.payload }
    });

    params.setStatus({ key: 'pending', value: false });
    params.setStatus({ key: 'error', value: { value: false, message: '' } });
    params.setStatus({ key: 'success', value: true });

    return response.data.data;
  } catch (e: any) {
    params.setStatus({ key: 'pending', value: false });
    if (e.response) {
      // handle router
      // if (e.response.status === 401) {
      //     const entryUrl = (router as any).history.current.query.entryUrl;
      //     router.push({
      //         path: '/login',
      //         query: {entryUrl},
      //     });
      // }
      if (e.response.data.error) {
        if (
          e.response.data.error.hasOwnProperty('errors') &&
          e.response.data.error.errors
        ) {
          params.setStatus({
            key: 'error',
            value: { value: true, message: e.response.data.error.errors }
          });
        } else {
          params.setStatus({
            key: 'error',
            value: { value: true, message: e.response.data.error.message }
          });
        }
      } else if (e.response.data.data?.msg) {
        params.setStatus({
          key: 'error',
          value: { value: true, message: e.response.data.data.message }
        });
      }
    }
    return e.response.data;
  }
};