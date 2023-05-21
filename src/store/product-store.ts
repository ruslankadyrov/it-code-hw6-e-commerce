import { product } from "@/services/api";
import type { Product } from "@/types/products";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product-store", {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    fetchProducts() {
      product.fetchProducts().then(({ data }) => {
        this.products = data;
      });
    },
  },
});
