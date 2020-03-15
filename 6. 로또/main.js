import Vue from "vue";
import LottoGenerator from "./LottoGenerator";

// new Vue(RockScissorsPaper).$mount("#app");

new Vue({
  el: "#app",
  render: h => h(LottoGenerator)
});
