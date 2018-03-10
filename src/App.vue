<template>
  <div id="app">
    <app-header/>
    <div class="container">
      <transition 
        name="fade" 
        mode="out-in">
        <router-view class="view"/>
      </transition>
    </div>
    <app-footer/>
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
@import './styles/index';
</style>
