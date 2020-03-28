<template>
  <div v-if="id === 'number-baseball'">
    <number-baseball></number-baseball>
  </div>
  <div v-else-if="id === 'response-check'">
    <response-check></response-check>
  </div>
  <div v-else-if="id === 'lotto'">
    <lotto></lotto>
  </div>
  <div v-else-if="id === 'mine-sweeper'">
    <mine-sweeper></mine-sweeper>
  </div>
  <div v-else>
    게임을 선택해주세요
  </div>
</template>

<script>
import NumberBaseball from "../../3. 숫자야구/NumberBaseball";
import responseCheck from "../../4. 반응속도체크/ResponseCheck";
import lotto from "../../6. 로또/LottoGenerator";
import mineSweeper from "../../8. 지뢰찾기/MineSweeper";

export default {
  props: {
    id: {
      type: String
    }
  },
  components: {
    NumberBaseball,
    responseCheck,
    lotto,
    mineSweeper
  },
  mounted() {
    console.log("mounted -> this.$route", this.$route);

    console.log("mounted -> this", this);
  }
};
</script>

<style scoped></style>
