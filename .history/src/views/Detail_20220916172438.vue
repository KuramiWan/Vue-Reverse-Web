<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
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
                  <div class="card">
                    <router-link to="path">
                      <div class="md-title">标题</div>
                      <div class="md-subhead">时间</div>
                    </router-link>
                  </div>
                </div>
                <div class="md-elevation-3 tagCard sideCard">
                  <div class="md-title">标签</div>
                  <router-link to="path">
                    <span class="md-caption cardText">tag</span>
                  </router-link>
                  <router-link to="path">
                    <span class="md-caption">tag</span>
                  </router-link>
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
import axios from "axios";

import notification from "../util/Notification";

export default {
  bodyClass: "archives-page",
  data() {
    return {
      detail: {
        title: "这是怎么回事捏",
        id: 1,
        question:
          "发生什么事了,发生什么事了,发生什么事了,发生什么事了,发生什么事了,发生什么事了,发生什么事了,",
        tag: "超!",
        createTime: "2017-08-30T03:34:25.000+00:00",
        answer: "",
        image:
          "https://easyimg.kurami.ga/application/thumb.php?img=/i/2022/09/06/qsn0ct.webp"
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
    search() {
      if (this.question == "") {
        this.isShow = false;
        return;
      }
      notification
        .post("/archives/search", {
          searchContent: this.question,
          //pagination unfinished
          pageNum: "1",
          pageSize: "5"
        })
        .then(response => {
          if (response.data.data == null) {
            this.isShow = false;
            return;
          }
          this.isShow = true;
          this.searchResult = response.data.data;
        });
    },
    getArchives() {
      notification
        .post("/archives", {
          pageNum: this.pagination.pageNum,
          pageSize: this.pagination.pageSize
        })
        .then(response => {
          var timeBlocks = response.data.data;
          const statusMap = {
            undone: "未完成",
            processing: "进行中",
            completed: "已完成",
            cancel: "取消"
          };
          timeBlocks.forEach(blocks => {
            blocks.archivesListVo.forEach(block => {
              block.createTime = new Date(
                block.createTime
              ).toLocaleDateString();
              Object.keys(statusMap).forEach(obj => {
                if (block.status == obj) {
                  block.status = statusMap[obj];
                }
              });
            });
          });
          this.timeBlocks = timeBlocks;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPageCount() {
      axios
        .get("/archives/pageCount")
        .then(response => {
          this.pagination.pageCount = Math.ceil(
            response.data.data / this.pagination.pageSize
          );
        })
        .catch(e => {
          console.log(e);
        });
    },
    goDetail() {
      this.$router.push("/detail/:id");
    },
    input(currentPage) {
      this.pagination.pageNum = currentPage;
      this.getArchives();
    }
  },

  created() {
    this.getArchives();
    this.getPageCount();
  },
  mounted() {
    console.log(this.timeBlocks);
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
