import axios from "axios";

declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const headers = {
  "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
  "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
  useQueryString: true,
};

const API = axios.create({ baseURL: process.env.REACT_APP_API_URI });

API.interceptors.request.use(
  function (config) {
    config.headers = headers;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
