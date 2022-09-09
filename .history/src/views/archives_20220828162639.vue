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
            <md-field class="md-form-group-outline" slot="inputs">
              <md-icon>lock_outline</md-icon>
              <label>查找你的问题</label>
              <md-input v-model="question"></md-input>
            </md-field>
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
                <timeline>
                  <timeline-title :bg-color="blue">文章总览</timeline-title>
                  <div
                    v-for="(paginatedBlock, index) in paginatedBlocks"
                    :key="index"
                  >
                    <router-link :to="'/detail/' + paginatedBlock.id">
                      <timeline-item
                        icon-size="mudium"
                        bg-color="#9dd8e0"
                        @click="goDetail"
                      >
                        <div>
                          <p>ID: {{ paginatedBlock.id }}</p>
                          <h4>标题: {{ paginatedBlock.title }}</h4>
                          <p>
                            <ins>状态: {{ paginatedBlocks.status }}</ins>
                          </p>
                          <p>
                            <small>问题: {{ paginatedBlock.question }}</small>
                          </p>
                          <p>
                            <small>时间: {{ paginatedBlock.createTime }}</small>
                          </p>
                        </div>
                      </timeline-item>
                    </router-link>
                  </div>
                </timeline>
                <pagination
                  v-model="pagination.page"
                  :pageCount="pageCountComputed"
                  :perPage="pagination.perPage"
                  @input="input"
                />
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

export default {
  bodyClass: "archives-page",
  data() {
    return {
      timeBlocks: [],
      paginatedBlocks: [],
      FilterBlocks: [],
      selectedQuestion: null,
      question: [],
      pagination: {
        perPage: 5,
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
    getArchives() {
      axios
        .post("/archives")
        .then(response => {
          var blocks = response.data;
          const statusMap = {
            undone: "未完成",
            processing: "进行中",
            completed: "已完成",
            cancel: "取消"
          };
          blocks.forEach(block => {
            block.createTime = new Date(Number(block.createTime)).toString(
              undefined
            );

            Object.keys(statusMap).forEach(obj => {
              if (block.status == obj) {
                block.status = statusMap[obj];
              }
            });
          });
          this.timeBlocks = blocks;

          this.input(1);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goDetail() {
      this.$router.push("/detail/:id");
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
      var perPage = this.pagination.perPage;
      var startItem = (currentPage - 1) * perPage;
      var blocks = [];
      var endItem = currentPage * perPage - 1;

      blocks = this.timeBlocks;

      this.paginatedBlocks = blocks.slice(startItem, endItem);
    }
  },

  created() {
    this.getArchives();
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
  mounted() {},
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    pageCountComputed() {
      var blocks = [];

      blocks = this.timeBlocks;

      return Math.ceil((blocks.length + 1) / this.pagination.perPage);
    }
  }
};
</script>

<style lang="scss" scoped>
.newArticle {
  min-height: 30%;
  max-height: auto;
  display: flex;
  flex-direction: column;
}
.sideCard {
  height: auto;
  width: 100%;
  border-radius: 5px;
  padding: 25px;
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
