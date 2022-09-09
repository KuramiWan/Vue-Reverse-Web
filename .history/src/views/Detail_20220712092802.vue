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
              <strong> 标题 : </strong>{{}}{{ id }}
              <p class="md-title">{{ block.title }}</p>
              <p class="Subheading">{{ block.quetion }}</p>
              <hr />
              <p class="Subheading">{{ block.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  bodyClass: "archives-page",
  data() {
    return {
      block: [],
      id: this.$route.params.id
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
    axios
      .get("/detail/" + this.$route.params.id)
      .then(response => {
        this.block = response.data;
      })
      .catch(function(error) {
        console.log(error.response);
        console.log(this.$route.params.id);
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
