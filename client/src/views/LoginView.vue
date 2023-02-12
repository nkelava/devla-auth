<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../stores/user.store";

const router = useRouter();
const userStore = useUserStore();
const form = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  await userStore.loginUser(form.value);

  router.push("/");
};
</script>

<template>
  <h1>Login</h1>

  <div>
    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" name="email" placeholder="Enter email..." />
      <input v-model="form.password" type="password" name="password" placeholder="Enter password..." />
      <button type="submit">Login</button>
    </form>
  </div>

  <RouterLink :to="{ name: 'register' }" class="nav-item">Register</RouterLink>
</template>

<style setup>
h1 {
  margin: 10px 30px;
}

form {
  margin-left: 20px;
}

input,
button {
  display: block;
  margin: 10px;
}

.nav-item {
  margin: 30px;
}
</style>
