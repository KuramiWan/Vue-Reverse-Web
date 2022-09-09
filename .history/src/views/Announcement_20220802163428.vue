<template>
  <div v-html="markdown"></div>
</template>

<script>
import axios from "axios";

import marked from "marked";
export default {
  bodyClass: "archives-page",
  data() {
    return {
      markdown: markdown,
      block: [],
      id: this.$route.params.id
    };
  },
  components: {},
  computed: {
    markdownToHtml() {
      return marked(this.markdown);
    }
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
  methods: {},

  created() {
    axios({
      method: "get",
      url: "/announcement/" + this.$route.params.ancId //announcement Id --ancId
    })
      .then(response => {
        this.markdown = response.data;
      })
      .catch();
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
