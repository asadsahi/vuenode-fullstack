import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router';
import { dataService, decode } from '../services';
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
      error: ''
    },
    getters: {
      isAuthenticated: state => {
        return state.isAuthenticated;
      },
      user: state => {
        return state.user;
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
          window.localStorage.setItem('token', null);
          router.push('/');
        }
        state.isAuthenticated = false;
      },
      login(state, token) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('token', token);
          router.push('/');
        }
        state.isAuthenticated = true;
        state.user = decode(token);
      }
    }
  });
}

export const store = createStore();
