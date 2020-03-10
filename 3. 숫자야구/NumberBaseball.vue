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
        // 길이가 4개가 될 때까지 반복
        const randomNumber = Math.ceil(Math.random() * 9); // 1~9까지의 랜덤 값을 뽑음
        if (chosen.includes(randomNumber)) {
          // 만약 랜덤 값이 배열에 이미 있는 거면
          continue; // if문을 빠져나와 반복문 다시 실행 -> 다시 랜덤 값 뽑음
        } else {
          chosen.push(randomNumber); // 중복된 값이 아니면 배열에 값 추가
        }
      }
      console.log(chosen.join("")); // 정답 출력
      return chosen;
    },
    resetForm() {
      // 폼 리셋 함수
      this.value = "";
      this.$refs.answer.focus();
    },
    onSubmit() {
      if (this.value === this.answer.join("")) {
        // 배열을 문자열로 바꿔주고 비교
        this.tries.push({
          try: this.value,
          result: "홈런"
        });
        this.resetForm();
        this.tries = [];
        this.result = "홈런! 정답입니다!";
        this.answer = this.getAnswer(); // 정답 초기화
      } else {
        if (this.tries.length > 9) {
          this.resetForm();
          this.tries = [];
          this.result = `패배했습니다. 정답은 ${this.answer}입니다.`;
          this.answer = this.getAnswer();
          return 0;
        }
        let strike = 0;
        let ball = 0;

        for (let i = 0; i < this.value.length; i++) {
          // 값의 길이만큼 검사 반복
          if (parseInt(this.value[i]) === this.answer[i]) {
            // 문자열의 값을 하나씩 가져와서 정수로 바꾼 뒤 자리가 같은지 비교
            strike++;
          } else if (this.value.includes(this.answer[i])) {
            // 문자열 안에 해당하는 배열 값이 들어있는지 검사
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
