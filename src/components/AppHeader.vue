<template lang="html" src="./AppHeader.html" />
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      menuOpened: false
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user', 'appData'])
  },
  methods: {
    ...mapActions({
      login: 'login',
      logout: 'logout',
      profile: 'profile'
    }),
    toggleMenu() {
      this.menuOpened = !this.menuOpened;
    }
  }
};
</script>
