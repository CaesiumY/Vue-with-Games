<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <div v-if="canAnswer">
      <button @click="onClick('rock')">바위</button>
      <button @click="onClick('scissor')">가위</button>
      <button @click="onClick('paper')">보</button>
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

const scores = {
  rock: 1,
  scissor: 0,
  paper: -1
};

const comChoice = imgCoord => {
  return Object.entries(coordList).find(v => {
    return v[1] === imgCoord;
  })[0];
};

let interval = null;

export default {
  data() {
    return {
      imgCoord: coordList.rock,
      result: "",
      score: 0,
      selected: 0,
      canAnswer: true
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
      };
    }
  },
  methods: {
    changeHandState() {
      interval = setInterval(() => {
        this.selected = (this.selected + 1) % Object.keys(coordList).length;
        this.imgCoord = Object.values(coordList)[this.selected];
      }, 100);
      this.canAnswer = true;
    },
    onClick(state) {
      clearInterval(interval);
      const myState = scores[state];
      const comState = scores[comChoice(this.imgCoord)];

      const diff = myState - comState;

      if (diff === 0) {
        this.result = "draw";
      } else if ([1, -2].includes(diff)) {
        this.result = "win";
        this.score += 1;
      } else {
        this.result = "lose";
        this.score -= 1;
      }

      this.canAnswer = false;
      if (this.score >= 10) {
        this.result = "Champion!";
      }

      setTimeout(() => {
        this.changeHandState();
      }, 2000);
    }
  },
  mounted() {
    this.changeHandState();
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
