import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route-level code splitting
const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');
// All examples
const ExamplesView = () => import('../views/examples/ExamplesView.vue');

function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'active',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: HomeView },
      { path: '/about', component: AboutView },
      {
        path: '/examples',
        component: ExamplesView
      },
      { path: '*', component: NotFoundView }
    ]
  });
}

export const router = createRouter();
