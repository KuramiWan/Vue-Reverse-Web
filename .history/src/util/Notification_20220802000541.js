import axios from "axios";
import Vue from
const notification = axios.create();
notification.interceptors.response.use(
  response => {
    if (
      Object.values(response.data).every(value => {
        if (value === null) {
          return true;
        }
        return false;
      })
    ) {
      Vue.$vToastify.info("无查询结果");
      return (response = null);
    } else if (response.status == 200) {
      Vue.$vToastify.success("成功");
      return response;
    }
  },
  error => {
    if (error.response.status) {
      if (error.response.status === 401) {
        Vue.$vToastify.error("身份验证失败");
      }
      if (error.response.status === 403) {
        Vue.$vToastify.error("登录过期");
      }
      if (error.response.status === 404) {
        Vue.$vToastify.error("访问网页不存在");
      }
      if (error.response.status === 500) {
        Vue.$vToastify.error("访问失败");
      }
    }
  }
);
export default notification;
