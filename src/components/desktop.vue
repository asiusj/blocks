<template>
  <b-container fluid class="desktop-wrap">
    <h3>ActiveTools</h3>
    <div
      class="desktop"
      v-bind:style="{
      width: desktopParams.width + 'px',
      height: desktopParams.height + 'px'
      }"
    ></div>
  </b-container>
</template>

<script>
import store from "@/plugins/store";

export default {
  name: "desktop",
  computed: {
    activeBlocks() {
      return store.getters.getActiveBlocks;
    },
    desktopParams() {
      return store.getters.getDesktopParams;
    }
  }
};
</script>

<style scoped>
.desktop {
  border: 2px solid #cccccc;
  align-self: flex-end;
}
.desktop-wrap {
  max-width: 1000px;
  padding: 0;
  margin-top: 24px;
  display: flex;
  flex-flow: column;
}
</style>