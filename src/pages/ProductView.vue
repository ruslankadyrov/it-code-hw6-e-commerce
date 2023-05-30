<script setup lang="ts">
import { ref } from "vue";

import type { Product } from "../types/products";

import makeRequest from "../services/api/httpClient";

import { useRoute } from "vue-router";

const products = ref<Product[]>([]);

const route = useRoute();
const paramsId = route.params.id;

makeRequest({
  method: "get",
  url: `https://financialmodelingprep.com/api/v3/profile/${paramsId}?apikey=39c41689f9fab5f0dcf71b542172366c`,
}).then(({ data }) => {
  products.value = data;
});
</script>

<template>
  <h3>{{ $route.params.id }}</h3>
  <div v-for="product in products">
    <span>{{ product.companyName }}</span>
    <sup>{{ product.price }}$</sup>
    <div>Description:{{ product.description }}</div>
  </div>
  <el-button type="primary" plain @click="$router.push({ name: 'List' })">
    Back
  </el-button>

  <!-- <h3>{{ (paramsId = $route.params.id) }}</h3>
  <div v-for="product in products">
    <div v-if="product.symbol === $route.params.id">
      <span>{{ product.symbol }}</span>
      <sup>{{ product.price }}$</sup>

      <div>Описание:{{ product.description }}</div>
    </div>
  </div>
  <el-button type="primary" plain @click="$router.push({ name: 'List' })"
    >Назад</el-button
  > -->
</template>

<style scoped lang="scss"></style>
