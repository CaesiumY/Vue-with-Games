import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const START_GAME = "START_GAME";

export default new Vuex.Store({
  state: {
    timer: 0,
    result: "",
    data: {
      row: 0,
      col: 0,
      mine: 0
    }
  },
  getters: {},
  mutations: {},
  actions: {}
});
