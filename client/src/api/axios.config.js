const user = JSON.parse(localStorage.getItem("user"));
const accessToken = user?.accessToken ? user.accessToken : null;

const defaultOptions = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
};

const credentialOptions = {
  ...defaultOptions,
  withCredentials: true,
};

const privateOptions = {
  ...credentialOptions,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

export { defaultOptions, credentialOptions, privateOptions };
