import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getUser() {
      const data = await axios.get(`http://localhost:3000/api/v1/user/test@gmail.com`);

      this.authUser = data.data.user;
    },
  },
});
