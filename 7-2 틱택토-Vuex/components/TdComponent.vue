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
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    cellIndex: Number,
    rowIndex: Number
  },
  computed: {
    ...mapState(["nowTurn", "tableData"]),

    cellData() {
      return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    }
  }
};
</script>

<style scoped></style>
