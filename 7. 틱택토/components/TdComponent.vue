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
    resetData(win) {
      const rootData = this.$root.$data;
      rootData.winner = win || "";
      rootData.nowTurn = "O";
      rootData.tableData = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
    },
    onClickCell() {
      if (!!this.cellData) return;

      const rootData = this.$root.$data;

      this.$set(
        rootData.tableData[this.rowIndex],
        this.cellIndex,
        rootData.nowTurn
      ); // $set(object, key, value)

      let win = false;
      if (
        rootData.tableData[this.rowIndex][0] === rootData.nowTurn &&
        rootData.tableData[this.rowIndex][1] === rootData.nowTurn &&
        rootData.tableData[this.rowIndex][2] === rootData.nowTurn
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][this.cellIndex] === rootData.nowTurn &&
        rootData.tableData[1][this.cellIndex] === rootData.nowTurn &&
        rootData.tableData[2][this.cellIndex] === rootData.nowTurn
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][0] === rootData.nowTurn &&
        rootData.tableData[1][1] === rootData.nowTurn &&
        rootData.tableData[2][2] === rootData.nowTurn
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][2] === rootData.nowTurn &&
        rootData.tableData[1][1] === rootData.nowTurn &&
        rootData.tableData[2][0] === rootData.nowTurn
      ) {
        win = true;
      }

      if (win) {
        this.resetData(rootData.nowTurn);
      } else {
        // lose or draw
        let all = true;

        rootData.tableData.forEach(row => {
          row.forEach(cell => {
            if (!cell) {
              all = false;
            }
          });
        });

        if (all) {
          this.resetData();
        } else {
          rootData.nowTurn = rootData.nowTurn === "O" ? "X" : "O";
        }
        console.log(all);
      }

      //   console.log(rootData);
    }
  }
};
</script>

<style scoped></style>
