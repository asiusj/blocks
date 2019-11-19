<template>
  <div id="app">
    <tools></tools>
    <desktop></desktop>
  </div>
</template>

<script>
import tools from "@/components/tools"
import desktop from "@/components/desktop"

export default {
  name: "app",
  components: {
    tools,
    desktop
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
