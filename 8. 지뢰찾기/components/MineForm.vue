<template>
  <div>
    <input
      type="number"
      placeholder="가로"
      :value="col"
      @change="onChangeCol"
    />
    <input
      type="number"
      placeholder="세로"
      :value="row"
      @change="onChangeRow"
    />
    <input
      type="number"
      placeholder="지뢰"
      :value="mine"
      @change="onChangeMine"
    />
    <button @click="onClickStart">시작</button>
  </div>
</template>

<script>
import { START_GAME } from "../store";
export default {
  data() {
    return {
      row: 10,
      col: 10,
      mine: 20
    };
  },
  methods: {
    onClickStart() {
      this.$emit.commit(START_GAME, {
        row: this.row,
        col: this.col,
        mine: this.mine
      });
    },
    onChangeCol(e) {
      this.Col = e.target.value;
    },
    onChangeRow(e) {
      this.row = e.target.value;
    },
    onChangeMine(e) {
      this.Mine = e.target.value;
    }
  }
};
</script>

<style scoped></style>
