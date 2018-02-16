<template>
  <div class="row">
      <div class="view-sub-menu">
          <router-link to="/profile/userinfo" class="list-group-item">User info</router-link>
          <router-link to="/profile/userpassword" class="list-group-item">User password</router-link>
      </div>
      <div>
        <router-view></router-view>  
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'Asad'
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables";

.view-sub-menu a {
  color:$primary;
}
</style>
