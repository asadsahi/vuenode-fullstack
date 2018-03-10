<template>
  <div class="row">
    <div class="column">
      <h2>Login</h2>
      <div 
        v-if="error"
        class="error">
        {{ error }}
      </div>
      <form 
        novalidate
        @submit="login">
        <fieldset>
          <label for="usernameoremail">Username or Email</label>
          <input 
            v-validate="'required'"
            id="usernameoremail" 
            v-model="usernameOrEmail" 
            type="email" 
            name="usernameoremail" >
          <div v-show="errors.has('usernameoremail')">{{ errors.first('usernameoremail') }}</div>
          <label for="password">Password</label>
          <input 
            v-validate="'required'"
            id="password" 
            v-model="password" 
            type="password" 
            name="password">
          <div v-show="errors.has('password')">{{ errors.first('password') }}</div>
          <button>
            Login
          </button>
        </fieldset>      
      </form>
      <app-social-login/>
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
      this.$validator.validateAll().then(result => {
        console.log(result);
        if (result) {
          this.$store.dispatch('login', {
            usernameOrEmail: this.usernameOrEmail,
            password: this.password
          });
        }
      });
    }
  }
};
</script>
