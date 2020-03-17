<template>
  <div>
    <div>현재 {{ nowTurn }}님의 턴입니다.</div>
    <table>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td
          v-for="(cellData, cellIndex) in rowData"
          :key="cellIndex"
          @click="onClickCell(rowIndex, cellIndex)"
        >
          {{ cellData }}
        </td>
      </tr>
    </table>

    <div v-if="winner">{{ winner }}님의 승리입니다!</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store, {
  SET_CELLDATA,
  RESET_DATA,
  SET_WINNER,
  SET_DRAW,
  CHANGE_TURN
} from "./store";

export default {
  store,

  computed: {
    ...mapState(["tableData", "nowTurn", "winner"])
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // nowTurn() {
    //   return this.$store.state.nowTurn;
    // },
    // winner() {
    //   return this.$store.state.winner;
    // }
  },
  methods: {
    onClickCell(rowIndex, cellIndex) {
      if (this.tableData[rowIndex][cellIndex]) return;

      this.$store.commit(SET_CELLDATA, {
        row: rowIndex,
        cell: cellIndex
      });

      let win = false;
      if (
        this.tableData[rowIndex][0] === this.nowTurn &&
        this.tableData[rowIndex][1] === this.nowTurn &&
        this.tableData[rowIndex][2] === this.nowTurn
      ) {
        win = true;
      }
      if (
        this.tableData[0][cellIndex] === this.nowTurn &&
        this.tableData[1][cellIndex] === this.nowTurn &&
        this.tableData[2][cellIndex] === this.nowTurn
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

<style>
table {
  border-collapse: collapse;
}

td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>
