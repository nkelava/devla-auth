<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.store";

const store = useUserStore();

onMounted(async () => {
  const data = await axios.get(`http://localhost:3000/api/v1/user/${store.user?.email}`);

  store.user = data.data.user;
});
</script>

<template>
  <div>
    <h1>{{ store.user?.email }}</h1>
  </div>
</template>
