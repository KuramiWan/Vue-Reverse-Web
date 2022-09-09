<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">计算机义诊</h1>
            <h4>
              海南师范大学青协计算机义诊,志愿帮助同学与老师解决计算机问题.Windows蓝屏,软件故障,硬件故障物体推断,使用帮助及各种疑难杂症
            </h4>
            <br />
            <md-button href="#/form" class="md-success md-lg" target="_blank"
              ><i class="fas fa-play"></i> 服务预约入口</md-button
            >
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
              v-showDirective="handleScroll"
              class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center animateFadeInUp"
            >
              <h2 class="title text-center">服务公告</h2>
              <h5 class="description">
                请了解<a href="#/announcement">「计算机义诊」可接受服务政策</a
                >,活动于每周二信息院107开展.
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div
                v-showDirective="handleScroll"
                class="md-layout-item md-medium-size-33 md-small-size-100 animateFadeInUp"
              >
                <div class="info">
                  <a href="#/kanban">
                    <div class="icon icon-info">
                      <md-icon>chat</md-icon>
                    </div>
                    <h4 class="info-title">预约状态查看</h4>
                  </a>
                  <p>
                    查看预约进展与完成状态
                  </p>
                </div>
              </div>
              <div
                v-showDirective="handleScroll"
                class="md-layout-item md-medium-size-33 md-small-size-100 animateFadeInUp"
              >
                <div class="info">
                  <a href="#/form">
                    <div class="icon icon-success">
                      <md-icon>verified_user</md-icon>
                    </div>
                  </a>
                  <h4 class="info-title">预约入口</h4>
                  <p>
                    填写相关信息与联系方式
                  </p>
                </div>
              </div>
              <div
                v-showDirective="handleScroll"
                class="md-layout-item md-medium-size-33 md-small-size-100 animateFadeInUp"
              >
                <div class="info">
                  <a href="#/archives">
                    <div class="icon icon-danger">
                      <md-icon>fingerprint</md-icon>
                    </div>
                    <h4 class="info-title">问题归档</h4>
                    <p>
                      了解过往其他服务解决方案,提供更多参考
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section text-center">
        <div class="container">
          <h2 class="title">我们的团队</h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <!-- <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg1"
                        alt="Thumbnail Image"
                        class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Gigi Hadid
                      <br />
                      <small class="card-description text-muted">Model</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </md-card-content>

                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg2"
                        alt="Thumbnail Image"
                        class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Carla Hortensia
                      <br />
                      <small class="card-description text-muted"
                        >Designer</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </md-card-content>

                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-linkedin"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="teamImg3"
                        alt="Thumbnail Image"
                        class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Kendall Jenner
                      <br />
                      <small class="card-description text-muted">Model</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </md-card-content>

                    <md-card-actions class="text-center">
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                      <md-button
                        href="javascript:void(0)"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">加入我们</h2>
              <h4 class="text-center description">
                拥有一定的计算机知识,能独立解决计算机问题,欢迎加入我们.填写信息或者联系我们的邮箱
              </h4>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Your Name</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Your Email</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Your Message</label>
                  <md-textarea v-model="message"></md-textarea>
                </md-field>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success" @click="submitMessage()"
                      >提交</md-button
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios, { Axios } from "axios";

export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
    }
  },
  data() {
    return {
      name: null,
      email: null,
      message: null
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },

  methods: {
    handleScroll: function(evt, el) {
      const viewWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const { top, right, bottom, left } = el.getBoundingClientRect();
      if (
        viewHeight > 0 &&
        viewWidth > 0 &&
        bottom < viewHeight &&
        left < viewWidth
      ) {
        el.setAttribute(
          "style",
          "animation: fadeInUp;animation-duration: 2s;opacity:1; "
        );
      }
      return false;
    },
    submitMessage: function() {
      axios
        .post("/contact", {
          contactName: this.name,
          contactMessage: this.message,
          contactEmail: this.email
        })
        .then(response => {
          if (response.code == 200) {
            this.$vToastify.success("提交成功");
          }
          if (response.code == 500) {
            this.$vToastify.error("失败", response.message);
          }
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  },
  directives: {
    showDirective: {
      inserted: function(el, binding) {
        let showDirective = function(evt) {
          console.log(evt);
          if (binding.value(evt, el)) {
            console.log("remove");
            window.removeEventListener("scroll", showDirective);
          }
        };
        window.addEventListener("scroll", showDirective);
        console.log("add");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
.showAnimate {
  animation: fadeInUp;
  animation-duration: 5s;
}
.animateFadeInUp {
  // animation: fadeInUp;
  // animation-duration: 2s;
  opacity: 0;
}
</style>
