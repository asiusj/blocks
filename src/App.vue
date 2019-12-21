<template>
  <div
    id="app"
    @mouseleave="stopActivation()"
    @touchcancel="stopActivation()"
    @mousemove="!activationProcess.status ? false : moveThis(phantomObject, $event, activationProcess.block.width, activationProcess.block.height)"
  >
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
import phantomBlock from "@/components/phantom-block";
import useMove from "@/composition/move-this";
import useActivation from "@/composition/activation";
import store from "@/plugins/store";
import { computed } from "@vue/composition-api";

export default {
  name: "app",
  components: {
    tools,
    desktop,
    overlay,
    phantomBlock
  },
  setup() {
    const { moveThis: moveThis } = useMove();
    const phantomObject = computed(() => {
      return store.getters.getPhantomObject;
    });
    const {
      stopActivation,
      activationProcess
    } = useActivation();
    return { moveThis, stopActivation, activationProcess, phantomObject };
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

@media(max-width: 768px) {
  #app {
    padding: 0 16px;
  }
}
</style>
