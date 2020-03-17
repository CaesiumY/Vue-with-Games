import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const SET_CELLDATA = "SET_CELLDATA";
export const RESET_DATA = "RESET_DATA";
export const SET_WINNER = "SET_WINNER";
export const SET_DRAW = "SET_DRAW";
export const CHANGE_TURN = "CHANGE_TURN";

export default new Vuex.Store({
  state: {
    tableData: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ],
    nowTurn: "O",
    winner: ""
  },
  getters: {
    cellData(state, { row, cell }) {
      return state.tableData[row][cell];
    }
  },
  mutations: {
    [SET_CELLDATA](state, { row, cell }) {
      Vue.set(state.tableData[row], cell, state.nowTurn);
    },
    [RESET_DATA](state) {
      state.nowTurn = "O";
      state.tableData = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
    },
    [SET_WINNER](state, winner) {
      state.winner = winner || "";
    },
    [SET_DRAW](state) {
      state.winner = "";
    },
    [CHANGE_TURN](state) {
      state.nowTurn = state.nowTurn === "O" ? "X" : "O";
    }
  },
  actions: {}
});
