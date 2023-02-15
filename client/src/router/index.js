/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.store";
import axios from "axios";

const checkIsAuthenticated = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + useUserStore().user.accessToken;
    await axios.get("api/v1/auth/status");

    return true;
  } catch (error) {
    useUserStore().clearStore();
    return false;
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: async (to, from, next) => {
        if (!useUserStore().isLoggedIn) return next({ name: "login" });
        const isAuthenticated = await checkIsAuthenticated();

        return !isAuthenticated ? next({ name: "login" }) : next();
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: (to, from, next) => {
        useUserStore().isLoggedIn ? next({ name: "home" }) : next();
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      beforeEnter: (to, from, next) => {
        useUserStore().isLoggedIn ? next({ name: "home" }) : next();
      },
    },
  ],
});

export default router;
