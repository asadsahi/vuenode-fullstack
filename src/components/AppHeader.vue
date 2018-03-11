<template>
  <header class="header">
    <nav class="inner">
      <router-link 
        to="/" 
        exact>
        <img 
          class="logo" 
          src="~public/images/favicon-32x32.png" 
          alt="logo">
      </router-link>
      <router-link 
        exact 
        to="/">{{ appData.content.app_nav_home }}</router-link>
      <router-link 
        exact 
        to="/about">{{ appData.content.app_nav_about }}</router-link>
      <router-link 
        exact 
        to="/examples">{{ appData.content.app_nav_examples }}</router-link>
      <router-link 
        v-if="isAuthenticated" 
        to="/profile">{{ user.username }}</router-link>
      <a 
        v-if="isAuthenticated" 
        href="javascript:void(0)"
        @click="logout()">{{ appData.content.app_nav_logout }}</a>
      <router-link 
        v-if="!isAuthenticated" 
        to="/register">{{ appData.content.app_nav_register }}</router-link>
      <router-link 
        v-if="!isAuthenticated" 
        to="/login">{{ appData.content.app_nav_login }}</router-link>
      <a 
        :href="appData.content.app_repo_url" 
        class="github" 
        target="_blank" 
        rel="noopener">
        {{ appData.content.app_title }}
      </a>
    </nav>
  </header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user', 'appData'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
