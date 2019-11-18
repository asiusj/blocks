<template>
  <div
    class="block-item"
    v-bind:style="{
      width: block.width + 'px',
      height: block.height + 'px'
      }"
  ></div>
</template>

<script>
import Block from "@/models/block";

export default {
  name: "block",
  props: {
    block: Block
  }
};
</script>

<style scoped>
.block-item {
  background-color: #f0f0f0;
  border: 1px solid #8c8c8c;
  display: block;
  margin:5px;
  touch-action: none;
  user-select: none;
}
</style>