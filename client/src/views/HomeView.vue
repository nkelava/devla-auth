<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";
import profileImage from "@/assets/images/the_goat.png";

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUser();
});

const handleLogout = async () => {
  try {
    await userStore.logoutUser();

    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async () => {
  try {
    await userStore.deleteUser();

    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="card-container">
    <div class="card">
      <div class="image-content">
        <span class="overlay"></span>
        <div class="card-image-wrapper">
          <img :src="profileImage" alt="profile image" class="card-image" />
        </div>
      </div>
      <div class="card-content">
        <div v-if="userStore.user">
          <h2 class="card-content__item">{{ userStore.user.email }}</h2>
        </div>
      </div>
      <div class="button-wannabe-group">
        <input class="button-wannabe" type="submit" :onclick="handleLogout" value="Logout" />
        <input
          class="button-wannabe button-wannabe--delete"
          type="submit"
          :onclick="handleDelete"
          value="Delete Account"
        />
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 25px;
  background: var(--color-form-bg);
}

.card-container {
  border-radius: 25px;
}

.image-content,
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 14px;
}

.card-content {
  padding: 50px;
}

.image-content {
  padding: 25px 0;
  position: relative;
  row-gap: 5px;
}

.overlay {
  background-color: var(--color-heading);
  border-radius: 25px 25px 0 25px;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.overlay::before,
.overlay::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -40px;
  height: 40px;
  width: 40px;
  background-color: var(--color-heading);
}

.overlay::after {
  border-radius: 0 25px 0 0;
  background-color: var(--color-form-bg);
}

.card-image-wrapper {
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: var(--color-background-soft);
  padding: 3px;
}

.card-image-wrapper .card-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid;
  border-color: var(--color-background-soft);
}

.card-content__item {
  color: var(--color-text);
}

.button-wannabe-group {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
}

.button-wannabe {
  font-size: 15px;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 14px;
  color: (--da-c-text-dark-1);
  background-color: var(--color-heading);
  width: 170px;
}

.button-wannabe:hover {
  opacity: 0.8;
  scale: 1.03;
}

.button-wannabe--delete {
  background: #ec4e24;
}
</style>
