<template>
  <td @click="onClickCell">
    {{ cellData }}
  </td>
</template>

<script>
import {
  SET_CELLDATA,
  RESET_DATA,
  SET_WINNER,
  SET_DRAW,
  CHANGE_TURN
} from "../store";

export default {
  props: {
    cellIndex: Number,
    rowIndex: Number
  },
  computed: {
    cellData() {
      return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    },
    nowTurn() {
      return this.$store.state.nowTurn;
    },
    tableData() {
      return this.$store.state.tableData;
    }
  },
  methods: {
    onClickCell() {
      if (!!this.cellData) return;

      this.$store.commit(SET_CELLDATA, {
        row: this.rowIndex,
        cell: this.cellIndex
      });

      let win = false;
      if (
        this.tableData[this.rowIndex][0] === this.nowTurn &&
        this.tableData[this.rowIndex][1] === this.nowTurn &&
        this.tableData[this.rowIndex][2] === this.nowTurn
      ) {
        win = true;
      }
      if (
        this.tableData[0][this.cellIndex] === this.nowTurn &&
        this.tableData[1][this.cellIndex] === this.nowTurn &&
        this.tableData[2][this.cellIndex] === this.nowTurn
      ) {
        win = true;
      }
      if (
        this.tableData[0][0] === this.nowTurn &&
        this.tableData[1][1] === this.nowTurn &&
        this.tableData[2][2] === this.nowTurn
      ) {
        win = true;
      }
      if (
        this.tableData[0][2] === this.nowTurn &&
        this.tableData[1][1] === this.nowTurn &&
        this.tableData[2][0] === this.nowTurn
      ) {
        win = true;
      }

      if (win) {
        this.$store.commit(SET_WINNER, this.nowTurn);
        this.$store.commit(RESET_DATA);
      } else {
        // lose or draw
        let all = true;

        this.tableData.forEach(row => {
          row.forEach(cell => {
            if (!cell) {
              all = false;
            }
          });
        });

        if (all) {
          this.$store.commit(SET_DRAW);
          this.$store.commit(RESET_DATA);
        } else {
          this.$store.commit(CHANGE_TURN);
        }
      }
    }
  }
};
</script>

<style scoped></style>
