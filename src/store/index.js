import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router';
import { dataService, decode, sessionService, isBrowser } from '../services';
import { ACCESS_TOKEN } from '../constants';
import postsModule from './posts';

Vue.use(Vuex);

function createStore() {
  return new Vuex.Store({
    modules: {
      postsModule
    },
    state: {
      isAuthenticated: false,
      user: null,
      error: '',
      appData: isBrowser && window.__PRELOADEDSTATE__
    },
    getters: {
      isAuthenticated: state => {
        return state.isAuthenticated;
      },
      user: state => {
        return state.user;
      },
      appData: state => {
        return state.appData;
      },
      error: state => {
        return state.error;
      }
    },
    actions: {
      logout(context) {
        context.commit('logout');
      },
      login(context, credentials) {
        return dataService
          .post('api/auth/signin', credentials)
          .then(res => {
            context.commit('login', res.data);
            return res.data;
          })
          .catch(err => {
            context.state.error = err.response.data
              ? err.response.data[0]
              : 'Login error';
          });
      },
      register(context, data) {
        return dataService
          .post('api/auth/signup', data)
          .then(res => {
            return res.data;
          })
          .catch(err => {
            context.state.error = err.response.data
              ? err.response.data[0]
              : 'Login error';
          });
      }
    },
    mutations: {
      logout(state) {
        if (typeof window !== 'undefined') {
          sessionService.clear();
          router.push('/');
        }
        state.isAuthenticated = false;
      },
      login(state, token) {
        if (typeof window !== 'undefined') {
          sessionService.set(ACCESS_TOKEN, token);
          router.push('/');
        }
        state.isAuthenticated = true;
        state.user = decode(token);
      }
    }
  });
}

export const store = createStore();
