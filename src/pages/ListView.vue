<script setup lang="ts">
import { ref } from "vue";
import { useDebounce, useDebounceFn } from "@vueuse/core";

import type { Product } from "../types/products";

import makeRequest from "../utils/makeRequest";

const products = ref<Product[]>([]);
const productSymbol = ref("");

makeRequest({
  method: "get",
  url: "https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA,YNDX,MSFT,BA,KO,IBM,V,AXP,F,INTC,EBAY,DELL,AMZN,?apikey=39c41689f9fab5f0dcf71b542172366c00",
}).then(({ data }) => {
  products.value = data;
});

const symbolDebounce = useDebounce(productSymbol, 2000);

function makeClickRequest() {
  makeRequest({
    method: "get",
    url: `https://financialmodelingprep.com/api/v3/profile/${symbolDebounce.value}?apikey=39c41689f9fab5f0dcf71b542172366c`,
  }).then(({ data }) => {
    products.value = data;
  });
}

//for infinite scroll
const count = ref(0);
const load = () => {
  count.value += 5;
};
</script>

<template>
  <input type="text" id="product_symbol" v-model="productSymbol" />
  <el-button type="primary" plain @click="makeClickRequest()">
    Search
  </el-button>
  <h3>List of stocks</h3>

  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li
      v-for="i in count"
      :key="i"
      class="infinite-list-item"
      @click="$router.push('/product/' + products[i].symbol)"
    >
      <el-image
        style="width: 40px; height: 40px"
        :src="products[i].image"
        lazy
      />
      {{ products[i].companyName }}
    </li>
  </ul>

  <!-- <el-scrollbar v-for="list in 20">
    <p
      v-for="product in products"
      class="scrollbar-demo-item"
      @click="$router.push('/product/' + product.symbol)"
    >
      <el-image style="width: 40px; height: 40px" :src="product.image" lazy />
      {{ product.companyName }}
    </p>
  </el-scrollbar> -->
</template>

<style scoped lang="scss">
// .scrollbar-demo-item {
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 50px;
//   margin: 10px;
//   text-align: center;
//   border-radius: 4px;
//   background: var(--el-color-primary-light-9);
//   color: var(--el-color-primary);
// }

.infinite-list {
  height: 90vh;
  padding: 0;
  margin: 0;
  list-style: none;
  .infinite-list-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
  }
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
