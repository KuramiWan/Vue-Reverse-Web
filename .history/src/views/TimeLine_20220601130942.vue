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
            <template>
              <pagination
                v-model="infoPagination"
                :page-count="3"
                class="pagination"
                withText="true"
              >
              </pagination>
            </template>
            <timeline>
              <timeline-title>{{ time }}</timeline-title>
              <timeline-item :icon-size="large" bg-color="#9dd8e0"
                >3:00~4:00</timeline-item
              >
              <timeline-item :hollow="true"></timeline-item>
            </timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";
import "vue-cute-timeline/dist/index.css";
import { Pagination } from "@/components";
export default {
  components: { Timeline, TimelineItem, TimelineTitle, Pagination },
  bodyClass: "profile-page",
  data() {
    return {
      infoPagination: 2
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
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
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
.pagination {
  width: 150px;
  margin: 0 auto;
}
</style>
