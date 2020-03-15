<template>
  <div>
    <div>로또 생성기</div>

    <div id="lottoBall">
      <lotto-ball v-for="ball in balls" :key="ball" :number="ball"></lotto-ball>
    </div>

    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="re" @click="onClickRestart">한 번 더!</button>
  </div>
</template>

<script>
import LottoBall from "./components/LottoBall";

const timeouts = [];

export default {
  components: {
    LottoBall
  },
  data() {
    return {
      ballList: this.getRandomLotto(),
      balls: [],
      bonus: null,
      re: false
    };
  },
  methods: {
    getRandomLotto() {
      const nums = [];
      for (let i = 0; nums.length < 7; i++) {
        const randomNum = Math.ceil(Math.random() * 45);
        if (!nums.includes(randomNum)) {
          nums.push(randomNum);
        }
      }
      return nums;
    },
    onClickRestart() {
      this.ballList = this.getRandomLotto();
      this.balls = [];
      this.bonus = null;
      this.re = false;

      this.showLottoBalls();
    },
    showLottoBalls() {
      for (let i = 0; i < this.ballList.length - 1; i++) {
        timeouts[i] = setTimeout(() => {
          this.balls.push(this.ballList[i]);
        }, (i + 1) * 1000);
      }

      timeouts[this.ballList.length - 1] = setTimeout(() => {
        this.bonus = this.ballList[this.ballList.length - 1];
        this.re = true;
      }, this.ballList.length * 1000);
    }
  },
  mounted() {
    this.showLottoBalls();
  },
  beforeDestroy() {
    timeouts.forEach(item => {
      clearTimeout(item);
    });
  }
};
</script>

<style scoped></style>
