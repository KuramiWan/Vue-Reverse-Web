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
            <div class="md-layout">
              <div v-html="markdownToHtml"></div>
              <div
                class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import notification from "../util/Notification";
export default {
  bodyClass: "archives-page",
  data() {
    return {
      announcementDetail: null
    };
  },
  components: {},

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
    markdownToHtml() {
      console.log(this.announcementDetail.markdown);
      return marked.parse("### 2123123");
    }
  },

  created() {
    notification({
      method: "get",
      url: "/announcement/" + this.$route.params.ancId //announcement Id --ancId
    })
      .then(response => {
        this.announcementDetail = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
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
