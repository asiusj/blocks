<template>
  <div
    ref="phantomBlock"
    v-bind:style="{
        left: left, top: top
        }"
    class="phantom-block"
  >
    <block v-bind:block="activationProcess.block" v-bind:phantom="true"></block>
  </div>
</template>

<script>
import store from "@/plugins/store";
import block from "@/components/block";
import MoveThis from "@/move-this";

export default {
  name: "phantom-block",
  components: {
    block
  },
  data() {
    return {
      moveThis: null
    };
  },
  computed: {
    activationProcess() {
      return store.getters.getActivationProcess;
    },
    left() {
      let pos = this.activationProcess.position;
      let block = this.activationProcess.block;
      return pos.x - block.width / 2 + "px";
    },
    top() {
      let pos = this.activationProcess.position;
      let block = this.activationProcess.block;
      return pos.y - block.height / 2 + "px";
    }
  },
  mounted() {
    this.moveThis = new MoveThis(
      this.$refs.phantomBlock,
      this.activationProcess.block.width,
      this.activationProcess.block.height
    );
  },
  methods: {

  },
  destroyed() {
    this.moveThis.cancelListener();
  }
};
</script>

<style scoped>
.phantom-block {
  position: absolute;
  margin: -5px;
  z-index: 3;
  cursor: grabbing;
}
</style>