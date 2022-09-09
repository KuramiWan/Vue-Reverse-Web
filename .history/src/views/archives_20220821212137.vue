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
                    <md-select v-model="selectPage" @change="reRender">
                      <md-option
                        v-for="page in pages"
                        :key="page"
                        value="page"
                        >{{ page }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label for="month">月</label>
                    <md-select v-model="selectPage" @change="reRender">
                      <md-option
                        v-for="page in pages"
                        :key="page"
                        value="page"
                        >{{ page }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
              </div>
            </div>

            <timeline v-for="(timeblock, index) in timeblocks" :key="index">
              <router-link :to="'/detail/' + timeblock.id">
                <timeline-title></timeline-title>
                <timeline-item
                  icon-size="mudium"
                  bg-color="#9dd8e0"
                  @click="goDetail"
                >
                  <div>
                    <p>ID: {{ timeblock.id }}</p>
                    <h4>标题: {{ timeblock.title }}</h4>
                    <p>
                      <ins>状态: {{ timeblock.status }}</ins>
                    </p>
                    <p>
                      <small>问题: {{ timeblock.question }}</small>
                    </p>
                    <p>
                      <small>时间: {{ timeblock.createTime }}</small>
                    </p>
                  </div>
                </timeline-item>
              </router-link>
              <timeline-item :hollow="true"></timeline-item>
            </timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-cute-timeline/dist/index.css";

import axios from "axios";
import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";

export default {
  bodyClass: "archives-page",
  data() {
    return {
      pages: [],
      timeblocks: [],
      selectPage: 2022
    };
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
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
    reRender() {}
  },

  created() {
    axios
      .post("/archives")
      .then(response => {
        var blocks = response.data;
        console.log(blocks);
        const statusMap = {
          undone: "未完成",
          processing: "进行中",
          completed: "已完成",
          cancel: "取消"
        };
        blocks.forEach(block => {
          this.blocks.createTime = new Date(this.block.createTime);
          Object.keys(statusMap).forEach(obj => {
            if (block.status == obj) {
              block.status = statusMap[obj];
            }
          });
        });

        this.timeblocks = blocks;
      })
      .catch(function(error) {});
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
