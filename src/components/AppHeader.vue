<template>
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~public/images/favicon-32x32.png" alt="logo">
        </router-link>
        <router-link to="/">Home</router-link>
        <router-link :to="{ name: 'category', params: { id: 'front-end' } }">Front-end</router-link>
        <router-link :to="{ name: 'category', params: { id: 'mobile' } }">Mobile</router-link>
        <router-link v-if="isAuthenticated" to="/profile">{{user.username}}</router-link>
        <a v-if="isAuthenticated" v-on:click="logout()">Logout</a>
        <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
        <a class="github" href="https://github.com/asadsahi/vuenode-fullstack" target="_blank" rel="noopener">
          Vue Node Fullstack
        </a>
      </nav>
    </header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    toggle() {
      this.isOpen = !this.isOpen;
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user'])
  },
  data() {
    return {
      isOpen: false
    };
  }
};
</script>
