<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.store";
import { RouterLink } from "vue-router";

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
  <RouterLink :to="{ name: 'register' }" class="nav-item">Register</RouterLink>
  <h1>Login</h1>

  <div>
    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" name="email" placeholder="Enter email..." />
      <input v-model="form.password" type="password" name="password" placeholder="Enter password..." />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style setup>
h1 {
  margin: 10px 20px;
}

form {
  margin-left: 20px;
}
</style>
