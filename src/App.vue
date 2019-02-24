<template>
  <div id="app" class="container">
    <AppHeader />
    <main class="main">
      <Transition name="fade" mode="out-in">
        <router-view class="view" />
      </Transition>
    </main>
    <AppFooter />
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
<style lang="scss">
@import './styles/index';
</style>
