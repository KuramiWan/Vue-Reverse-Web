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
            <h1 class="title">完成记录</h1>
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
                <md-field class="md-form-group-outline" slot="inputs">
                  <md-icon>search</md-icon>
                  <label>查找你的问题</label>
                  <md-input v-model="question" @input="getArchives"></md-input>
                </md-field>
                <!-- <div v-if="isShow">
                  <article-card :searchResult="searchResult"></article-card>
                </div> -->
                <timeline>
                  <timeline-title class="md-headline" bg-color="#42a5f5"
                    >文章总览</timeline-title
                  >
                  <div v-for="(timeBlock, index) in timeBlocks" :key="index">
                    <timeline-item bg-color="#ec407a">{{
                      timeBlock.dateString
                    }}</timeline-item>
                    <div
                      v-for="(block, index) in timeBlock.archivesListVo"
                      :key="index"
                    >
                      <router-link :to="'/detail/' + block.id">
                        <timeline-item
                          icon-size="mudium"
                          bg-color="#42a5f5"
                          @click="goDetail"
                        >
                          <div>
                            <div class="md-title fontOverHide">
                              {{ block.title }}
                            </div>
                            <div class="md-caption">
                              <span class="mate-label">发表于</span>
                              <span>{{ block.createTime }}</span
                              >|
                              <span class="mate-label">文章序列号</span>
                              <span>{{ block.id }}</span
                              >|
                              <span class="mate-label">{{
                                block.category
                              }}</span>
                            </div>
                            <div class="md-body2 fontOverHide">
                              <span class="mate-label">Q:</span
                              >{{ block.question }}
                            </div>
                            <div class="md-body fontOverHide">
                              <span class="mate-label">A:</span
                              >{{ block.answer }}
                            </div>
                          </div>
                        </timeline-item>
                      </router-link>
                    </div>
                  </div>
                  <pagination
                    v-model="pagination.page"
                    :pageCount="pagination.pageCount"
                    :perPage="pagination.pageSize"
                    @input="input"
                  />
                </timeline>
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
import Pagination from "../components/Pagination.vue";
import axios from "axios";
import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";
import { notification } from "../util/Notification";
export default {
  bodyClass: "archives-page",
  data() {
    return {
      selectTag: "",
      newArticles: [],
      tags: [],
      newArticle: [],
      timeBlocks: [],
      selectedQuestion: null,
      question: "",
      isShow: false,
      searchResult: [],
      pagination: {
        pageCount: null,
        pageSize: 5,
        pageNum: 1,
        page: 1
      }
    };
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle,
    Pagination
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
    // search() {
    //   if (this.question == "") {
    //     this.isShow = false;
    //     return;
    //   }
    //   notification
    //     .post("/archives/search", {
    //       searchContent: this.question,
    //     })
    //     .then(response => {
    //       if (response.data.data == null) {
    //         this.isShow = false;
    //         return;
    //       }
    //       this.isShow = true;
    //       this.searchResult = response.data.data;
    //     });
    // },
    getArchives() {
      notification
        .post("/archives", {
          tag: this.selectTag,
          question: this.question,
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
    onSelectTag(tag) {
      this.selectTag = tag;
      this.getArchives();
    },

    // filterRerender() {
    //   var year = this.timeFilter.year;
    //   var month = this.timeFilter.month;
    //   var day = this.timeFilter.day;
    //   var filterBlocks = [];
    //   this.timeBlocks.forEach(block => {
    //     var createdTime = new Date(block.createTime);
    //     if (
    //       year == createdTime.getFullYear() ||
    //       month == createdTime.getMonth() ||
    //       day == createdTime.getDay()
    //     ) {
    //       filterBlocks.push(block);
    //     }
    //   });
    //   this.filterBlocks = filterBlocks;
    //   this.filter();
    //   this.input(1);
    // },
    // filter() {
    //   var blocks = [];
    //   if (
    //     this.timeFilter.year ||
    //     this.timeFilter.month ||
    //     this.timeFilter.day
    //   ) {
    //     blocks = this.filterBlocks;
    //   } else {
    //     blocks = this.timeBlocks;
    //   }
    //   var year = [];
    //   var month = [];
    //   var day = [];
    //   blocks.forEach(block => {
    //     var createdTime = new Date(block.createTime);
    //     year.push(createdTime.getFullYear());
    //     month.push(createdTime.getMonth());
    //     day.push(createdTime.getDay());
    //   });
    //   year = new Set(year);
    //   month = new Set(month);
    //   day = new Set(day);
    //   this.selectOption.selectYear = year;
    //   this.selectOption.selectMonth = month;
    //   this.selectOption.selectDay = day;
    // },
    input(currentPage) {
      this.pagination.pageNum = currentPage;
      this.getArchives();
    }
  },

  created() {
    this.getArchives();
    this.getPageCount();
    this.getTag();
    this.getNewArticle();

    // axios
    //   .post("/archives")
    //   .then(response => {
    //     var blocks = response.data;

    //     const statusMap = {
    //       undone: "未完成",
    //       processing: "进行中",
    //       completed: "已完成",
    //       cancel: "取消"
    //     };
    //     blocks.forEach(block => {
    //       block.createTime = new Date(
    //         Number(block.createTime)
    //       ).toLocaleDateString(undefined);

    //       Object.keys(statusMap).forEach(obj => {
    //         if (block.status == obj) {
    //           block.status = statusMap[obj];
    //         }
    //       });
    //     });

    //     this.timeBlocks = blocks;
    //   })
    //   .catch(function(error) {});
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
.timeHide {
  width: 200px;
  overflow: hidden;
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
