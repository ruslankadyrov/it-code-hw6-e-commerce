import type { RouteRecordRaw } from "vue-router";

import ListView from "@/pages/ListView.vue";
import ProductView from "@/pages/ProductView.vue";

const routes: readonly RouteRecordRaw[] = [
  // component: () => import ("@/pages/ListView.vue")
  { name: "List", path: "/", component: ListView },
  { name: "Product", path: "/product/:id()", component: ProductView },
];

export default routes;
