import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    async getUser() {
      if (this.user.id === null) return;

      const data = await axios.get(`api/v1/user/${this.user.id}`);

      this.user = { ...data.data.user, accessToken: this.user.accessToken };
    },

    async loginUser({ email, password }) {
      const data = await axios.post(`api/v1/auth/login`, {
        email,
        password,
      });

      axios.defaults.headers.common["Authorization"] = "Bearer " + data.data.user.accessToken;

      this.user = data.data.user;
    },
    async updateAccessToken(newAccessToken) {
      this.user.accessToken = newAccessToken;

      axios.defaults.headers.common["Authorization"] = "Bearer " + this.user.accessToken;
    },
  },
  persist: true,
});
