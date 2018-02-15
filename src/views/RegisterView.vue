<template>
  <div class="form-wrapper">
    <h2>Register</h2>
    <div class="error" v-if="error">
      {{error}}
    </div>
    <form v-on:submit="register" novaliate>
      <div class="form-control">
        <label for="username">Username</label>
        <input type="text" id="username"  v-model="username">
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email"  v-model="email">
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password"  v-model="password">
      </div>
      <div class="form-control">
        <label for="firstname">First name</label>
        <input type="text" id="firstname"  v-model="firstName">
      </div>
      <div class="form-control">
        <label for="lastname">Last name</label>
        <input type="text" id="lastname"  v-model="lastName">
      </div>
      <div class="form-control">
        <button class="btn btn-primary">
          Register
        </button>
      </div>
    </form>
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
