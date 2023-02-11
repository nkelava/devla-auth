<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterLink to="/" class="nav-item">Home</RouterLink>
  <RouterLink to="/login" class="nav-item">Login</RouterLink>
  <RouterLink to="/register" class="nav-item">Register</RouterLink>

  <RouterView />
</template>

<style>
.nav-item {
  margin: 10px;
}
</style>
