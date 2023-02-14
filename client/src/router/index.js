/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: (to, from, next) => {
        // TODO: add auth check
        [useUserStore().user.id ? next() : next({ name: "login" })];
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: (to, from, next) => {
        useUserStore().user.id ? next({ name: "home" }) : next();
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      beforeEnter: (to, from, next) => {
        useUserStore().user.id ? next({ name: "home" }) : next();
      },
    },
  ],
});

export default router;
