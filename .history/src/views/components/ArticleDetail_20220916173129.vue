<template>
  <div class="mainArticleDetail">
    <div class="content">
      <div class="md-headline top-line">{{ detail.title }}</div>
      <div class="top-line md-caption">
        <span class="mate-label ">更新于</span>{{ detail.createTime }}
      </div>
      <p class="line ">
        <span class="md-body-2 mate-label">Q:</span>
        <span class="md-body-1">{{ detail.question }}</span>
      </p>

      <div>
        <!-- directive -->
        <div class="images" v-viewer>
          <p class="md-body-1">image:</p>
          <img
            v-for="src in detail.image"
            :key="src"
            :src="src"
            height="100px"
            width="100px"
          />
        </div>
        <!-- component -->
        <!-- <viewer :images="images">
          <img v-for="src in images" :key="src" :src="src" />
        </viewer> -->
        <!-- api
        <button type="button" @click="show">Click to show</button> -->
      </div>
      <p class="line "><span class="md-body-2 mate-label">A:</span></p>
      <div v-html="markDownToHTML"></div>
      <div class="button-line">
        <!-- <md-chip
          v-for="tag in detail.tag"
          :key="tag"
          class="md-primary"
          md-deletable
          >{{ tag }}</md-chip
        > -->
        <md-chip class="md-info tag-label">{{ detail.tag }}</md-chip>
      </div>
    </div>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
Vue.use(VueViewer);
import { marked } from "marked";
export default {
  data() {
    return {
      images: ["https://easyimg.kurami.ga/i/2022/09/06/qsn0ct.webp"]
    };
  },

  methods: {
    show() {
      this.$viewerApi({
        images: this.images
      });
    },
    markDownToHTML() {
      var markdown = this.detail.answer;
      return marked(markdown);
    }
  },
  props: {
    detail: {
      type: Object
    }
  },
  components: {}
};
</script>

<style scoped>
.images {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
}
.top-line {
  padding-top: 10px;
  padding-bottom: 10px;
}
.line {
  margin-bottom: 16px;
}
.tag-label {
  margin: 20px;
}
</style>
