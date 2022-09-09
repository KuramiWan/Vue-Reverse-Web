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
            <pagination-vue
              v-model="infoPagination"
              :page-count="3"
              
            >
            </pagination-vue>

            <kanban-board
              :stages="stages"
              :blocks="blocks"
              @update-block="updateBlock"
            >
              <div v-for="stage in stages" :slot="stage" :key="stage">
                <h2>{{ stage }}</h2>
              </div>
              <div v-for="block in blocks" :slot="block.id" :key="block.id">
                <div><strong>id:</strong> {{ block.id }}</div>
                <div>
                  {{ block.title }}
                </div>
              </div>
            </kanban-board>
            <div class="inquire">
              <md-field>
                <label>查找你的预约</label>
                <md-input v-model="initial"></md-input>
              </md-field>
              <md-button class="md-simple md-success md-lg">查询</md-button>
            </div>
            <div v-if="query"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-cute-timeline/dist/index.css";
import PaginationVue from "../components/Pagination.vue";
export default {
  bodyClass: "achieve-page",
  data() {
    return {
      stages: ["on-hold", "in-progress", "needs-review", "approved"],
      blocks: [
        {
          id: 1,
          status: "on-hold",
          title: "Test"
        }
      ],
      infoPagination: 2
    };
  },
  components: {
    PaginationVue
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
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}
.inquire {
  display: flex;
  justify-content: right;
}
.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  .pagination {
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
