<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td
        v-for="(cellData, cellIndex) in rowData"
        :key="cellIndex"
        :style="computedCellStyle(rowIndex, cellIndex)"
        @click="onClickCell(rowIndex, cellIndex)"
        @contextmenu.prevent="onRightClickCell(rowIndex, cellIndex)"
      >
        {{ computedCellData(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { CODE } from "../store";
export default {
  computed: {
    ...mapState(["tableData", "isPlaying"]),
    computedCellStyle() {
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
            return this.tableData[row][cell] || "";
            break;
        }
      };
    }
  },
  methods: {
    ...mapMutations([
      "OPEN_CELL",
      "FLAG_CELL",
      "QUESTION_CELL",
      "NOMALIZE_CELL",
      "CLICK_MINE"
    ]),
    onClickCell(row, cell) {
      if (!this.isPlaying) {
        return;
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
          return this.OPEN_CELL({ row, cell });

        case CODE.MINE:
          return this.CLICK_MINE({ row, cell });

        default:
          return;
      }
    },
    onRightClickCell(row, cell) {
      if (!this.isPlaying) {
        return;
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
        case CODE.MINE:
          this.FLAG_CELL({ row, cell });
          break;

        case CODE.FLAG:
        case CODE.FLAG_MINE:
          this.QUESTION_CELL({ row, cell });
          break;

        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          this.NOMALIZE_CELL({ row, cell });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped></style>
