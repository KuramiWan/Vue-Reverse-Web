// =========================================================
// * Vue Material Kit - v1.2.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-kit
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-kit/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "animate.css";
import MaterialKit from "./plugins/material-kit";
import vueKanban from "vue-kanban";
import axios, { Axios } from "axios";
import { Server } from "miragejs";
import VueAxios from "vue-axios";
import VueToastify from "vue-toastify";
import { MdButton, MdContent, MdTabs } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
Vue.config.productionTip = false;
// axios.defaults.baseURL = "http://localhost:8888";
Vue.use(MaterialKit);
Vue.use(vueKanban);
Vue.use(VueAxios, axios);
Vue.use(VueToastify);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
export default () => {
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
};

// Vue.use(require("./util/Notification").default);
const NavbarStore = {
  showNavbar: false
};
// new Server({
//   routes() {
//     this.post("/form", () => {
//       return ["1", "2", "3"];
//     });
//     this.post("/timesoption", () => {
//       return ["3:00", "4:00", "5:00"];
//     });
//     this.get("/kanban", () => {
//       return [
//         // {
//         //   name: "dsd",
//         //   id: 1,
//         //   question: "1",
//         //   time: null,
//         //   status: "undone"
//         // },
//         // {
//         //   name: "dsd",
//         //   id: 153512349821340 - 89234,
//         //   question: "1",
//         //   time: null,
//         //   status: "undone"
//         // },
//         // {
//         //   name: "dsd",
//         //   id: 153502394812934871932084,
//         //   status: "undone",
//         //   time: null,
//         //   question: "1"
//         // }
//       ];
//     });
//     this.get("/getyear", () => {
//       return [2022, 2021];
//     });
//     this.post("/archives", () => {
//       return [
//         {
//           time: "3:00",
//           blocks: [
//             {
//               id: "1233",
//               title: "123",
//               status: "已完成",
//               question: "123123"
//             },
//             {
//               id: "ds",
//               title: "123",
//               status: "已完成",
//               question: "123123"
//             },
//             {
//               id: "aa",
//               title: "123",
//               status: "已完成",
//               question: "123123"
//             }
//           ]
//         },
//         {
//           time: "4:00",
//           blocks: [
//             {
//               id: "2323",
//               title: "123",
//               status: "已完成",
//               question: "123123"
//             }
//           ]
//         }
//       ];
//     });
//   }
// });

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
