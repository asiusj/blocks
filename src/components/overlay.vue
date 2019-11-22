<template>
  <div class="overlay" v-bind:style="{'opacity': overlay ? 1 : 0, 'z-index': overlay ? 1 : -1}"></div>
</template>

<script>
import store from "@/plugins/store";

export default {
  name: "overlay",
  computed: {
    overlay() {
      return store.getters.getOverlayStatus;
    }
  }
};
</script>

<style scoped>
    .overlay {
        transition: opacity 1s;
        background-color: rgba(0,0,0, .4);
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
    }
</style>