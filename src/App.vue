<template>
  <div id="app">
    <tools></tools>
  </div>
</template>

<script>
import tools from "@/components/tools"

export default {
  name: "app",
  components: {
    tools
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
