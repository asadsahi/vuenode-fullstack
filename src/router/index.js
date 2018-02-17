import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route-level code splitting
const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const LoginView = () => import('../views/LoginView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const ProfileView = () => import('../views/profile/ProfileView.vue');
const ProfileUserInfoView = () => import('../views/profile/ProfileUserInfoView.vue');
const ProfilePasswordView = () => import('../views/profile/ProfilePasswordView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');
// All examples
const ExamplesView = () => import('../views/examples/ExamplesView.vue');

export function createRouter() {
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
      { path: '/login', component: LoginView },
      { path: '/register', component: RegisterView },
      {
        path: '/profile',
        component: ProfileView,
        children: [
          { path: 'userinfo', component: ProfileUserInfoView },
          { path: 'userpassword', component: ProfilePasswordView }
        ]
      },
      { path: '*', component: NotFoundView }
    ]
  })
}
