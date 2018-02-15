import { decode } from './jwt-decode';
import { ACCESS_TOKEN } from '../constants';

export const storeAuth = (token) => {
  window.localStorage.setItem(ACCESS_TOKEN, token);
  return decode(token);
};

export const parseQueryString = () => {
  const str = window.location.search;
  const objURL = {};

  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    objURL[$1] = $3;
  });
  return objURL;
};

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};
