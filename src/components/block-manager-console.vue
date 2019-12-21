<template>
  <div class="bm-console">
    <div class="bm-console-trigger" @click="showHideConsole()">
      <svg style="width:20px;height:20px" viewBox="0 0 24 24">
        <path
          fill="#8c8c8c"
          d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z"
        />
      </svg>
      <span class="bm-console-count error">{{activationErrors.length}}</span>
    </div>
    <div class="bm-console-body" v-bind:class="showConsole ? 'show' : 'hide'">
      <div class="bm-console-message" v-for="(message, i) in activationErrors" :key="i">
        <span>BlockManager:&nbsp;</span>
        <span v-bind:class="{error: !message.success}">{{message.blockManagerMessage}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "bm-console",
  computed: {
    activationErrors() {
      return this.$store.getters.getActivationErrors;
    }
  },
  data() {
    return {
      showConsole: false
    };
  },
  methods: {
    showHideConsole() {
      this.showConsole = !this.showConsole;
    }
  }
};
</script>

<style scoped>
.bm-console {
  position: absolute;
  z-index: 6;
  color: #000;
  font-size: 12px;
  width: 100%;
}

.bm-console-body {
  transition: height 0.5s, padding 0.5s;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  padding-top: 20px;
  background: #dadada;
  opacity: 0.8;
}

.show {
  height: 200px;
}

.hide {
  height: 0px;
  padding-top: 0px;
}

.bm-console-trigger {
  cursor: pointer;
  position: absolute;
  z-index: 7;
}

.bm-console-message {
  max-width: 70%;
  text-align: left;
  padding-left: 24px;
}

.error {
  color: #fb3636;
}

.bm-console-count {
    font-size: 8px;
    position: absolute;
}
</style>