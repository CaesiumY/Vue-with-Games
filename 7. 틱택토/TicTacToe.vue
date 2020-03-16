<template>
  <div>
    <table-component :table-data="tableData"></table-component>
    <div>현재 {{ nowTurn }}님의 턴입니다.</div>
  </div>
</template>

<script>
import TableComponent from "./components/TableComponent";
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
      nowTurn: "O"
    };
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
