<template>
  <div class="mainArticleDetail">
    <div class="content">
      <div v-if="adminShow">
        <md-button class="button md-info" @click="isEdit">
          <span>编辑</span>
        </md-button>
        <md-button class="button md-success" @click="uploadMarkdown">
          <span>确认</span>
        </md-button>
      </div>
      <div class="md-headline top-line">{{ detail.title }}</div>
      <md-field v-if="EditKey">
        <label>标题</label>
        <md-input v-model="detail.title"></md-input>
      </md-field>
      <div class="top-line md-caption tag">
        <span class="mate-label ">更新于</span>{{ detail.createTime }}
      </div>
      <div class="top-line md-caption ">
        <span class="mate-label  ">标签:</span><span>{{ detail.tag }}</span>
      </div>
      <md-field v-if="EditKey">
        <label>标签:</label>
        <md-input v-model="detail.tag"></md-input>
      </md-field>
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
      <v-md-editor
        v-if="EditKey"
        v-model="detail.answer"
        height="400px"
      ></v-md-editor>
      <div v-html="markDownToHTML"></div>
      <div class="button-line">
        <!-- <md-chip
          v-for="tag in detail.tag"
          :key="tag"
          class="md-primary"
          md-deletable
          >{{ tag }}</md-chip
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
VMdEditor.use(githubTheme, {
  Hljs: hljs
});
Vue.use(VMdEditor);
Vue.use(VueViewer);

import { marked } from "marked";
import { notification } from "../../util/Notification";
export default {
  data() {
    return {
      adminShow: false,
      EditKey: false,
      images: ["https://easyimg.kurami.ga/i/2022/09/06/qsn0ct.webp"]
    };
  },

  methods: {
    isAdmin() {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo);
      if (userInfo.permissions > 1) {
        this.adminShow = true;
        return;
      }
      this.adminShow = false;
    },
    isEdit() {
      this.EditKey = !this.EditKey;
    },
    uploadMarkdown() {
      notification
        .post("./admin/detail/update", this.detail, {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    },
    show() {
      this.$viewerApi({
        images: this.images
      });
    }
  },
  props: {
    detail: {
      type: Object
    }
  },
  created() {
    this.images = this.detail.image;
    this.isAdmin();
  },
  components: {},
  mounted() {
    if (this.detail.answer == null) {
      this.detail.answer = "# Marked in Node.js\n\nRendered by **marked**.";
    }
  },
  computed: {
    markDownToHTML() {
      var markdown = this.detail.answer;
      if (markdown == null) {
        markdown = "# Marked in Node.js\n\nRendered by **marked**.";
      }
      return marked(markdown);
    }
  }
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
.button {
  margin: 20px;
}
.tag {
  width: 155px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
