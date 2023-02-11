<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  await axios
    .post(`http://localhost:3000/api/v1/auth/login`, {
      email: form.value.email,
      password: form.value.password,
    })
    .then((response) => console.log(response.data.accessToken));

  router.push("/");
};
</script>

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" name="email" placeholder="Enter email..." />
      <input v-model="form.password" type="password" name="password" placeholder="Enter password..." />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
