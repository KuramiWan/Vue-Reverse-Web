<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout ">
          <div
            class="md-layout-item md-size-66 md-xsmall-size-100 mx-anto text-center animateFadeInUp"
          ></div>

          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">公告</h1>
          </div>
        </div>
      </div></parallax
    >
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile"></div>
            </div>
          </div>
          <div class="description text-center"></div>
          <div class="mainAchieve">
            <div class="md-layout">
              <div
                class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center "
              >
                <div>
                  <div v-if="adminShow">
                    <md-button
                      class="md-icon-button md-primary button"
                      @click="isEdit"
                    >
                      <md-icon>edit</md-icon>
                    </md-button>
                    <md-button
                      class="md-icon-button md-primary button"
                      @click="update"
                    >
                      <md-icon>done</md-icon>
                    </md-button>
                  </div>

                  <v-md-editor
                    v-if="EditKey"
                    :v-model="editorMarkDown"
                    height="400px"
                  ></v-md-editor>
                  <div v-html="markdownToHtml"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import hljs from "highlight.js";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import { marked } from "marked";
import { notification } from "../util/Notification";
VMdEditor.use(githubTheme, {
  Hljs: hljs
});
Vue.use(VMdEditor);
export default {
  bodyClass: "archives-page",
  data() {
    return {
      adminShow: false,
      EditKey: false,
      announcementDetail: {},
      markdown: "# Marked in Node.js\n\nRendered by **marked**."
    };
  },
  components: {},

  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    }
  },
  methods: {
    editorMarkDown() {
      return "### 123";
    },
    isAdmin() {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo.permissions > 1) {
        this.adminShow = true;
        return;
      }
      this.adminShow = false;
    },
    isEdit() {
      this.EditKey = !this.EditKey;
    },
    update() {
      notification
        .post("/admin/announcement/update", this.announcementDetail, {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {
    notification({
      method: "get",
      url: "/announcement/" + this.$route.params.ancId //announcement Id --ancId
    })
      .then(response => {
        this.announcementDetail = response.data.data;
        this.markdown = response.data.data.markdown;
      })
      .catch(error => {
        console.log(error);
      });
    this.isAdmin();
  },
  computed: {
    markdownToHtml() {
      return marked.parse(this.markdown);
    },
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.pagination {
  justify-content: center;
}
.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
