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
            <div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field>
                    <label for="year">年</label>
                    <md-select
                      v-model="timeFilter.years"
                      @change="filterRerender"
                    >
                      <md-option
                        v-for="year in selectOption.selectYear"
                        :key="year"
                        value="year"
                        >{{ year }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label for="month">月</label>
                    <md-select
                      v-model="timeFilter.months"
                      @change="filterRerender"
                    >
                      <md-option
                        v-for="month in selectOption.selectMonth"
                        :key="month"
                        value="month"
                        >{{ month }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label for="month">日</label>
                    <md-select
                      v-model="timeFilter.days"
                      @change="filterRerender"
                    >
                      <md-option
                        v-for="day in selectOption.selectDay"
                        :key="day"
                        value="day"
                        >{{ day }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
              </div>
            </div>

            <timeline
              v-for="(paginatedBlock, index) in paginatedBlocks"
              :key="index"
            >
              <router-link :to="'/detail/' + paginatedBlock.id">
                <timeline-title></timeline-title>
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
              <timeline-item :hollow="true"></timeline-item>
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
      timeFilter: {
        years: "",
        months: "",
        days: ""
      },
      timeBlocks: [],
      paginatedBlocks: [],
      FilterBlocks: [],
      selectOption: {
        selectYear: [],
        selectMonth: [],
        selectDay: []
      },
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

          this.filter();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goDetail() {
      this.$router.push("/detail/:id");
    },
    filterRerender() {
      var year = this.year;
      var month = this.month;
      var day = this.day;
      var filterBlocks = [];
      this.timeBlocks.forEach(block => {
        var createdTime = new Date(block.createTime);
        if (
          year == createdTime.getFullYear() ||
          month == createdTime.getMonth() ||
          day == createdTime.getDay()
        ) {
          filterBlocks.push(block);
        }
      });
      this.filterBlocks = filterBlocks;
      this.input(1);
    },
    filter() {
      var year = [];
      var month = [];
      var day = [];
      this.timeBlocks.forEach(block => {
        var createdTime = new Date(block.createTime);
        year.push(createdTime.getFullYear());
        month.push(createdTime.getMonth());
        day.push(createdTime.getDay());
      });
      year = new Set(year);
      month = new Set(month);
      day = new Set(day);
      this.selectOption.selectYear = year;
      this.selectOption.selectMonth = month;
      this.selectOption.selectDay = day;
    },
    input(currentPage) {
      var perPage = this.pagination.perPage;
      var startItem = (currentPage - 1) * perPage;
      var blocks = [];
      var endItem = currentPage * perPage - 1;
      console.log(this.timeFilter.year);
      if (
        this.timeFilter.year&&
        this.timeFilter.month&&
        this.timeFilter.day
      ) {
        console.log(this.timeBlocks);
        blocks = this.timeBlocks;
      } else {
        blocks = this.filterBlocks;
        console.log(blocks);
      }

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
      if (
        this.timeFilter.year === "" &&
        this.timeFilter.month === "" &&
        this.timeFilter.day === ""
      ) {
        console.log(this.timeBlocks);
        blocks = this.timeBlocks;
      } else {
        blocks = this.filterBlocks;
        console.log(blocks.length);
      }

      return Math.ceil((blocks.length + 1) / this.pagination.perPage);
    }
  }
};
</script>

<style lang="scss" scoped>
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
