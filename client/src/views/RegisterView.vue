<script setup>
import { ref } from "vue";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  email: "",
  password: "",
  repeatedPassword: "",
});

const handleRegister = async () => {
  if (form.value.password !== form.value.repeatedPassword) {
    form.value.error = "Passwords do not match.";
    return;
  }
  try {
    await axios.post(`api/v1/user`, {
      email: form.value.email,
      password: form.value.password,
    });

    router.push("/login");
  } catch (error) {
    form.value.error = error.response.data.error;
  }
};
</script>

<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="handleRegister">
      <div v-if="form.error">
        {{ form.error }}
      </div>
      <input v-model="form.email" type="email" name="email" placeholder="Enter email..." />
      <input v-model="form.password" type="password" name="password" placeholder="Enter password..." />
      <input v-model="form.repeatedPassword" type="password" name="password" placeholder="Repeat password..." />
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
