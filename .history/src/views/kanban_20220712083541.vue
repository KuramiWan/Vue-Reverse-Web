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
          <div>
            <kanban-board :stages="stages" :blocks="blocks">
              <div v-for="stage in stages" :slot="stage" :key="stage">
                <h2>{{ stage }}</h2>
              </div>
              <div v-for="block in blocks" :slot="block.id" :key="block.id">
              <a href="" class="href"></a>
                <div><strong>id:</strong> {{ block.id }}</div>
                <div><strong>姓名:</strong>{{ block.name }}</div>
                <div>
                  {{ block.question }}
                </div>
              </div>
            </kanban-board>
            <div class="inquire">
              <md-field>
                <label>查找你的预约</label>
                <md-input v-model="username"></md-input>
              </md-field>
              <md-button @click="inquery" class="md-simple md-success md-lg"
                >查询</md-button
              >
            </div>
            <div v-if="result">
              <md-card>
                <md-card-header>
                  <div class="md-title">{{ resultBlock.name }}</div>
                </md-card-header>

                <md-card-content>
                  <strong>ID:</strong>
                  <p class="Subheading">{{ resultBlock.id }}</p>
                  <strong>状态: </strong>
                  <p class="Subheading">{{ resultBlock.status }}</p>
                  <strong>问题: </strong>
                  <p class="caption">{{ resultBlock.question }}</p>
                </md-card-content>
              </md-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-cute-timeline/dist/index.css";
import axios from "axios";

export default {
  bodyClass: "profile-page",
  data() {
    return {
      stages: ["未完成", "进行中", "已完成", "取消"],
      blocks: [],
      result: false,
      username: null,
      resultBlock: []
    };
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
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    inquery: function() {
      axios.post("/inquery", { name: this.username }).then(response => {
        if (response.data != null) {
          this.result = true;
        }
        this.resultBlock = response.data;
      });
    }
  },
  created() {
    axios
      .get("/kanban")
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
          Object.keys(statusMap).forEach(obj => {
            if (obj == block.status) {
              console.log(statusMap[obj]);
              block.status = statusMap[obj];
              console.log(block.status);
            }
          });
        });
        this.blocks = blocks;
      })
      .catch(function(error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
      });
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}
.kanban {
  display: flex;
}
.inquire {
  display: flex;
  justify-content: right;
}
.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .kanbanContent {
    width: 60 px;
    margin: 20px;
  }
  .md-card {
    margin: 40px;
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
