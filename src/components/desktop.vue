<template>
  <b-container fluid>
    <h3>ActiveTools</h3>
    <div class="desktop-wrap">
      <div
        class="desktop"
        v-bind:style="{
      width: desktopParams.width + 'px',
      height: desktopParams.height + 'px'
      }"
      >
      <block v-for="(block, i) in activeBlocks" :key="i" v-bind:block="block"></block>
      </div>
      <div
        class="phantom-desktop"
        @mouseup="activateBlock()"
        v-if="activationProcess.status"
        v-bind:style="{
      width: desktopParams.width + 'px',
      height: desktopParams.height + 'px'
      }"
      ></div>
    </div>
  </b-container>
</template>

<script>
import store from "@/plugins/store";
import block from "@/components/block";

export default {
  name: "desktop",
  components: {
    block
  },
  computed: {
    activeBlocks() {
      return store.getters.getActiveBlocks;
    },
    desktopParams() {
      return store.getters.getDesktopParams;
    },
    activationProcess() {
      return store.getters.getActivationProcess;
    }
  },
  methods: {
    activateBlock() {
      if (this.activationProcess.status) {
        var id = `b${this.activationProcess.block.width}${this.activationProcess.block.height}${this.activationProcess.block.count}`;
        store.dispatch("activateBlock", {...this.activationProcess.block, id})
      }
    }
  }
};
</script>

<style scoped>
.desktop {
  border: 2px solid #cccccc;
  align-self: flex-end;
  z-index: 3;
  background-color: #fff;
}
.desktop-wrap {
  max-width: 1000px;
  padding: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  position: relative;
}
.phantom-desktop {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
}
</style>