<script setup lang="ts">
import { ref } from "vue";

import type { Product } from "../types/products";

import makeRequest from "../utils/makeRequest";

const products = ref<Product[]>([]);

makeRequest({
  method: "get",
  url: "https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA?apikey=39c41689f9fab5f0dcf71b542172366c00",
}).then(({ data }) => {
  products.value = data;
});
</script>

<template>
  <h3>{{ $route.params.id }}</h3>
  <div v-for="product in products">
    <div v-if="product.symbol === $route.params.id">
      <span>{{ product.symbol }}</span>
      <sup>{{ product.price }}$</sup>

      <div>Описание:{{ product.description }}</div>
    </div>
  </div>
  <el-button type="primary" plain @click="$router.push({ name: 'List' })"
    >Назад</el-button
  >
</template>

<style scoped lang="scss"></style>
