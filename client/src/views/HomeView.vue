<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const user = ref();
onMounted(async () => {
  const data = await axios.get(`http://localhost:3000/api/v1/user/63e79729260e25cdab7d9d1b`);
  user.value = data.data.data.user;
});
</script>
s

<template>
  <div>
    <h1>{{ user?.email }}</h1>
  </div>
</template>
