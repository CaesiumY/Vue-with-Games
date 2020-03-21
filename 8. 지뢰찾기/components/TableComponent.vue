<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td
        v-for="(cellData, cellIndex) in rowData"
        :key="cellIndex"
        :style="computedCellStyle(rowIndex, cellIndex)"
      >
        {{ computedCellData(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
import { CODE } from "../store";
export default {
  computed: {
    ...mapState(["tableData"]),
    computedCellStyle(row, cell) {
      return (row, cell) => {
        switch (this.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            return { background: "#636e72" };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return { background: "#ffeaa7" };
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return { background: "#ff7675" };
          case CODE.OPENED:
          case CODE.CLICKED_MINE:
            return { background: "white" };

          default:
            break;
        }
      };
    },
    computedCellData(row, cell) {
      return (row, cell) => {
        switch (this.tableData[row][cell]) {
          case CODE.NORMAL:
            return "";
          case CODE.MINE:
            return "X";
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return "?";
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return "!";
          case CODE.CLICKED_MINE:
            return "펑";

          default:
            break;
        }
      };
    }
  }
};
</script>

<style scoped></style>
