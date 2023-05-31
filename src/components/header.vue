<script setup lang="ts"></script>

<template>
  <div class="header">
    <div class="wrapper">
      <h4 class="siteName">𝓒𝓸𝓶𝓹𝓪𝓷𝔂 𝓼𝓱𝓪𝓻𝓮𝓼</h4>
      <el-link type="primary" @click="$router.push({ name: 'List' })"
        >Stocks</el-link
      >
      <el-link type="primary" @click="$router.push({ name: 'SplitCalendar' })"
        >Split Calendar</el-link
      >
      <el-link type="primary" @click="$router.push({ name: 'About' })"
        >About</el-link
      >
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

  .wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .el-link {
    font-size: 20px;
  }
}
</style>
