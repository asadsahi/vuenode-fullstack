import axios from 'axios';
import { sessionService } from './session.service';
import { ACCESS_TOKEN } from '../constants';

// https://github.com/axios/axios

const instance = axios.create({});

axios.interceptors.request.use(config => {
  if (typeof window === 'undefined') {
    return config;
  }
  const token = sessionService.get(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const get = url => instance.get(url);
const post = (url, data) => instance.post(url, data);
const put = (url, data) => instance.put(url, data);
const del = url => instance.delete(url);

const dataService = {
  get,
  post,
  put,
  delete: del
};

export { dataService };
