<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.store";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUser();
});

const handleLogout = async () => {
  try {
    await userStore.logoutUser();

    router.push({ name: "login" });
  } catch (error) {
    console.log("first");
    console.log(error);
  }
};
</script>

<template>
  <h1>Home</h1>

  <div v-if="userStore.user">
    <h2>{{ userStore.user.email }}</h2>
  </div>
  <div v-else>
    <RouterLink :to="{ name: 'login' }" class="nav-item">Login</RouterLink>
    <RouterLink :to="{ name: 'register' }" class="nav-item">Register</RouterLink>
  </div>

  <button :onclick="handleLogout">Logout</button>
</template>

<style setup>
.nav-item,
h1 {
  margin: 30px;
}

h2 {
  margin-left: 30px;
}

button {
  margin: 10px 30px;
}
</style>
