<template>
  <div
    class="phantom-desktop"
    ref="phantom"
  ></div>
</template>

<script>

export default {
  name: "phantom-desktop",
};
</script>

<style scoped>

.phantom-desktop {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  cursor: grabbing;
  width: 600px;
  height: 400px;
}
</style>