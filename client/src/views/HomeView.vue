<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const user = ref({
  email: "test@gmail.com",
});
onMounted(async () => {
  const data = await axios.get(`http://localhost:3000/api/v1/user/${user.value?.email}`);

  user.value = data.data.user;
});
</script>

<template>
  <div>
    <h1>{{ user?.email }}</h1>
  </div>
</template>
