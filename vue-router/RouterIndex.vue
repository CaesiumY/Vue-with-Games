<template>
  <div>
    <div class="nav">
      <router-link :to="{ name: 'Games', params: { id: 'list' } }">
        게임 목록
      </router-link>
      <router-link :to="{ name: 'Games', params: { id: 'number-baseball' } }"
        >숫자야구</router-link
      >
      <router-link :to="{ name: 'Games', params: { id: 'response-check' } }"
        >반응속도 체크</router-link
      >
      <router-link :to="{ name: 'Games', params: { id: 'lotto' } }"
        >로또</router-link
      >
      <router-link :to="{ name: 'Games', params: { id: 'mine-sweeper' } }"
        >지뢰찾기</router-link
      >
    </div>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import router from "./routes";

export default {
  router
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}

a {
  all: unset;
  cursor: pointer;
  padding: 1rem;
  border: 1px solid black;
}
</style>
