<template>
  <!-- <div
    id="app"
    @mouseleave="stopActivation()"
    @mouseup="stopActivation()"
    @touchend="stopActivation()"
    @touchcancel="stopActivation()"
  >-->
  <div id="app" @mouseleave="stopActivation()" @touchcancel="stopActivation()">
    <tools></tools>
    <desktop></desktop>
    <overlay></overlay>
    <phantom-block v-if="activationProcess.status" v-bind:block="activationProcess.block"></phantom-block>
  </div>
</template>

<script>
import tools from "@/components/tools";
import desktop from "@/components/desktop";
import overlay from "@/components/overlay";
import store from "@/plugins/store";
import phantomBlock from "@/components/phantom-block";

export default {
  name: "app",
  components: {
    tools,
    desktop,
    overlay,
    phantomBlock
  },
  computed: {
    activationProcess() {
      return store.getters.getActivationProcess;
    }
  },
  methods: {
    stopActivation() {
      if (this.activationProcess.status)
        store.dispatch("setActivationStatus", {
          status: false,
          block: null,
          position: { x: null, y: null }
        });
    }
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
