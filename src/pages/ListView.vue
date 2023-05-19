<script setup lang="ts">
import { ref } from "vue";
import { useDebounce } from "@vueuse/core";

import type { Product } from "../types/products";

import makeRequest from "../utils/makeRequest";

const products = ref<Product[]>([]);

makeRequest({
  method: "get",
  url: "https://financialmodelingprep.com/api/v3/profile/AAPL,NVDA?apikey=39c41689f9fab5f0dcf71b542172366c00",
}).then(({ data }) => {
  products.value = data;
});

// const watch (form, ()=>{
//   console.log('send api requst');
// });

// const debounced = useDebounce(() => {
//       console.log('Debounce button clicked!')
//     }, 2000)
//   };
</script>

<template>
  <h3>Список товаров</h3>
  <el-scrollbar v-for="product in products">
    <p
      class="scrollbar-demo-item"
      @click="$router.push('/product/' + product.symbol)"
    >
      Товар №{{ product.symbol }}
      <img
        src="https://i1.sndcdn.com/avatars-cFOrSw05DXUpo091-6RA4VQ-t500x500.jpg"
        alt="gg"
        width="50"
        height="50"
      />
    </p>
  </el-scrollbar>
</template>

<style scoped lang="scss">
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
