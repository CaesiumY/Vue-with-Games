<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button>바위</button>
      <button>가위</button>
      <button>보</button>
    </div>
    <div>
      <div>{{ result }}</div>
      <div>총 {{ score }} 점</div>
    </div>
  </div>
</template>

<script>
const coordList = {
  rock: "0",
  scissor: "-141px",
  paper: "-282px"
};

let interval = null;

export default {
  data() {
    return {
      imgCoord: coordList.rock,
      result: "",
      score: 0,
      selected: 0
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
      };
    }
  },
  mounted() {
    interval = setInterval(() => {
      this.selected = (this.selected + 1) % Object.keys(coordList).length;
      this.imgCoord = Object.values(coordList)[this.selected];
    }, 100);
  },
  beforeDestroy() {
    clearInterval(interval);
  }
};
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
