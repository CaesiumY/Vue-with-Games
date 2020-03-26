import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const START_GAME = "START_GAME";
export const INCREMENT_TIMER = "INCREMENT_TIMER";
export const OPEN_CELL = "OPEN_CELL";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NOMALIZE_CELL = "NOMALIZE_CELL";
export const CLICK_MINE = "CLICK_MINE";

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

  return data;
};

export default new Vuex.Store({
  state: {
    timer: 0,
    result: "",
    data: {
      row: 0,
      cell: 0,
      mine: 0
    },
    tableData: [],
    isPlaying: false,
    winScore: 0
  },
  getters: {},
  mutations: {
    [START_GAME](state, { row, cell, mine }) {
      if (row * cell < mine) {
        state.tableData = [];
        state.result = "지뢰의 수가 너무 많습니다.";
        return;
      }

      state.data = {
        row,
        cell,
        mine
      };

      state.tableData = plantMine(row, cell, mine);
      state.timer = 0;
      state.isPlaying = true;
      state.result = "";
      state.winScore = 0;
    },
    [INCREMENT_TIMER](state) {
      state.timer += 1;
    },
    [OPEN_CELL](state, { row, cell }) {
      const alreadyCheckedCells = [];

      function checkAround(row, cell) {
        const isUndefinedRowCell =
          row < 0 ||
          row > state.tableData.length - 1 ||
          cell < 0 ||
          cell > state.tableData[0].length - 1;

        if (isUndefinedRowCell) {
          return;
        }

        if (
          [
            CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION
          ].includes(state.tableData[row][cell])
        ) {
          return;
        }

        if (alreadyCheckedCells.includes(row + "/" + cell)) {
          return;
        } else {
          alreadyCheckedCells.push(row + "/" + cell);
        }

        let checkedCell = [];
        if (state.tableData[row - 1]) {
          // 윗 줄이 있을 경우
          checkedCell = checkedCell.concat([
            state.tableData[row - 1][cell - 1],
            state.tableData[row - 1][cell],
            state.tableData[row - 1][cell + 1]
          ]);
        }

        if (state.tableData[row]) {
          checkedCell = checkedCell.concat([
            state.tableData[row][cell - 1],
            state.tableData[row][cell + 1]
          ]);
        }

        if (state.tableData[row + 1]) {
          checkedCell = checkedCell.concat([
            state.tableData[row + 1][cell - 1],
            state.tableData[row + 1][cell],
            state.tableData[row + 1][cell + 1]
          ]);
        }

        const countAroundMine = checkedCell.filter(item => {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(item);
        });

        if (countAroundMine.length === 0 && row > -1) {
          const nearCell = [];

          if (row - 1 > -1) {
            // 윗 줄이 있을 경우
            nearCell.push([row - 1, cell - 1]);
            nearCell.push([row - 1, cell]);
            nearCell.push([row - 1, cell + 1]);
          }
          nearCell.push([row, cell - 1]);
          nearCell.push([row, cell + 1]);
          if (row + 1 < state.tableData.length) {
            // 아래 줄이 있을 경우
            nearCell.push([row + 1, cell - 1]);
            nearCell.push([row + 1, cell]);
            nearCell.push([row + 1, cell + 1]);
          }

          nearCell.forEach(coord => {
            if (state.tableData[coord[0]][coord[1]] !== CODE.OPENED) {
              checkAround(coord[0], coord[1]);
            }
          });
        }
        state.winScore += 1;
        console.log("checkedCell", checkedCell);
        Vue.set(state.tableData[row], cell, countAroundMine.length);
      }
      checkAround(row, cell);

      if (
        state.winScore ===
        state.data.row * state.data.cell - state.data.mine
      ) {
        state.result = `${state.timer}초 만에 승리하셨습니다!`;
        state.isPlaying = false;
      }
    },
    [FLAG_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.MINE) {
        Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.FLAG);
      }
    },
    [QUESTION_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.FLAG_MINE) {
        Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.QUESTION);
      }
    },
    [NOMALIZE_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
        Vue.set(state.tableData[row], cell, CODE.MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.NORMAL);
      }
    },
    [CLICK_MINE](state, { row, cell }) {
      Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
      state.isPlaying = false;
      state.result = "Game Over";
    }
  },
  actions: {}
});
