<template>
<div>
  <button v-for="provider in providers" @click="login(provider)">{{provider}}</button>
</div>
</template>
<script>
export default {
  data() {
    return {
      providers: ['google', 'facebook']
    }
  },
  methods: {
    login(provider) {
      window.location.href = `api/auth/${provider}`;
    }
  }
};
</script>
<style lang="scss">
button.fa {
  padding: 20px;
  font-size: 30px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;

  &:hover {
    opacity: 0.7;
  }

  &.fa-facebook {
    background: #3b5998;
    color: white;
  }

  &.fa-google {
    background: #dd4b39;
    color: white;
  }

  &.fa-linkedin {
    background: #007bb5;
    color: white;
  }

  &.fa-github {
    background: #000000;
    color: white;
  }

  &.fa-windows {
    background: #2672ec;
    color: white;
  }

  &.fa-paypal {
    background: #0079c1;
    color: white;
  }

  &.fa-yahoo {
    background: #4c16c0;
    color: white;
  }

  &.fa-stack-exchange {
    background: #1f5296;
    color: white;
  }

  &.fa-amazon {
    background: #f5d993;
    color: white;
  }

  &.active {
    border: 5px solid #b4dab4;
  }
}
</style>
