<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.store";
import { RouterLink } from "vue-router";
import axios from "axios";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUser();
});

const handleStatus = async () => {
  try {
    const data = await axios.get("api/v1/auth/status");

    if (data.data.user) {
      console.log("User: ", data.data.user);
      return;
    }

    const accessToken = data.data.accessToken;
    console.log("New access token: ", accessToken);

    if (accessToken) await userStore.updateAccessToken(accessToken);
  } catch (error) {
    console.log(error);
  }
};
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
  <button :onclick="handleStatus">Status</button>
</template>

<style setup>
.nav-item,
h1 {
  margin-left: 30px;
}

button {
  margin: 30px;
}
</style>
