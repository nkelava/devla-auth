import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    authUser: null,
    access_token: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getUser() {
      if (this.authUser === null) return;

      const data = await axios.get(`http://localhost:3000/api/v1/user/${this.authUser.id}`);

      this.authUser = data.data.user;
    },

    async loginUser({ email, password }) {
      axios.defaults.withCredentials = true;

      const data = await axios.post(`http://localhost:3000/api/v1/auth/login`, {
        email,
        password,
      });

      this.authUser = data.data.user;
      this.access_token = data.data.accessToken;
    },
  },
});
