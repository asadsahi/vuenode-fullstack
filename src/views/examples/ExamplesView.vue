<template>
<div>
    <div class="row">
        <div class="column"></div>
        <div class="column">
            <ul class="sub-nav">
                <li>
                    <router-link to="/examples/category/front-end">Front-end</router-link>
                </li>
                <li>
                    <router-link to="/examples/category/mobile">Mobile</router-link>
                </li>
                <li>
                    <router-link to="/examples/modal">Modal</router-link>
                </li>
            </ul>
        </div>
        <div class="column"></div>
    </div>
    <!-- Header -->
    <div class="row">
        <div class="column">
            <transition name="fade" mode="out-in">
                <router-view class="view"></router-view>
            </transition>
        </div>
    </div>
</div>
</template>
<script>
const CategoryView = () => import('./prefetch/CategoryView.vue');
const ModalView = () => import('./modal/ModalView.vue');
export default {
  created() {
    let { routes } = this.$router.options;
    let routeData = routes.find(r => r.path === this.$route.path);
    routeData.children = [
      { path: 'category/:id', name: 'category', component: CategoryView },
      { path: 'modal', name: 'modal', component: ModalView }
    ];
    this.$router.addRoutes([routeData]);
  }
};
</script>

