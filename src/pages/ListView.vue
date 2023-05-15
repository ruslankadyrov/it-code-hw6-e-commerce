<script setup lang="ts">
import type { Object } from "@/types/products";

const products: Object[] = [
  {
    id: 1,
    title: "Rustic Concrete Chips",
    price: 466,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    images: [
      "https://picsum.photos/640/640?r=1142",
      "https://picsum.photos/640/640?r=9558",
      "https://picsum.photos/640/640?r=1943",
    ],
    creationAt: "2023-05-15T05:15:06.000Z",
    updatedAt: "2023-05-15T05:15:06.000Z",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://picsum.photos/640/640?r=3235",
      creationAt: "2023-05-15T05:15:06.000Z",
      updatedAt: "2023-05-15T05:15:06.000Z",
    },
  },
];
</script>

<template>
  <h3>Список товаров</h3>
  <el-scrollbar>
    <p
      v-for="item in 20"
      :key="item"
      class="scrollbar-demo-item"
      @click="$router.push('/product/' + item)"
    >
      Товар №{{ item }} {{ products[0].title }}
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
