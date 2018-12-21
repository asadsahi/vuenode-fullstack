import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router';
import { isBrowser } from '../services';
import postsModule from './posts';

Vue.use(Vuex);

function createStore() {
  return new Vuex.Store({
    modules: {
      postsModule
    },
    state: {
      isLoggedIn: false,
      user: null,
      error: '',
      appData: isBrowser && window.__PRELOADEDSTATE__,
      authService: null
    },
    getters: {
      isLoggedIn: state => state.isLoggedIn,
      user: state => state.user,
      appData: state => state.appData,
      error: state => state.error
    },
    actions: {
      login: context => context.state.authService.login(),
      logout: context => context.state.authService.logout(),
      profile: context => context.state.authService.profile(),
      register: context => context.state.authService.register()
    },
    mutations: {
      logout(state) {
        if (typeof window !== 'undefined') {
          // sessionService.clear();
          router.push('/');
        }
        state.isLoggedIn = false;
      },
      login(state, token) {
        if (typeof window !== 'undefined') {
          // sessionService.set(ACCESS_TOKEN, token);
          router.push('/');
        }
        state.isLoggedIn = true;
        // state.user = decode(token);
      }
    }
  });
}

export const store = createStore();
