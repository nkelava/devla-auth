<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserStore, useLoginStore } from "../stores";

const router = useRouter();
const userStore = useUserStore();
const loginStore = useLoginStore();

const handleLogin = async () => {
  const { email, password } = loginStore;

  try {
    await userStore.loginUser({ email, password });

    loginStore.clearForm();
    router.push("/");
  } catch (err) {
    loginStore.error = err.response.data.error;
  }
};
</script>

<template>
  <div class="da-container">
    <div class="da-form-container">
      <div v-if="loginStore.error">
        {{ loginStore.error }}
      </div>

      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="da-input-wrapper">
          <input v-model="loginStore.email" type="email" name="email" required />
          <span>Email</span>
          <i></i>
        </div>
        <div class="da-input-wrapper">
          <input v-model="loginStore.password" type="password" name="password" required />
          <span>Password</span>
          <i></i>
        </div>
        <input type="submit" value="Login" />
        <div class="da-link-wrapper">
          <RouterLink :onclick="loginStore.clearForm" class="link da-link" :to="{ name: 'register' }">
            Don't have an account? Sign up
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
