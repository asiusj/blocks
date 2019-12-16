<template>
  <canvas ref="canvas" :width="block.width" :height="block.height"></canvas>
</template>

<script>
export default {
  name: "activation-bg",
  props: {
    block: Object
  },
  methods: {
    fillActivationBackground(e) {
      var ctx = e.getContext("2d");

      ctx.fillStyle = "#8c8c8c";
      ctx.rotate((20 * Math.PI) / 180);
      for (let i = 0; i < ctx.canvas.width + 100; i += 20) {
        ctx.fillRect(i, -(10 + i), 10, 200 + i);
      }
    }
  },
  mounted() {
    this.fillActivationBackground(this.$refs.canvas);
  }
};
</script>

<style>
</style>