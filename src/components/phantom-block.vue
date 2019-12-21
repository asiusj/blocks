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
import svgLines from "@/components/svg-lines";
import { onMounted, computed } from "@vue/composition-api";
import store from "@/plugins/store";
import useActivation from "@/composition/activation";

export default {
  name: "phantom-block",
  props: {
    block: Object
  },
  components: {
    svgLines
  },
  setup(props, context) {
    onMounted(() => {
      store.dispatch("setPhantomObject", context.refs.phantomBlock);
    });

    const {
      activationProcess: activationProcess,
      activationDispatch: activationDispatch
    } = useActivation();

    let left = computed(() => {
      if (activationProcess.value.status) {
        const pos = activationProcess.value.position;
        const block = activationProcess.value.block;
        return pos.x - block.width / 2 + "px";
      } else {
        return 0;
      }
    });

    let top = computed(() => {
      if (activationProcess.value.status) {
        const pos = activationProcess.value.position;
        const block = activationProcess.value.block;
        return pos.y - block.height / 2 + "px";
      } else {
        return 0;
      }
    });
    return { left, top, activationDispatch };
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