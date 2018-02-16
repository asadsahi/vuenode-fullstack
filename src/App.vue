<template>
  <div id="app">
    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter
  }
};
</script>
<style lang="scss">
  @import "./styles/index";
</style>
