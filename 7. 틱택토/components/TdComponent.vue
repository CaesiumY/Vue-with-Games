<template>
  <td @click="onClickCell">
    {{ cellData }}
  </td>
</template>

<script>
export default {
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number
  },
  methods: {
    onClickCell() {
      this.$root.$data.nowTurn = this.$root.$data.nowTurn === "O" ? "X" : "O";
      console.log(this.$root.$data.nowTurn);
    }
  }
};
</script>

<style scoped></style>
