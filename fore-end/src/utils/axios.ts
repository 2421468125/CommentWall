import type { servicesVersion } from "typescript";
import { baseUrl } from "./env";
import axios from "axios";

const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

// 请求的拦截器
service.interceptors.request.use(
  // 请求前的操作
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

// 响应的拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

export default service;
