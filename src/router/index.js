import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// route-level code splitting
const HomeView = () => import('../views/HomeView.vue');
const LoginView = () => import('../views/LoginView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const ProfileView = () => import('../views/profile/ProfileView.vue');
const ProfileUserInfoView = () => import('../views/profile/ProfileUserInfoView.vue');
const ProfilePasswordView = () => import('../views/profile/ProfilePasswordView.vue');
const CategoryView = () => import('../views/examples/CategoryView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: HomeView },
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
      { path: '/category/:id', name: 'category', component: CategoryView },
      { path: '*', component: NotFoundView }
    ]
  })
}
