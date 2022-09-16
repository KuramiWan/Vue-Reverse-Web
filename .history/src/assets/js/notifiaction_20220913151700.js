import axios from "axios";
export default function notification() {
  const notification = axios.create();
  notification.interceptors.response.use(
    response => {
      var data = response.data;
      if (data.code) {
        Vue.$vToastify.error(data.message);
        if (data.code === 10000) {
          return response;
        }
        return;
      }
      return;
    },
    error => {
      var errorCode = error.response.status;
      if (errorCode) {
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
}
