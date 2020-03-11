<template>
  <div>
    <div id="screen" :class="state"></div>
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
      state: "waiting"
    };
  },
  methods: {
    onReset() {}
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
