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
  <div class="da-container">
    <div class="da-form-container">
      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="da-input-wrapper">
          <input v-model="form.email" type="email" name="email" required />
          <span>Email</span>
          <i></i>
        </div>
        <div class="da-input-wrapper">
          <input v-model="form.password" type="password" name="password" required />
          <span>Password</span>
          <i></i>
        </div>
        <input type="submit" value="Login" />
        <div class="da-link-wrapper">
          <RouterLink class="link da-link" :to="{ name: 'register' }">Don't have an account? Sign up</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
