<template>
  <div class="row">
    <div class="column">
      <h2>Register</h2>
      <div 
        v-if="error"
        class="error" >
        {{ error }}
      </div>
      <form 
        novaliate
        @submit="register">
        <label for="username">Username</label>
        <input 
          id="username" 
          v-model="username"
          type="text">
        <label for="email">Email</label>
        <input 
          id="email"
          v-model="email"
          type="email">
        <label for="password">Password</label>
        <input 
          id="password" 
          v-model="password"
          type="password">
        <label for="firstname">First name</label>
        <input 
          id="firstname" 
          v-model="firstName"
          type="text">
        <label for="lastname">Last name</label>
        <input 
          id="lastname" 
          v-model="lastName"
          type="text">
        <button class="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };
  },
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    ...mapActions({
      register: 'register'
    }),
    register(event) {
      event.preventDefault();
      this.$store
        .dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        .then(() => {
          this.$router.push('login');
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>
