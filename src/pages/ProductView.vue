<script setup lang="ts">
import { ref } from "vue";

import type { Product } from "../types/products";

import makeRequest from "../utils/makeRequest";
import type { Ref } from "vue";

const products = ref<Product[]>([]);

let paramsId = ref<any>();

function makeClickRequest(id: Ref<any>) {
  paramsId = id;
  makeRequest({
    method: "get",
    url: `https://financialmodelingprep.com/api/v3/profile/${paramsId}?apikey=39c41689f9fab5f0dcf71b542172366c`,
  }).then(({ data }) => {
    products.value = data;
  });

  console.log(paramsId + "ee111");
}

console.log(paramsId + "ee");

// makeRequest({
//   method: "get",
//   url: "https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA?apikey=39c41689f9fab5f0dcf71b542172366c00",
// }).then(({ data }) => {
//   products.value = data;
// });
</script>

<template>
  <h3>{{ (paramsId = $route.params.id) }}</h3>
  <button @click="makeClickRequest(paramsId)">Load real data</button>
  <div v-for="product in products">
    <span>{{ product.companyName }}</span>
    <sup>{{ product.price }}$</sup>
    <div>Описание:{{ product.description }}</div>
  </div>
  <el-button type="primary" plain @click="$router.push({ name: 'List' })"
    >Назад</el-button
  >

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
