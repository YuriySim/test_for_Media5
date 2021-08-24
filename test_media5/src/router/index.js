import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/views/Comparison")
  },

  {
    path: "/comparison",
    name: "Comparison",
    component: () => import("@/views/Comparison")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
