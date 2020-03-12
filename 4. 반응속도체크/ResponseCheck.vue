<template>
  <div>
    <div id="screen" :class="state[selectedState % 3]" @click="onClick">
      {{ message }}
    </div>
    <div>
      <div>평균시간 {{ avarage }}ms</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedState: 0,
      state: ["waiting", "ready", "now"],
      message: "클릭해서 시작하세요.",
      result: [],
      startTime: "",
      endTime: "",
      timeout: null
    };
  },
  computed: {
    avarage() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    }
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClick() {
      // this.selectedState = (this.selectedState + 1) % 3;

      if (this.state[this.selectedState] === "waiting") {
        this.selectedState = 1;
        this.message = "초록색이 되면 클릭하세요.";
        this.timeout = setTimeout(() => {
          this.selectedState = 2;
          this.message = "지금 클릭!";
          this.startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000);
      } else if (this.state[this.selectedState] === "ready") {
        this.selectedState = 0;
        this.message = "너무 빨랐군요!";
        clearTimeout(this.timeout);
      } else if (this.state[this.selectedState] === "now") {
        this.selectedState = 0;
        this.message = "클릭해서 시작하세요.";
        this.endTime = new Date();
        this.result.push(this.endTime - this.startTime);
      }
    }
  }
};
</script>

<style scoped>
#screen {
  width: 300px;
  height: 300px;
  text-align: center;
  user-select: none;
}

#screen.waiting {
  background-color: #74b9ff;
}

#screen.ready {
  background-color: #d63031;
  color: white;
}

#screen.now {
  background-color: #55efc4;
}
</style>
