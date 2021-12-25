import axios from "axios";

axios.defaults.baseURL = "https://beckend-p102.herokuapp.com/";
const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (config) => {
    const ISSERVER = typeof window === "undefined";
    let token = "";
    if (!ISSERVER) {
      token = localStorage.getItem("userToken") || "";
    }

    return {
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

export default instance;