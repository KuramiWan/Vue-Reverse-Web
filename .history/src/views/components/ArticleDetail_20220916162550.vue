<template>
  <div class="mainArticleDetail">
    <div class="content">
      <div class="md-headline top-line">title</div>
      <div class="top-line md-caption">subtitle</div>
      <p class="line ">
        <span class="md-body-2 mate-label">Q:</span>
        <span class="md-body-1">question</span>
      </p>

      <div>
        <!-- directive -->
        <div class="images" v-viewer>
          <img v-for="src in images" :key="src" :src="src" />
        </div>
        <!-- component -->
        <viewer :images="images">
          <img v-for="src in images" :key="src" :src="src" />
        </viewer>
        <!-- api -->
        <button type="button" @click="show">Click to show</button>
      </div>

      <img src="" alt="" />
      <p class="line "><span class="md-body-2 mate-label">A:</span></p>
      <div v-html="markDownToHTML"></div>
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
.top-line {
  padding: 10px, 0px;
}
.line {
  margin-bottom: 16px;
}
</style>
