<template>
  <div>
    <mine-form />
    <div>
      <span>경과 시간: {{ timer }}</span> <span>현재 점수: {{ winScore }}</span>
    </div>
    <table-component />
    <div>{{ result }}</div>
  </div>
</template>

<script>
import MineForm from "./components/MineForm";
import TableComponent from "./components/TableComponent";
import store from "./store";
import { mapState, mapMutations } from "vuex";

let interval;

export default {
  store,
  components: {
    MineForm,
    TableComponent
  },
  computed: {
    ...mapState(["timer", "result", "isPlaying", "winScore"])
  },
  methods: {
    ...mapMutations(["INCREMENT_TIMER"])
  },
  watch: {
    isPlaying(value, prev) {
      if (value === true) {
        interval = setInterval(() => {
          this.INCREMENT_TIMER();
        }, 1000);
      } else {
        clearInterval(interval);
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
  user-select: none;
}
</style>
