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
import "animate.css";
import MaterialKit from "./plugins/material-kit";
import axios, { Axios } from "axios";
import { Server } from "miragejs";
import VueAxios from "vue-axios";
import VueToastify from "vue-toastify";
import VueMaterial from "vue-material";
import "./assets/css/common.css";
import router from "./router";
import Globe from "./util/Globe.vue";

Vue.config.productionTip = false;
// axios.defaults.baseURL = "http://localhost:8888";
Vue.use(MaterialKit);
Vue.use(VueAxios, axios);
Vue.use(VueToastify);
Vue.prototype.GLOBE = Globe;
// Vue.use(require("./util/Notification").default);
const NavbarStore = {
  showNavbar: false
};
console.log(Globe);
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
