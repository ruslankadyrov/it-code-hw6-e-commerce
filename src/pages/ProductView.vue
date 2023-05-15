<script setup lang="ts"></script>

<template>
  <h3>Товар № {{ $route.params.id }}</h3>
  <el-button type="primary" plain @click="$router.push({ name: 'List' })"
    >Назад</el-button
  >
</template>

<style scoped lang="scss"></style>
