<template>
  <td @click="onClickCell">
    {{ cellData }}
  </td>
</template>

<script>
import eventBus from "../eventBus";
export default {
  props: {
    cellData: String,
    cellIndex: Number,
    rowIndex: Number
  },
  methods: {
    onClickCell() {
      if (!!this.cellData) return;
      eventBus.$emit("clickTd", this.rowIndex, this.cellIndex);
    }
  }
};
</script>

<style scoped></style>
