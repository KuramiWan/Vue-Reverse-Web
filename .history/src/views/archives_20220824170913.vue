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
                    <md-select v-model="selectYear" @change="reRender">
                      <md-option
                        v-for="year in years"
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
                    <md-select v-model="selectMonth" @change="reRender">
                      <md-option
                        v-for="month in months"
                        :key="month"
                        value="month"
                        >{{ page }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label for="month">日</label>
                    <md-select v-model="selectDay" @change="reRender">
                      <md-option v-for="day in days" :key="day" value="day">{{
                        day
                      }}</md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>
            </div>

            <timeline v-for="(timeBlock, index) in timeBlocks" :key="index">
              <router-link :to="'/detail/' + timeBlock.id">
                <timeline-title></timeline-title>
                <timeline-item
                  icon-size="mudium"
                  bg-color="#9dd8e0"
                  @click="goDetail"
                >
                  <div>
                    <p>ID: {{ timeBlock.id }}</p>
                    <h4>标题: {{ timeBlock.title }}</h4>
                    <p>
                      <ins>状态: {{ timeBlock.status }}</ins>
                    </p>
                    <p>
                      <small>问题: {{ timeBlock.question }}</small>
                    </p>
                    <p>
                      <small>时间: {{ timeBlock.createTime }}</small>
                    </p>
                  </div>
                </timeline-item>
              </router-link>
              <timeline-item :hollow="true"></timeline-item>
            </timeline>
            <pagination
              v-model="page"
              :pageCount="10"
              :perPage="perPage"
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
      years: [],
      months: [],
      days: [],
      timeBlocks: [],
      paginatedBlocks: [],
      selectYear: [],
      selectMonth: [],
      selectDay: [],
      pagination:{
        perPage:5;
        pageCount : perPage.pageCountComputed 
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
    goDetail() {
      this.$router.push("/detail/:id");
    },
    reRender() {},
    input(currentPage) {
      var perPage =5
      var startItem = currentItems * perPage -1;
      var endItem = currentItems * (perPage+1) -1; 
      var totalItems = this.timeBlocks.length;
      var totalPages = totalItems / perPage;
      var currentItems =  {}  
      this.paginatedBlocks = this.timeBlocks.slice(startItem,endItem);
    }
  },

  created() {
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
          block.createTime = new Date(
            Number(block.createTime)
          ).toLocaleDateString(undefined);

          Object.keys(statusMap).forEach(obj => {
            if (block.status == obj) {
              block.status = statusMap[obj];
            }
          });
        });

        this.timeBlocks = blocks;
      })
      .catch(function(error) {});
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    pageCountComputed(){
      return this.perPage * 
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
