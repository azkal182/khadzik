import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.APP_URL
});

export default axios;
