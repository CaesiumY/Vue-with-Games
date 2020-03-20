<template>
  <div>
    <mine-form />
    <div>{{ timer }}</div>
    <table-component />
    <div>{{ result }}</div>
  </div>
</template>

<script>
import MineForm from "./components/MineForm";
import TableComponent from "./components/TableComponent";
import store from "./store";
import { mapState } from "vuex";

export default {
  store,
  components: {
    MineForm,
    TableComponent
  },
  computed: {
    ...mapState(["timer", "result"])
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
