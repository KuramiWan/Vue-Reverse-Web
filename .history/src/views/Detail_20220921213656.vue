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
            <h1 class="title">记录归档</h1>
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
            <div class="md-layout md-gutter md-alignment-top">
              <div
                class="md-layout-item md-large-size-30 md-medium-size-33  md-xsmall-size-100 sideBar"
              >
                <div class="md-elevation-3 newArticle sideCard">
                  <div class="md-title">最新文章</div>
                  <div
                    class="card"
                    v-for="(article, index) in newArticles"
                    :key="index"
                  >
                    <router-link :to="'/detail/' + article.id">
                      <div class="md-title">{{ article.title }}</div>
                      <div class="md-subhead timeHide">
                        {{ article.createTime }}
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="md-elevation-3 tagCard sideCard">
                  <div class="md-title">标签</div>
                  <span
                    v-for="tag in tags"
                    :key="tag"
                    @click="onSelectTag(tag)"
                    class="md-caption cardText"
                    >{{ tag }}</span
                  >
                </div>
              </div>
              <div
                class="md-layout-item md-large-size-70 md-medium-size-66  md-xsmall-size-100 mainBar"
              >
                <div class="md-elevation-3 ">
                  <div class="mainArticle">
                    <ArticleDetailVue :detail="detail"> </ArticleDetailVue>
                  </div>
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
import "vue-cute-timeline/dist/index.css";
import ArticleDetailVue from "./components/ArticleDetail.vue";
import { notification } from "../util/Notification";
import axios from "axios";
export default {
  bodyClass: "archives-page",
  data() {
    return {
      tags: [],
      newArticles: [],
      detail: {
        title: "",
        id: 1,
        question: "",
        tag: "",
        createTime: "",
        answer: "",
        image: [""]
      }
    };
  },
  components: {
    ArticleDetailVue
  },
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
    getTag() {
      axios
        .get("/archives/tag")
        .then(response => {
          this.tags = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getNewArticle() {
      axios
        .get("/archives/newArticles")
        .then(response => {
          this.newArticles = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDetail() {
      notification
        .get("/detail/" + this.$route.params.id)
        .then(response => (this.detail = response.data.data))
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {
    this.getDetail();
    this.getTag();
    this.getNewArticle();
  },
  mounted() {},
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.mainAchieve {
  padding-top: 20px;
}
.newArticle {
  min-height: 30%;
  max-height: auto;
  display: flex;
  flex-direction: column;
}

.cardText {
  padding: 15px;
}
.sideBar {
  min-height: 600px;
  max-height: 1200px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.mainBar {
  height: auto;
  margin-top: 8px;
  margin-bottom: 8px;
}
.color {
  width: 100%;
  height: 100%;
  background-color: purple;
}
.section {
  padding: 0;
}
.mousehover {
  background-color: #e0e0e0;
  box-shadow: #bdbdbd;
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
