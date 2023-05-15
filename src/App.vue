<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="header">
      <el-link type="primary" @click="$router.push({ name: 'List' })"
        >Главная</el-link
      >
      <el-link type="success" @click="$router.push({ name: 'Product' })"
        >Товар</el-link
      >
    </div>
    <div class="app__main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-link {
  font-size: 16px;
  margin-right: 8px;
}
</style>
