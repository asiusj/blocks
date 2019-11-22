<template>
  <div
    class="block-item"
    @mousedown="block.type ? false: activateBlock(block, $event)"
    @mouseleave="abortActivation()"
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
  </div>
</template>

<script>
import store from "@/plugins/store";
import svgLines from "@/components/svg-lines";

export default {
  name: "block",
  components: {
    svgLines
  },
  props: {
    block: Object,
    phantom: Boolean
  },
  computed: {
    activationStatus() {
      return store.getters.getActivationProcess.status;
    }
  },
  data() {
    return {
      timer: null
    };
  },
  methods: {
    activateBlock(block, e) {
      if (e.button) return;
      this.timer = setTimeout(() => {
        store.dispatch("setActivationStatus", {
          status: true,
          block: { ...block, type: this.$vnode.key },
          position: { x: e.clientX, y: e.clientY }
        });
      }, 1000);
    },
    abortActivation() {
      clearTimeout(this.timer);
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
</style>