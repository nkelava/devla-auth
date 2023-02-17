import axios from "../api/axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  getters: {
    isLoggedIn: (state) => !!state.user.id,
  },
  actions: {
    async getUser() {
      if (!this.isLoggedIn) return;

      const data = await axios.get(`api/v1/user/${this.user.id}`);

      this.user = { ...data.data.user, accessToken: this.user.accessToken };
    },

    async loginUser({ email, password }) {
      const data = await axios.post(
        "api/v1/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      this.user = data.data.user;
    },

    async logoutUser() {
      this.clearStore();
      await axios.post("api/v1/auth/logout", { withCredentials: true });
    },

    async deleteUser() {
      await axios.delete(`api/v1/user/${this.user.id}`);
    },

    async clearStore() {
      this.$reset();
    },
  },
  persist: true,
});
