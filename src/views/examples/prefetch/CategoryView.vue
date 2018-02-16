<template>
  <div class="card-deck">
    <div class="card"
    v-for="post in posts"
    v-bind:key="post.id">
      <app-post-card :post="post">
      </app-post-card>
    </div>
  </div>
</template>
<script>
import PostCard from './PostCard.vue';
import { mapGetters } from 'vuex';
const fetchInitialData = (store, route) => {
  let categoryId = 2;
  if (route.params.id === 'mobile') {
    categoryId = 11;
  }
  return store.dispatch('postsModule/updateCategory', categoryId);
};
export default {
  asyncData({ store, route }) {
    return fetchInitialData(store, route);
  },
  components: {
    'app-post-card': PostCard
  },
  computed: {
    ...mapGetters('postsModule', ['posts'])
  },
  methods: {
    loadPosts() {
      fetchInitialData(this.$store, this.$route);
    }
  },
  watch: {
    $route(to, from) {
      this.loadPosts();
    }
  },
  created() {
    this.loadPosts();
  }
};
</script>
