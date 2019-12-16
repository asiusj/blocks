<template>
  <div
    class="block-item"
    v-if="block.count < block.max"
    @mousedown="block.type ? false: startActivation(block, $event)"
    @touchstart="block.type ? false: startActivation(block, $event)"
    @touchend="activationDispatch($event)"
    @mouseleave="abortActivation()"
    @mouseup="abortActivation()"
    v-bind:style="{
      width: block.width + 'px',
      height: block.height + 'px',
      cursor: phantom ? 'grabing': (block.type ? 'auto': 'grab')
      }"
  >
    <span>{{block.width + ' x ' + block.height}}</span>
    <svg-lines v-bind:width="block.width" v-bind:height="block.height"></svg-lines>
    <span class="custom-badge" v-if="!phantom && !block.type">{{block.max - block.count}}</span>
    <span class="custom-badge delete-block" @click="deleteBlock(block.id)" v-if="block.type">&times;</span>
    <div class="bg-activation" v-bind:class="{ activation: activationInProcess }">
      <activation-bg v-bind:block="block"></activation-bg>
    </div>
  </div>
</template>

<script>
import store from "@/plugins/store";
import svgLines from "@/components/svg-lines";
import activationBg from "@/components/activation-bg";

export default {
  name: "block",
  components: {
    svgLines,
    activationBg
  },
  props: {
    block: Object,
    phantom: Boolean
  },
  computed: {
    activationProcess() {
      return store.getters.getActivationProcess;
    },
    desktopParams() {
      return store.getters.getDesktopParams;
    }
  },
  data() {
    return {
      timer: null,
      activationInProcess: false
    };
  },
  methods: {
    activationDispatch(e) {
      if (!this.activationProcess.status) {
        this.abortActivation();
        return;
      }
      let desktopPosition = this.desktopParams.object.getBoundingClientRect();
      let pointX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      let pointY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      if (
        pointX > desktopPosition.left &&
        pointX < this.desktopParams.object.offsetWidth + desktopPosition.left &&
        pointY > desktopPosition.top &&
        pointY < this.desktopParams.object.offsetHeight + desktopPosition.top
      ) {
        this.activateBlock();
        this.stopActivation();
        this.abortActivation();
      } else {
        this.stopActivation();
      }
    },
    activateBlock() {
      if (this.activationProcess.status) {
        var id = `b${this.activationProcess.block.width}${this.activationProcess.block.height}${this.activationProcess.block.count}`;
        store.dispatch("activateBlock", {
          ...this.activationProcess.block,
          id
        });
      }
    },
    startActivation(block, e) {
      if (e.button) return;
      this.activationInProcess = true;
      this.timer = setTimeout(() => {
        var x = e.clientX;
        var y = e.clientY;
        if (e.touches) {
          x = e.touches[e.touches.length - 1].clientX;
          y = e.touches[e.touches.length - 1].clientY;
        }
        this.activationInProcess = false;
        store.dispatch("setActivationStatus", {
          status: true,
          block: {...block, type: this.$vnode.key},
          position: { x, y }
        });
      }, 1000);
    },
    abortActivation() {
      clearTimeout(this.timer);
      this.activationInProcess = false;
    },
    stopActivation() {
      if (this.activationProcess.status)
        store.dispatch("setActivationStatus", {
          status: false,
          block: null,
          position: { x: null, y: null }
        });
    },
    deleteBlock(id) {
      store.dispatch("deleteBlock", id);
    }
  }
};
</script>

<style scoped>
.block-item {
  background-color: #f0f0f0;
  border: 1px solid #8c8c8c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  user-select: none;
  font-size: 0.8rem;
  position: relative;
  flex: 1 0 auto;
}
.block-item * {
  user-select: none;
  touch-action: none;
}

.block-item svg {
  position: absolute;
  top: 0;
  left: 0;
}
.custom-badge {
  position: absolute;
  height: 22px;
  min-width: 22px;
  border-radius: 11px;
  font-size: 14px;
  color: #ffffff;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #2d2d2d;
  justify-content: center;
  line-height: normal;
  align-items: center;
  top: 0;
  right: 0;
}
.delete-block {
  cursor: pointer;
}
.bg-activation {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%;
  opacity: 0.3;
  overflow: hidden;
  z-index: 0;
}

.activation {
  animation-duration: 1s;
  animation-name: activation;
  animation-iteration-count: initial;
}

@keyframes activation {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
</style>