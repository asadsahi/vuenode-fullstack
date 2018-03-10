<template>
  <div>
    <button 
      id="show-modal" 
      @click="showModal = true">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <app-modal 
      v-if="showModal" 
      @close="showModal = false">
      <h3 slot="header">custom header</h3>
    </app-modal>
  </div>
</template>
<script>
import ModalComponent from './ModalComponent.vue';
export default {
  components: {
    'app-modal': ModalComponent
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>
