import Vue from "vue";
import RockScissorsPaper from "./RockScissorsPaper";

// new Vue(RockScissorsPaper).$mount("#app");

new Vue({
  el: "#app",
  render: h => h(RockScissorsPaper)
});
