import type { RouteRecordRaw } from "vue-router";

import ListView from "@/pages/ListView.vue";
import ProductView from "@/pages/ProductView.vue";
import SplitCalendar from "@/pages/SplitCalendar.vue";
import AboutView from "@/pages/AboutView.vue";

const routes: readonly RouteRecordRaw[] = [
  // component: () => import ("@/pages/ListView.vue")
  { name: "List", path: "/", component: ListView },
  { name: "Product", path: "/product/:id()", component: ProductView },
  { name: "SplitCalendar", path: "/splitcalendar", component: SplitCalendar },
  { name: "About", path: "/about", component: AboutView },
];

export default routes;
