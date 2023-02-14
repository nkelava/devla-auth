<script setup>
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";
import { useRegisterStore } from "../stores";

const router = useRouter();
const registerStore = useRegisterStore();

const handleRegister = async () => {
  if (registerStore.password !== registerStore.repeatedPassword) {
    registerStore.error = "Passwords do not match.";
    return;
  }
  try {
    await axios.post(`api/v1/user`, {
      email: registerStore.email,
      password: registerStore.password,
    });

    registerStore.clearForm();
    router.push("/login");
  } catch (error) {
    console.log(error.response);
    // registerStore.error = error.response;
  }
};
</script>

<template>
  <div class="da-container">
    <div class="da-form-container">
      <div v-if="registerStore.error">
        {{ registerStore.error }}
      </div>

      <h2>Sign Up</h2>

      <form @submit.prevent="handleRegister">
        <div class="da-input-wrapper">
          <input v-model="registerStore.email" type="email" required />
          <span>Email</span>
          <i></i>
        </div>
        <div class="da-input-wrapper">
          <input v-model="registerStore.password" type="password" required />
          <span>Password</span>
          <i></i>
        </div>
        <div class="da-input-wrapper">
          <input v-model="registerStore.repeatedPassword" type="password" required />
          <span>Repeat password</span>
          <i></i>
        </div>
        <input type="submit" value="Sign Up" />
        <div class="da-link-wrapper">
          <RouterLink :onclick="registerStore.clearForm" class="link da-link" :to="{ name: 'login' }">
            Already have an account? Login
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
