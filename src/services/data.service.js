import axios from 'axios';

axios.interceptors.request.use(
  config =>
    /* eslint-disable */
    new Promise((resolve) => {
      const { AuthService } = require('./auth.service');
      new AuthService().userManager.getUser().then(user => {
        config.headers.Authorization = user && !user.expired && `${user.token_type} ${user.access_token}`;
        resolve(config);
      });
    }), (err) => Promise.reject(err)
);

const get = (url) => axios.get(url);
const post = (url, data) => axios.post(url, data);
const put = (url, data) => axios.put(url, data);
const del = (url) => axios.delete(url);

const dataService = {
  get,
  post,
  put,
  delete: del
};

export { dataService };
