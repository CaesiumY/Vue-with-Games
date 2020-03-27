import Vue from "vue";
import VueRouter from "vue-router";
import NumberBaseball from "../../3. 숫자야구/NumberBaseball";
import responseCheck from "../../4. 반응속도체크/ResponseCheck";
import lotto from "../../6. 로또/LottoGenerator";
import mineSweeper from "../../8. 지뢰찾기/MineSweeper";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/number-baseball",
      component: NumberBaseball
    },
    {
      path: "/response-check",
      component: responseCheck
    },
    {
      path: "/lotto",
      component: lotto
    },
    {
      path: "/mine-sweeper",
      component: mineSweeper
    }
  ]
});
