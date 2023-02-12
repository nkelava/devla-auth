<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.store";
import { RouterLink } from "vue-router";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUser();
});
</script>

<template>
  <div v-if="userStore.user">
    <RouterLink :to="{ name: 'home' }" class="nav-item">Home</RouterLink>
    <h1>{{ userStore.user.email }}</h1>
  </div>
  <div v-else>
    <RouterLink :to="{ name: 'login' }" class="nav-item">Login</RouterLink>
    <RouterLink :to="{ name: 'register' }" class="nav-item">Register</RouterLink>
  </div>
</template>

<style>
.nav-item {
  margin: 20px;
}
</style>
