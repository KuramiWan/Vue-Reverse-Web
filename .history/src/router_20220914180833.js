import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import ReserveForm from "./views/ReserveForm.vue";
import Detail from "./views/Detail.vue";
import Kanban from "./views/Kanban.vue";
import Achieve from "./views/archives.vue";
import Announcement from "./views/Announcement.vue";
import Register from "./views/Register.vue";
import DashboardLayout from "./layout/DashboardLayout.vue";
import UserProfile from "./views/TableList.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter }
    },
    {
      path: "/register",
      name: "register",
      components: {
        default: Register,
        header: MainNavbar,
        footer: MainFooter
      }
    },
    {
      path: "/admin",
      name: "userTable",
      components: DashboardLayout,
      children: [
        {
          path: "user",
          name: "User Profile",
          component: UserProfile
        }
      ]
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        default: Profile,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/form",
      name: "form",
      components: {
        default: ReserveForm,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    },

    {
      path: "/kanban",
      components: { default: Kanban, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/archives",
      components: { default: Achieve, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },

    {
      path: "/detail/:id",
      components: { default: Detail, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/announcement/:ancId",
      components: {
        default: Announcement,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: {
          colorOnScroll: 400
        }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
