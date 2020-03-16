<template>
  <div>
    <table-component :table-data="tableData"></table-component>
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
      ]
    };
  }
};
</script>

<style scoped></style>
