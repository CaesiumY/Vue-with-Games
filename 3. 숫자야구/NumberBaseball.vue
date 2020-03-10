<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="value" minlength="4" maxlength="4" ref="answer" />
      <button type="submit">입력</button>
    </form>
    <div>시도 {{ tries.length }}회</div>
    <ul>
      <li v-for="item in tries" :key="item.id">
        <div>{{ item.try }}</div>
        <div>{{ item.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: this.getAnswer(),
      value: "",
      tries: [],
      result: ""
    };
  },
  methods: {
    getAnswer() {
      const chosen = [];
      for (let i = 0; chosen.length < 4; i++) {
        const randomNumber = Math.ceil(Math.random() * 9);
        if (chosen.includes(randomNumber)) {
          continue;
        } else {
          chosen.push(randomNumber);
        }
      }
      console.log(chosen.join(""));
      return chosen;
    },
    resetForm() {
      this.value = "";
      this.$refs.answer.focus();
    },
    onSubmit() {
      if (this.value === this.answer.join("")) {
        this.tries.push({
          try: this.value,
          result: "홈런"
        });
        this.resetForm();
        this.tries = [];
        this.result = "홈런! 정답입니다!";
        this.answer = this.getAnswer();
      } else {
        if (this.tries.length > 9) {
          this.resetForm();
          this.tries = [];
          this.result = `패배했습니다. 정답은 ${this.answer}입니다.`;
          this.answer = this.getAnswer();
        }
        let strike = 0;
        let ball = 0;

        for (let i = 0; i < this.value.length; i++) {
          if (parseInt(this.value[i]) === this.answer[i]) {
            strike++;
          } else if (this.value.includes(this.answer[i])) {
            ball++;
          }
        }

        this.tries.push({
          try: this.value,
          result: `${strike} 스트라이크, ${ball} 볼입니다.`
        });
        this.resetForm();
      }
    }
  }
};
</script>

<style scoped></style>
