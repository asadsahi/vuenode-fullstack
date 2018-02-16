<template>
  <div>
    <div class="card-header">
      {{post.title.rendered}}
    </div>
    <div class="card-body">
      <span class="card-text" v-html="post.excerpt.rendered"></span>
    </div>
    <div class="card-footer">
      <a :href="post.rest_api_enabler.Link" target="_blank">Read More</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['post']
};
</script>
<style scoped>
.card {
  min-height: 40%;
}
</style>

