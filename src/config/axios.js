import axios from 'axios';

const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest'
};

export function createAxiosWrapper({headers = {}, ...rest} = {}) {
  const compoundHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  const axiosInstance = axios.create({
    headers: compoundHeaders,
    //NOTE: For multiple environments move this to .env.<environment>
    baseURL: 'https://prueba-resuelve.herokuapp.com',
    ...rest,
  });

  return axiosInstance;
}
