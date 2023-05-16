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
      "https://i1.sndcdn.com/avatars-cFOrSw05DXUpo091-6RA4VQ-t500x500.jpg",
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
  <h3>Товар № {{ $route.params.id }}</h3>
  <div>
    <span>{{ products[0].title }}</span>
    <sup>{{ products[0].price }}₽</sup>
  </div>
  <div>Описание:{{ products[0].description }}</div>
  <el-button type="primary" plain @click="$router.push({ name: 'List' })"
    >Назад</el-button
  >
</template>

<style scoped lang="scss"></style>
