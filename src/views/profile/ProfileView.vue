<template>
  <div class="row">
      <div class="col-md-1">
          <div class="list-group flex-column small">
              <router-link to="/profile/userinfo" class="list-group-item">User info</router-link>
              <router-link to="/profile/userpassword" class="list-group-item">User password</router-link>
          </div>
      </div>
      <div class="col-md-11">
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
.small {
  font-size: 0.8rem;
  a {
    padding: 0;
  }
}
</style>
