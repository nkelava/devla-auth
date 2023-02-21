const user = JSON.parse(localStorage.getItem("user"));
const accessToken = user?.accessToken ? user.accessToken : null;

const defaultOptions = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
};

const privateOptions = {
  ...defaultOptions,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
};

export { defaultOptions, privateOptions };
