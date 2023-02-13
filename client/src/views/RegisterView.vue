<script setup>
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";
import { useRegisterStore } from "../stores/form.store";

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

    router.push("/login");
  } catch (error) {
    registerStore.error = error.response.data.error;
  }
};
</script>

<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="handleRegister">
      <div v-if="registerStore.error">
        {{ registerStore.error }}
      </div>
      <input v-model="registerStore.email" type="email" name="email" placeholder="Enter email..." />
      <input v-model="registerStore.password" type="password" name="password" placeholder="Enter password..." />
      <input
        v-model="registerStore.repeatedPassword"
        type="password"
        name="password"
        placeholder="Repeat password..."
      />
      <button type="submit">Register</button>
    </form>

    <RouterLink :to="{ name: 'login' }" class="nav-item">Login</RouterLink>
  </div>
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
  margin-left: 30px;
}
</style>
