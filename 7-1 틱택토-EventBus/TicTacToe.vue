<template>
  <div>
    <div>현재 {{ nowTurn }}님의 턴입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }}님의 승리입니다!</div>
  </div>
</template>

<script>
import TableComponent from "./components/TableComponent";
import eventBus from "./eventBus";

export default {
  components: {
    TableComponent
  },
  data() {
    return {
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      nowTurn: "O",
      winner: ""
    };
  },
  created() {
    eventBus.$on("clickTd", this.onClickTd);
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
    onClickTd(rowIndex, cellIndex) {
      this.$set(this.tableData[rowIndex], cellIndex, this.nowTurn); // $set(object, key, value)

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
        this.resetData(this.nowTurn);
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
          this.resetData();
        } else {
          this.nowTurn = this.nowTurn === "O" ? "X" : "O";
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
