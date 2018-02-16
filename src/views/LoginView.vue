<template>
  <div class="row">
    <div class="column">
    <h2>Login</h2>
    <div class="error" v-if="error">
      {{error}}
    </div>
    <form v-on:submit="login" novalidate>
      <fieldset>
        <label for="usernameoremail">Username or Email</label>
        <input type="email" id="usernameoremail" v-model="usernameOrEmail">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password">
        <button>
          Login
        </button>
      </fieldset>      
    </form>
      <app-social-login></app-social-login>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import AppSocialLogin from '../components/AppSocialLogin.vue';
export default {
  components: {
    'app-social-login': AppSocialLogin
  },
  data() {
    return {
      usernameOrEmail: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'error'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    login(event) {
      event.preventDefault();
      this.$store.dispatch('login', {
        usernameOrEmail: this.usernameOrEmail,
        password: this.password
      });
    }
  }
};
</script>
