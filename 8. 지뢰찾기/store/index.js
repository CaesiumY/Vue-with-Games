import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const START_GAME = "START_GAME";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0 // 0 이상이면 다 opened
};

const plantMine = (row, cell, mine) => {
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      // 두 번째 패러미터인 i는 index
      return i;
    });
  // row * cell 크기의 index 값을 가진 후보 배열을 만들어냄

  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  // 지뢰의 수 만큼 후보 배열에서 뽑아와 셔플 배열에 추가 -> 지뢰 좌표가 된다.

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // row * cell 의 크기를 가진 2차원 배열을 생성 -> 테이블에 들어갈 데이터

  for (let k = 0; k < shuffle.length; k++) {
    // 셔플의 길이는 지뢰의 수
    const ver = Math.floor(shuffle[k] / cell); // 지뢰 좌표의 10의 자리 수를, 소수점은 내림해서 몫만 가져옴
    const hor = shuffle[k] % cell; // 지뢰 좌표의 1의 자리 수를 가져옴
    data[ver][hor] = CODE.MINE; // 해당되는 좌표에 지뢰 할당
  }

  console.log("plantMine -> data", data);
  return data;
};

export default new Vuex.Store({
  state: {
    timer: 0,
    result: "",
    data: {
      row: 0,
      col: 0,
      mine: 0
    },
    tableData: []
  },
  getters: {},
  mutations: {
    [START_GAME](state, { row, col, mine }) {
      if (row * col > mine) {
        state.result = "지뢰의 수가 너무 많습니다.";
        return;
      }

      state.data = {
        row,
        col,
        mine
      };

      state.tableData = plantMine(row, col, mine);
      state.timer = 0;
    }
  },
  actions: {}
});
