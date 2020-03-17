<template>
  <div>
    <div>현재 {{ nowTurn }}님의 턴입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }}님의 승리입니다!</div>
  </div>
</template>

<script>
import TableComponent from "./components/TableComponent";

export default {
  components: {
    TableComponent
  },
  data() {
    return {};
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
