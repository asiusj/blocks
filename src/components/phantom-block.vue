<template>
  <div
    ref="phantomBlock"
    class="phantom-block"
    v-bind:style="{
      width: block.width + 'px',
      height: block.height + 'px',
      top: top,
      left: left
    }"
    @mouseup="activationDispatch($event)"
  >
    <span>{{block.width + ' x ' + block.height}}</span>
    <svg-lines v-bind:width="block.width" v-bind:height="block.height"></svg-lines>
  </div>
</template>

<script>
import store from "@/plugins/store";
import svgLines from "@/components/svg-lines";
// import block from "@/components/block";
import MoveThis from "@/move-this";

export default {
  name: "phantom-block",
  props: {
    block: Object
  },
  components: {
    svgLines
  },
  mounted() {
    this.moveThis = new MoveThis(
      this.$refs.phantomBlock,
      this.activationProcess.block.width,
      this.activationProcess.block.height
    );
  },
  data() {
    return {
      moveThis: null
    };
  },
  computed: {
    activationProcess() {
      return store.getters.getActivationProcess;
    },
    desktopParams() {
      return store.getters.getDesktopParams;
    },
    left() {
      if (this.activationProcess.status) {
        let pos = this.activationProcess.position;
        let block = this.activationProcess.block;
        return pos.x - block.width / 2 + "px";
      } else {
        return 0;
      }
    },
    top() {
      if (this.activationProcess.status) {
        let pos = this.activationProcess.position;
        let block = this.activationProcess.block;
        return pos.y - block.height / 2 + "px";
      } else {
        return 0;
      }
    }
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
        this.moveThis.cancelListener();
        this.moveThis.cancelTouchListener();
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

        store.dispatch("setActivationStatus", {
          status: true,
          block,
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
    }
  },
  destroyed() {
    this.moveThis.cancelListener();
    this.moveThis.cancelTouchListener();
  }
};
</script>

<style scoped>
.phantom-block {
  position: absolute;
  z-index: 5;
  cursor: grab;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #8c8c8c;
}
.phantom-block-activating {
  opacity: 1;
  cursor: grabbing;
}
.phantom-block-activation-started {
  position: fixed;
}

.phantom-block svg {
  position: absolute;
  top: 0;
  left: 0;
}
</style>