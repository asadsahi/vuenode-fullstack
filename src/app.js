import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import { router } from './router';
import { createValidation } from './forms';
import { sync } from 'vuex-router-sync';
import titleMixin from './util/title';
import * as filters from './util/filters';

// mixin for handling title
Vue.mixin(titleMixin);
// plugins
createValidation();

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  // Initial check for user being logged in or not
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', event => {
      // Post logout redirect logic*-+9/
      const { AuthService } = require('./services/auth.service');
      var authService = new AuthService();
      store.state.authService = authService;
      if (window.location.href.indexOf('?postLogout=true') > 0) {
        authService.signoutRedirectCallback().then(() => {
          // clear the query string
          router.push('/');
        });
      }

      store.state.authService.userManager.getUser().then(user => {
        if (user) {
          store.state.isLoggedIn = !!user;
          store.state.user = user;
        }
      });
    });
  }

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store };
}
