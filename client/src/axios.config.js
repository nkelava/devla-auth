import axios from "axios";

const user = JSON.parse(window.localStorage.getItem("user"));

if (user) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
}

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;
