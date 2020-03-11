<template>
  <div>
    <div id="screen" :class="state[selectedState]" @click="onClick">
      {{ message }}
    </div>
    <div>
      <div>평균시간 {{}}</div>
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
      message: "클릭해서 시작하세요."
    };
  },
  methods: {
    onReset() {},
    onClick() {
      this.selectedState = (this.selectedState + 1) % 3;
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
