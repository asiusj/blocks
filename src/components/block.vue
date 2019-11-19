<template>
  <div
    class="block-item"
    @mousedown="activateBlock(block)"
    @mouseup="stopActivation()"
    v-bind:style="{
      width: block.width + 'px',
      height: block.height + 'px'
      }"
  >
    <span>{{block.width + ' x ' + block.height}}</span>
    <svg
      v-bind:style="{
      width: block.width + 'px',
      height: block.height + 'px'
      }"
    >
      <line
        v-for="(line, i) in lines"
        :key="i"
        v-bind:x1="line.x1"
        v-bind:y1="line.y1"
        v-bind:x2="line.x2"
        v-bind:y2="line.y2"
        stroke="#8c8c8c"
      />
    </svg>
    <span class="custom-badge">{{block.max-block.count}}</span>
  </div>
</template>

<script>
import Block from "@/models/block";

export default {
  name: "block",
  props: {
    block: Block
  },
  data() {
    let textOffset =
      this.block.width < 70 ? 20 : this.block.height < 60 ? 5 : 10;
    return {
      lines: [
        {
          x1: 0,
          y1: 0,
          x2:
            this.block.width / 2 -
            (this.block.width / this.block.height) * textOffset,
          y2: this.block.height / 2 - textOffset
        },
        {
          x1: 0,
          y1: this.block.height,
          x2:
            this.block.width / 2 -
            (this.block.width / this.block.height) * textOffset,
          y2: this.block.height / 2 + textOffset
        },
        {
          x1: this.block.width,
          y1: 0,
          x2:
            this.block.width / 2 +
            (this.block.width / this.block.height) * textOffset,
          y2: this.block.height / 2 - textOffset
        },
        {
          x1: this.block.width,
          y1: this.block.height,
          x2:
            this.block.width / 2 +
            (this.block.width / this.block.height) * textOffset,
          y2: this.block.height / 2 + textOffset
        }
      ],
      timer: null
    };
  },
  methods: {
    activateBlock(block) {
      this.timer = setTimeout(() => {
        console.log(block);
      }, 1000);
    },
    stopActivation() {
      clearTimeout(this.timer)
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
</style>