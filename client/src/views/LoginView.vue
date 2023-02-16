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

    loginStore.clearStore();
    router.push("/");
  } catch (error) {
    loginStore.error = error.response.data.error;
  }
};
</script>

<template>
  <div class="da-d-flex-c-center">
    <div class="da-container">
      <div class="da-form-container">
        <h2>Login</h2>

        <form @submit.prevent="handleLogin">
          <div class="da-input-wrapper">
            <input v-model="loginStore.email" type="email" required />
            <span>Email</span>
            <i></i>
          </div>
          <div class="da-input-wrapper">
            <input v-model="loginStore.password" type="password" required />
            <span>Password</span>
            <i></i>
          </div>
          <input type="submit" value="Login" />
          <div class="da-link-wrapper">
            <RouterLink :onclick="loginStore.clearStore" class="link da-link" :to="{ name: 'register' }">
              Don't have an account? Sign up
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
    <div v-if="loginStore.error">
      <div class="error-container da-d-flex-c-center">
        <p class="error">{{ loginStore.error }}</p>
      </div>
    </div>
  </div>
</template>
