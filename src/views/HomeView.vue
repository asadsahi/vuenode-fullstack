<template>
  <div class="row">
    <div class="column">
      <h1>{{ appData.content.app_title }}</h1> 
      {{ appData.content.app_description }}
      <br>
      <div>
        <router-link 
          to="about" 
          class="button button-outline float-right">More info</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['appData'])
  }
};
</script>
