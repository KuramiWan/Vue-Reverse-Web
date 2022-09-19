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

Vue.config.productionTip = false;
// axios.defaults.baseURL = "http://localhost:8888";
Vue.use(MaterialKit);
Vue.use(VueAxios, axios);
Vue.use(VueToastify);

// Vue.use(require("./util/Notification").default);
const NavbarStore = {
  showNavbar: false
};

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
