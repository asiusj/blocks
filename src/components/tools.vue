<template>
  <div>
    <h3>AvailableTools</h3>
    <b-container fluid class="tools" ref="tools">
      <div class="tools-wrap"  ref="toolsWrap">
        <block v-for="(block, i) in availableBlocks" :key="i" v-bind:block="block"></block>
      </div>
    </b-container>
  </div>
</template>

<script>

import block from "@/components/block";
import ScrollThis from "@/scroll-this";

export default {
  name: "tools",
  components: {
    block
  },
  mounted() {
    new ScrollThis(this.$refs.tools, this.$refs.toolsWrap)
  },
  computed: {
    availableBlocks() {
      return this.$store.getters.getAvailableBlocks;
    }
  }
};
</script>

<style scoped>
.tools {
  max-width: 1000px;
  height: 200px;
  max-height: 200px;
  border: 1px solid #ccc;
  padding: 0;
  display: flex;
  overflow: hidden;
  position: relative;
  user-select: none;
}
.tools-wrap {
  display: flex;
  align-items: center;
  position: absolute;
  left:0px;
  top:0px;
  touch-action: none;
  user-select: none;
}
</style>