<script setup lang="ts">
import Header from "./components/header.vue";
</script>

<template>
  <Header />
  <div class="app__main">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.app__main {
  margin-top: 60px;
}
</style>
