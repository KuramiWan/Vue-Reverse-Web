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
              
              <div
                class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center "
              >
                <div v-html="markdownToHtml">
                <md-tooltip md-dir></md-tooltip>
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
import { marked } from "marked";
import notification from "../util/Notification";
export default {
  bodyClass: "archives-page",
  data() {
    return {
      announcementDetail: {},
      markdown: "# Marked in Node.js\n\nRendered by **marked**."
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
  methods: {},

  created() {
    notification({
      method: "get",
      url: "/announcement/" + this.$route.params.ancId //announcement Id --ancId
    })
      .then(response => {
        this.announcementDetail = response.data.data;
        this.markdown = response.data.data.markdown;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    markdownToHtml() {
      return marked.parse(this.markdown);
    },
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
