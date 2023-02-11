<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterLink :to="{ name: 'home' }" class="nav-item">Home</RouterLink>
  <RouterLink :to="{ name: 'login' }" class="nav-item">Login</RouterLink>
  <RouterLink :to="{ name: 'register' }" class="nav-item">Register</RouterLink>

  <RouterView />
</template>

<style>
.nav-item {
  margin: 10px;
}
</style>
