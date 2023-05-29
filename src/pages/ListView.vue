<script setup lang="ts">
import { ref } from "vue";
import { useDebounce } from "@vueuse/core";

import type { Product } from "../types/products";

import makeRequest from "../services/api/httpClient";

import { useProductStore } from "@/store/product-store";

const products = ref<Product[]>([]);
const productSymbol = ref("");

const productStore = useProductStore();
productStore.fetchProducts();

// makeRequest({
//   method: "get",
//   url: "https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA,YNDX,MSFT,BA,KO,IBM,V,AXP,F,INTC,EBAY,DELL,AMZN?apikey=39c41689f9fab5f0dcf71b542172366c",
// }).then(({ data }) => {
//   products.value = data;
// });

const symbolDebounce = useDebounce(productSymbol, 2000);

function makeClickRequest() {
  makeRequest({
    method: "get",
    url: `https://financialmodelingprep.com/api/v3/profile/${symbolDebounce.value}?apikey=39c41689f9fab5f0dcf71b542172366c00`,
  }).then(({ data }) => {
    products.value = data;
  });
}

function makeFilterRequest(symbol: string) {
  makeRequest({
    method: "get",
    url: `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=39c41689f9fab5f0dcf71b542172366c00`,
  }).then(({ data }) => {
    products.value = data;
  });
}

//for infinite scroll
const count = ref(0);
const load = () => {
  count.value += 3;
};
</script>

<template>
  <input type="text" id="product_symbol" v-model="productSymbol" />
  <el-button type="primary" plain @click="makeClickRequest()">
    Search
  </el-button>

  <h3>List of stocks</h3>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in count" :key="i" class="infinite-list-item">
      <el-image
        style="width: 40px; height: 40px"
        :src="productStore.products[i - 1].image"
      />
      {{ productStore.products[i - 1].symbol }}
      {{ i }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.infinite-list {
  height: 30vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
