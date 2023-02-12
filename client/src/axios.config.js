import axios from "axios";

const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));

if (accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
