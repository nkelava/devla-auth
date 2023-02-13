/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user.store";

const checkAuth = () => {
  // call await axios("api/v1/auth/status");
  // check if user is auth
  // if true return true
  // if not ask for new access token
  // if goes well return true, otherwise return false
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: (to, from, next) => {
        // TODO: first check if its logged in than if its authorizes
        // eg. beforeEnter : guardMyroute,
        // eg. beforeEnter: [removeQueryParams, removeHash],
        [useUserStore().user.id ? next() : next({ name: "login" }), checkAuth];
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
