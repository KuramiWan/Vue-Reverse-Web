import axios from "axios";
import Vue from "vue";

const notification = axios.create();

// http request 拦截器
notification.interceptors.request.use(config => {
  let token = localStorage.getItem("Authorization");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
notification.interceptors.response.use(
  response => {
    var data = response.data;
    if (data.code) {
      if (data.code === 10000) {
        Vue.$vToastify.success(data.message);
        return response;
      }
      Vue.$vToastify.error(data.message);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
  error => {
    var errorCode = error.response.status;
    if (errorCode) {
      if (errorCode === 400) {
        Vue.$vToastify.error("参数错误");
      }
      if (errorCode === 401) {
        Vue.$vToastify.error("身份验证失败");
      }
      if (errorCode === 403) {
        Vue.$vToastify.error("登录过期");
      }
      if (errorCode === 404) {
        Vue.$vToastify.error("访问网页不存在");
      }
      if (errorCode === 500) {
        Vue.$vToastify.error("访问失败");
      }
    }
    return;
  }
);
export default notification;
