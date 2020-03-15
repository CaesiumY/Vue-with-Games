<template>
  <div class="ball" :style="lottoBallStyle">{{ number }}</div>
</template>

<script>
export default {
  props: {
    number: Number
  },
  computed: {
    lottoBallStyle() {
      let background;
      if (this.number <= 10) {
        background = "#ff7675";
      } else if (this.number <= 20) {
        background = "#ffeaa7";
      } else if (this.number <= 30) {
        background = "#81ecec";
      } else if (this.number <= 40) {
        background = "#74b9ff";
      } else {
        background = "#a29bfe";
      }

      return { background };
    }
  }
};
</script>

<style scoped>
.ball {
  display: inline-block;
  border: 1px solid #000;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-left: 20px;
}
</style>
