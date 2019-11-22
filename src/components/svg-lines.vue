<template>
  <svg v-bind:style="{
      width: width + 'px',
      height: height + 'px'
      }">
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
</template>

<script>
export default {
  name: "svg-lines",
  props: {
    width: Number,
    height: Number
  },
  computed: {
    lines() {
      let textOffset =
        this.width < 70 ? 20 : this.height < 60 ? 5 : 10;
      return [
        {
          x1: 0,
          y1: 0,
          x2:
            this.width / 2 -
            (this.width / this.height) * textOffset,
          y2: this.height / 2 - textOffset
        },
        {
          x1: 0,
          y1: this.height,
          x2:
            this.width / 2 -
            (this.width / this.height) * textOffset,
          y2: this.height / 2 + textOffset
        },
        {
          x1: this.width,
          y1: 0,
          x2:
            this.width / 2 +
            (this.width / this.height) * textOffset,
          y2: this.height / 2 - textOffset
        },
        {
          x1: this.width,
          y1: this.height,
          x2:
            this.width / 2 +
            (this.width / this.height) * textOffset,
          y2: this.height / 2 + textOffset
        }
      ];
    }
  }
};
</script>

<style>
</style>