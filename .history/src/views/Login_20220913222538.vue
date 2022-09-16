<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card v-if="LoR" header-color="green">
              <h4 slot="title" class="card-title">登录</h4>
              <!-- <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button> -->
              <!-- <p slot="description" class="description">Or Be Classical</p> -->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>用户名...</label>
                <md-input v-model="userName"></md-input>
              </md-field>
              <!-- <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>邮箱...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field> -->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>密码...</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon class="material-icons">
                  keyboard_double_arrow_right
                </md-icon>
                <label>验证...</label>
                <md-input v-model="captcha"></md-input>
              </md-field>

              <div slot="tips" class="md-caption line">
                <i class="material-icons mate-label">
                  notifications_active
                </i>
                没有帐号?无需帐号也可
                <router-link to="/form" class="mate-label"
                  >前往预约</router-link
                >
                或者
                <router-link to="/register" class="mate-label"
                  >注册帐号</router-link
                >
              </div>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="login"
              >
                Lets Go
              </md-button>
            </login-card>
            <login-card v-if="!LoR" header-color="green">
              <h4 slot="title" class="card-title">注册</h4>
              <!-- <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button> -->
              <!-- <p slot="description" class="description">Or Be Classical</p> -->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>用户名...</label>
                <md-input v-model="userName"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>邮箱...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>确认密码...</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>密码...</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon class="material-icons">
                  keyboard_double_arrow_right
                </md-icon>
                <label>验证...</label>
                <md-input v-model="captcha"></md-input>
              </md-field>

              <div slot="tips" class="md-caption line">
                <i class="material-icons mate-label">
                  notifications_active
                </i>
                没有帐号?无需帐号也可
                <router-link to="/form" class="mate-label"
                  >前往预约</router-link
                >
                或者
                <div class="mate-label" @click="register">注册帐号</div>
              </div>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="login"
              >
                Lets Go
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
import notification from "../util/Notification";

export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      LoR: true,
      userName: null,
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      notification
        .post("/login", { userName: this.userName, password: this.password })
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    },
    register() {
      this.LoR = false;
    }
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="css">
.wrapper {
  height: 100vh;
}
</style>
