import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      authUser: "",
      accessToken: "",
    };
  },
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getUser() {
      if (this.authUser === null) return;

      const data = await axios.get(`api/v1/user/${this.authUser.id}`);

      this.authUser = data.data.user;
    },

    async loginUser({ email, password }) {
      axios.defaults.withCredentials = true;

      const data = await axios.post(`api/v1/auth/login`, {
        email,
        password,
      });

      axios.defaults.headers.common["Authorization"] = "Bearer " + data.data.accessToken;

      this.authUser = data.data.user;
      this.accessToken = data.data.accessToken;
    },
  },
  persist: true,
});
