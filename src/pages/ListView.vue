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

const productFilter = productStore;

let makeSearch = ref("false");

const valueFilter = ref("");

// makeRequest({
//   method: "get",
//   url: "https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA,YNDX,MSFT,BA,KO,IBM,V,AXP,F,INTC,EBAY,DELL,AMZN?apikey=39c41689f9fab5f0dcf71b542172366c",
// }).then(({ data }) => {
//   products.value = data;
// });

const symbolDebounce = useDebounce(productSymbol, 1000);

function makeClickRequest() {
  makeSearch.value = "true";
  makeRequest({
    method: "get",
    url: `https://financialmodelingprep.com/api/v3/profile/${symbolDebounce.value}?apikey=39c41689f9fab5f0dcf71b542172366c`,
  }).then(({ data }) => {
    products.value = data;
  });
}

function resetFilter() {
  makeSearch.value = "false";
  productSymbol.value = "";
  products.value = [];
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

const options = [
  {
    value: "RU",
    label: "Russia",
  },
  {
    value: "US",
    label: "United States",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>

<template>
  <input type="text" id="product_symbol" v-model="productSymbol" />
  <el-button type="primary" plain @click="makeClickRequest()">
    Search
  </el-button>
  <el-button type="primary" plain @click="resetFilter()">
    Reset filter
  </el-button>

  <el-select v-model="valueFilter" class="m-2" placeholder="Choose country">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

  {{ valueFilter }}

  <h3>List of stocks</h3>
  <div v-if="makeSearch == 'false'">
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
  </div>

  <div v-else="makeSearch == 'true'">
    <el-scrollbar>
      <p
        v-for="product in products"
        class="scrollbar-demo-item"
        @click="$router.push('/product/' + product.symbol)"
      >
        <el-image style="width: 40px; height: 40px" :src="product.image" lazy />
        {{ product.companyName }}
      </p>
    </el-scrollbar>
  </div>
  <div v-for="product in productStore.products">
    <div v-if="product.country == valueFilter">
      {{ product.companyName }}
      {{ product.symbol }}
    </div>
  </div>
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

.scrollbar-demo-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
