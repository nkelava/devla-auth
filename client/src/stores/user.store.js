import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {
        email: "test@gmail.com",
        password: "",
      },
    };
  },
});
