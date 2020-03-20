<template>
  <table>
    <tr v-for="(rowData, index) in tableData" :key="index">
      <td v-for="(colData, index) in rowData" :key="index">
        {{ colData }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["tableData"])
  }
};
</script>

<style scoped></style>
