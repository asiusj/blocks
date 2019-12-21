<template>
  <b-container fluid class="desktop-row">
    <b-row class="justify-content-center">
      <h3>ActiveTools</h3>
    </b-row>
    <b-row>
      <div class="desktop-wrap">
        <div class="desktop-container">
          <bm-console></bm-console>
          <div ref="desktop" class="desktop">
            <block v-for="(block, i) in activeBlocks" :key="i" v-bind:block="block"></block>
          </div>
        </div>
        <div class="desktop-count">Active blocks: {{activeBlocks.length}}</div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import block from "@/components/block";
import bmConsole from "@/components/block-manager-console";

export default {
  name: "desktop",
  components: {
    block,
    bmConsole
  },
  computed: {
    activeBlocks() {
      return this.$store.getters.getActiveBlocks;
    },
    desktopParams() {
      return this.$store.getters.getDesktopParams;
    },
    activationProcess() {
      return this.$store.getters.getActivationProcess;
    }
  },
  mounted() {
    this.$store.commit("setDesktop", this.$refs.desktop);
  }
};
</script>

<style scoped>
.desktop-container {
  border: 2px solid #cccccc;
  align-self: flex-end;
  z-index: 3;
  background-color: #fff;
  position: relative;
  box-sizing: content-box;
  width: 600px;
  height: 400px;
}

.desktop {
  width: 100%;
  height: 100%;
}

.desktop * {
  position: absolute;
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

.desktop-count {
  position: absolute;
  top: -14px;
  right: 10px;
  z-index: 4;
  color: #8c8c8c;
  font-size: 10px;
}

.desktop-row {
  padding-top: 30px;
  padding-bottom: 16px;
}


@media (max-width: 768px) {
  .desktop-container {
    width: 100%;
    height: 500px;
  }
}
</style>