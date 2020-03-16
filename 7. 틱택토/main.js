import Vue from "vue";
import TicTacToe from "./TicTacToe";

// new Vue(RockScissorsPaper).$mount("#app");

new Vue({
  el: "#app",
  render: h => h(TicTacToe)
});
