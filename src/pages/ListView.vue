<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useDebounce } from "@vueuse/core";

import type { Product } from "../types/products";

import makeRequest from "../services/api/httpClient";

import { useProductStore } from "@/store/product-store";

const products = ref<Product[]>([]);
const productSymbol = ref("");

const productStore = useProductStore();
productStore.fetchProducts();

let makeSearch = ref("false");
let makeFilter = ref("false");

const valueFilter = ref("");

// makeRequest({
//   method: "get",
//   url: "https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA,YNDX,MSFT,BA,KO,IBM,V,AXP,F,INTC,EBAY,DELL,AMZN?apikey=39c41689f9fab5f0dcf71b542172366c",
// }).then(({ data }) => {
//   products.value = data;
// });
const productSymbolWithoutSpace = computed(() => {
  return productSymbol.value.replace(/ /g, "");
});
const symbolDebounce = useDebounce(productSymbolWithoutSpace, 2000);

watchEffect(() => {
  makeClickRequest(symbolDebounce.value);
});

function makeClickRequest(ticker: string) {
  makeRequest({
    method: "get",
    url: `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=39c41689f9fab5f0dcf71b542172366c`,
  }).then(({ data }) => {
    products.value = data;
  });
}

function resetFilter() {
  makeFilter.value = "false";
  valueFilter.value = "";
}

function resetSearch() {
  makeSearch.value = "false";
  productSymbol.value = "";
  products.value = [];
}

//for infinite scroll
const count = ref(0);
const load = () => {
  count.value += 3;
};

const filterItem = [
  {
    value: "RU",
    label: "Russia",
    filtered: function () {
      makeFilter.value = "true";
    },
  },
  {
    value: "US",
    label: "United States",
    filtered: function () {
      makeFilter.value = "true";
    },
  },
  {
    value: "AU",
    label: "Australia",
    filtered: function () {
      makeFilter.value = "true";
    },
  },
  {
    value: "CA",
    label: "Canada",
    filtered: function () {
      makeFilter.value = "true";
    },
  },
  {
    value: "NZ",
    label: "New Zealand",
    filtered: function () {
      makeFilter.value = "true";
    },
  },
];

function makeSearchFn() {
  setTimeout(valueSearch, 3000);
  function valueSearch() {
    makeSearch.value = "true";
    if (!symbolDebounce.value) {
      makeSearch.value = "false";
    }
  }
}
</script>

<template>
  <!-- v-on:keyup.enter="makeClickRequest()" -->
  <div class="productFilter">
    <input
      type="text"
      id="product_symbol"
      v-model="productSymbol"
      @input="makeSearchFn()"
    />
    <el-button type="primary" plain @click="resetSearch()">
      Reset search
    </el-button>
    <el-select v-model="valueFilter" class="m-2" placeholder="Choose country">
      <el-option
        v-for="item in filterItem"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @click="item.filtered"
      />
    </el-select>
    <el-button type="primary" plain @click="resetFilter()">
      Reset filter
    </el-button>
  </div>

  <!-- <h2>List of shares</h2> -->
  <div v-if="makeSearch == 'false' && makeFilter == 'false'">
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li
        v-for="i in count"
        :key="i"
        class="infinite-list-item"
        @click="$router.push('/product/' + productStore.products[i - 1].symbol)"
      >
        <el-image
          style="width: 40px; height: 40px"
          :src="productStore.products[i - 1].image"
          class="product-image"
        />
        {{ productStore.products[i - 1].companyName }}
        {{ productStore.products[i - 1].symbol }}
        {{ productStore.products[i - 1].price }}$
        <div
          :class="{
            red: productStore.products[i - 1].changes <= 0,
            green: productStore.products[i - 1].changes > 0,
          }"
        >
          {{ productStore.products[i - 1].changes }}$
        </div>
      </li>
    </ul>
  </div>

  <div v-else-if="makeSearch == 'true' && makeFilter == 'false'">
    <el-scrollbar>
      <p
        v-for="product in products"
        class="scrollbar-demo-item"
        @click="$router.push('/product/' + product.symbol)"
      >
        <el-image
          style="width: 40px; height: 40px"
          :src="product.image"
          class="product-image"
        />
        {{ product.companyName }}
        {{ product.symbol }}
        {{ product.price }}$
        <div
          :class="{
            red: product.changes <= 0,
            green: product.changes > 0,
          }"
        >
          {{ product.changes }}$
        </div>
      </p>
    </el-scrollbar>
  </div>

  <div v-else-if="makeSearch == 'false' && makeFilter == 'true'">
    <div v-for="product in productStore.products">
      <div v-if="product.country == valueFilter">
        <el-scrollbar>
          <p
            class="scrollbar-demo-item"
            @click="$router.push('/product/' + product.symbol)"
          >
            <el-image
              style="width: 40px; height: 40px"
              :src="product.image"
              class="product-image"
            />
            {{ product.companyName }}
            {{ product.symbol }}
            {{ product.price }}$
            <div
              :class="{
                red: product.changes <= 0,
                green: product.changes > 0,
              }"
            >
              {{ product.changes }}$
            </div>
          </p>
        </el-scrollbar>
      </div>
    </div>
  </div>

  <div v-else="makeSearch == 'true' && makeFilter == 'true'">
    <div v-for="product in products">
      <div v-if="product.country == valueFilter">
        <el-scrollbar>
          <p
            class="scrollbar-demo-item"
            @click="$router.push('/product/' + product.symbol)"
          >
            <el-image
              style="width: 40px; height: 40px"
              :src="product.image"
              class="product-image"
            />
            {{ product.companyName }}
            {{ product.symbol }}
            {{ product.price }}$
            <div
              :class="{
                red: product.changes <= 0,
                green: product.changes > 0,
              }"
            >
              {{ product.changes }}$
            </div>
          </p>
        </el-scrollbar>
      </div>
    </div>
  </div>

  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped lang="scss">
.productFilter {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;

  #product_symbol {
    padding: 7px;
    width: 250px;
    border-color: var(--el-color-primary);
    border-radius: 5px;
  }

  .m-2 {
    width: 150px;
  }
}
.red {
  color: red;
}
.green {
  color: rgb(18, 193, 18);
}
.product-image {
  filter: drop-shadow(1px 1px 1px black);
  border-radius: 15px;
}
.infinite-list {
  height: 80vh;
  padding: 0;
  margin: 0;
  list-style: none;

  .infinite-list-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
  }
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
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
