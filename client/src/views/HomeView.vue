<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.store";
import { RouterLink } from "vue-router";

const store = useUserStore();

onMounted(async () => {
  const data = await axios.get(`http://localhost:3000/api/v1/user/${store.user?.email}`);

  store.user = data.data.user;
});
</script>

<template>
  <RouterLink :to="{ name: 'home' }" class="nav-item">Home</RouterLink>
  <RouterLink :to="{ name: 'login' }" class="nav-item">Login</RouterLink>
  <RouterLink :to="{ name: 'register' }" class="nav-item">Register</RouterLink>

  <h1>{{ store.user?.email }}</h1>
</template>

<style>
.nav-item {
  margin: 20px;
}
</style>
