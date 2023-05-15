import type { RouteRecordRaw } from "vue-router";

import ListView from "@/pages/ListView.vue";
import ProductView from "@/pages/ProductView.vue";

const routes: readonly RouteRecordRaw[] = [
  { path: "/", component: ListView },
  { path: "/product", component: ProductView },
];

export default routes;
