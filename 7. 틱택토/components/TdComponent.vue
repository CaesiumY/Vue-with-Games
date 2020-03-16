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
      const rootData = this.$root.$data;
      this.$set(
        rootData.tableData[this.rowIndex],
        this.cellIndex,
        rootData.nowTurn
      ); // $set(object, key, value)
      rootData.nowTurn = rootData.nowTurn === "O" ? "X" : "O";
      console.log(rootData);
    }
  }
};
</script>

<style scoped></style>
