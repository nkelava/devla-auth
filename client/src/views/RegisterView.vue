<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  email: "",
  password: "",
  repeatedPassword: "",
});

const handleRegister = async () => {
  if (form.value.password !== form.value.repeatedPassword) {
    form.value.error = "Passwords doesn not match.";
    return;
  }
  try {
    await axios.post(`http://localhost:3000/api/v1/auth/register`, {
      email: form.value.email,
      password: form.value.password,
    });

    router.push("/login");
  } catch (error) {
    form.value.error = error.responese;
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="handleRegister">
      <div v-if="form.error">
        {{ form.error }}
      </div>
      <input v-model="form.email" type="email" name="email" placeholder="Enter email..." />
      <input v-model="form.password" type="password" name="password" placeholder="Enter password..." />
      <input v-model="form.repeatedPassword" type="password" name="password" placeholder="Repeat password..." />
      <button type="submit">Register</button>
    </form>
  </div>
</template>
