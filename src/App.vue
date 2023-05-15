<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="header">
      <el-link type="primary" @click="$router.push({ name: 'List' })"
        >Главная</el-link
      >
      <!-- <el-link type="success" @click="$router.push({ name: 'Product' })"
        >Товар</el-link
      > -->
    </div>
    <div class="app__main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: #d9ecff;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: 16px;
  border-bottom: 2px solid #409eff;
}

.app__main {
  margin-top: 60px;
}
.el-link {
  font-size: 20px;
  margin-right: 20px;
}
</style>
