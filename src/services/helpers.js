import { decode } from './jwt-decode';
import { ACCESS_TOKEN } from '../constants';
import { sessionService } from '../services';

const isBrowser = typeof window !== 'undefined';

const parseQueryString = () => {
  const str = window.location.search;
  const objURL = {};

  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
    objURL[$1] = $3;
  });
  return objURL;
};

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export { isBrowser, parseQueryString, guid };
