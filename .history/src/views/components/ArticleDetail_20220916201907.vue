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
            v-for="src in images"
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
      <md-button class="button">
        <p>编辑</p>
      </md-button>
      <p class="line "><span class="md-body-2 mate-label">A:</span></p>
      <v-md-editor v-model="markdown" height="400px"></v-md-editor>
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
export default {
  data() {
    return {
      markdown,
      images: ["https://easyimg.kurami.ga/i/2022/09/06/qsn0ct.webp"]
    };
  },

  methods: {
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
    this.markdown = this.detail.answer;
    this.images = this.detail.image;
  },
  components: {},
  computed: {
    markDownToHTML() {
      var markdown = this.detail.answer;
      return marked('
SELECT * FROM `announcement` LIMIT 1000



Wrap Contents
Content Preview
"# 「计算机义诊」可接受服务政策\n\n            > 上次更新时间：2022年8月3日\n            >\n\n            在以下说明中，「我」、「我们」均指「计算机义诊」技术支持团队；「你」、「你们」均指获得「计算机义诊」诊断或维修服务的用户或客户。\n\n            「计算机义诊」是信息科学技术学院为了解决同学们的电脑问题，而开展的志愿服务活动，且此活动由个人自发组织和参与。我们很乐意协助解决同学们的各种问题，但为了避免不必要的纠纷，烦请阅读以下「可接受服务政策」（Acceptable Serivce Policy）。\n\n            ## 一 通则\n\n            1. 我们保留本 ASP 内所有内容的解释权。\n            2. 你有义务随时查看本 ASP 内的变动与所有内容，我们可能不会在内容变更时提醒你。\n            3. 当你提交「预约支持单」时，即代表你同意本 ASP 、「线上远程协助注意事项」、「到场维修注意事项」和「服务后保障说明」内的所有内容。\n\n            ## 二 服务支持水平\n\n            1. 「计算机义诊」由个人团体组成，并拥有丰富的诊断与沟通经验。但也由于人力资源和时间有限，我们可能无法为你带来及时的技术支持与帮助。当你提交预约单后，我们的支持人员将在 5 个工作日内，通过你留下的联系方式联系你；如果我们无法联系到你，你的预约单将在我们发出联系的 5 天后被自动关闭，你需要重新提交新的预约单才能获得服务。\n            2. 我们有权向任何人拒绝提供任何服务，尤其是当支持人员的尊严和安全受到威胁时。\n            3. 我们有义务在已排定的预约时间段内，与你联系并开始维修服务。如果我们无法联系到你，我们也有权利优先服务队列中的下一位正在等待的用户。某些特殊情况可以特殊处理。\n            4. 线下维修可能不止需要现场解决，大部分需要到场维修的问题可能需要带回，并在维修完毕后联系你取回电脑。带回维修最长需要三个工作日，具体时间取决于你设备的问题与当前的预约排队进度。\n            5. 在带回维修的过程中，若我们需要你的额外操作与信息，或你提出更改取机时间段时，你的维修可能会因你的提供时间而延迟。当这种情况发生时，第 4 条中的「带回维修最长需要三个工作日」不适用。\n            6. 我们保留对维修时段安排的所有权利，并有权利为维修等待周期过长的用户提供优先服务。\n            7. 涉及到硬件改动时，我们有权拒绝提供服务，但我们会向你提出合理性的解决方案与办法。\n            8. 如果你在预定的日期由于某些原因无法到场，你可以与支持专员联系并安排下一次的预约时间。你的预约非常重要，我们将按照预约的先后顺序与进度为你尽快安排维修。\n\n            ## 三 隐私保护条例\n\n            1. 我们有义务不浏览、留存你的个人数据与文件。你可以提前与支持人员说明哪些文件属于私密，不方便被翻阅和查看。在这种情况下，支持人员将会在浏览文件前征得你的同意。\n            2. 我们有义务保护你提交「预约支持单」时填写的任何个人信息与资料。但我们仅能保证此信息不被泄漏给任何第三者，无法保证此信息不被「问卷星」平台获取。\n            3. 在线上协助时，远程操控的相关软件需要连接到此软件的服务器，并通过其服务器进行数据连接与传输。我们无法保证此软件的服务器不会记录你的设备信息，我们也不接受使用其他的远程操控软件。\n\n            ## 四 意外情况或纠纷的发生与处理\n\n            1. 若在维修过程中，你的设备因不可抗力（例如，地震，雷暴和雷击，洪水，停电等）损坏，我们将不会承担任何责任。\n            2. 若在维修过程中，你的设备因内部因素（例如，机械硬盘突然故障，内部电压不稳导致的灾难性断电等）损坏，我们将不会承担任何责任。\n            3. 你有义务在维修前备份或保存你的数据。支持人员将在涉及到个人文件或数据的操作执行前再次询问征得你的许可。在这种情况下，我们不对任何数据丢失承担责任。\n            4. 在不造成任何灾难性损坏的前提下，当任何纠纷或冲突发生时，我们有权拒绝提供服务，尤其是支持人员的尊严或人身安全受到威胁时。\n            5. 「计算机义诊」是由个人团队自发参与并组织的志愿服务活动，我们保留无理由终止此服务的权利。"
Rows1CSVJSONCSVJSON
id
markdown
title
deleted
update_time
1
# 「计算机义诊」可接受服务政策 > 上次更新时间：2022年8月3日 > 在以下说明中，「我」、「我们」均指「计算机义诊」技术支持团队；「你」、「你们」均指获得「计算机义诊」诊断或维修服务的用户或客户。 「计算机义诊」是信息科学技术学院为了解决同学们的电脑问题，而开展的志愿服务活动，且此活动由个人自发组织和参与。我们很乐意协助解决同学们的各种问题，但为了避免不必要的纠纷，烦请阅读以下「可接受服务政策」（Acceptable Serivce Policy）。 ## 一 通则 1. 我们保留本 ASP 内所有内容的解释权。 2. 你有义务随时查看本 ASP 内的变动与所有内容，我们可能不会在内容变更时提醒你。 3. 当你提交「预约支持单」时，即代表你同意本 ASP 、「线上远程协助注意事项」、「到场维修注意事项」和「服务后保障说明」内的所有内容。 ## 二 服务支持水平 1. 「计算机义诊」由个人团体组成，并拥有丰富的诊断与沟通经验。但也由于人力资源和时间有限，我们可能无法为你带来及时的技术支持与帮助。当你提交预约单后，我们的支持人员将在 5 个工作日内，通过你留下的联系方式联系你；如果我们无法联系到你，你的预约单将在我们发出联系的 5 天后被自动关闭，你需要重新提交新的预约单才能获得服务。 2. 我们有权向任何人拒绝提供任何服务，尤其是当支持人员的尊严和安全受到威胁时。 3. 我们有义务在已排定的预约时间段内，与你联系并开始维修服务。如果我们无法联系到你，我们也有权利优先服务队列中的下一位正在等待的用户。某些特殊情况可以特殊处理。 4. 线下维修可能不止需要现场解决，大部分需要到场维修的问题可能需要带回，并在维修完毕后联系你取回电脑。带回维修最长需要三个工作日，具体时间取决于你设备的问题与当前的预约排队进度。 5. 在带回维修的过程中，若我们需要你的额外操作与信息，或你提出更改取机时间段时，你的维修可能会因你的提供时间而延迟。当这种情况发生时，第 4 条中的「带回维修最长需要三个工作日」不适用。 6. 我们保留对维修时段安排的所有权利，并有权利为维修等待周期过长的用户提供优先服务。 7. 涉及到硬件改动时，我们有权拒绝提供服务，但我们会向你提出合理性的解决方案与办法。 8. 如果你在预定的日期由于某些原因无法到场，你可以与支持专员联系并安排下一次的预约时间。你的预约非常重要，我们将按照预约的先后顺序与进度为你尽快安排维修。 ## 三 隐私保护条例 1. 我们有义务不浏览、留存你的个人数据与文件。你可以提前与支持人员说明哪些文件属于私密，不方便被翻阅和查看。在这种情况下，支持人员将会在浏览文件前征得你的同意。 2. 我们有义务保护你提交「预约支持单」时填写的任何个人信息与资料。但我们仅能保证此信息不被泄漏给任何第三者，无法保证此信息不被「问卷星」平台获取。 3. 在线上协助时，远程操控的相关软件需要连接到此软件的服务器，并通过其服务器进行数据连接与传输。我们无法保证此软件的服务器不会记录你的设备信息，我们也不接受使用其他的远程操控软件。 ## 四 意外情况或纠纷的发生与处理 1. 若在维修过程中，你的设备因不可抗力（例如，地震，雷暴和雷击，洪水，停电等）损坏，我们将不会承担任何责任。 2. 若在维修过程中，你的设备因内部因素（例如，机械硬盘突然故障，内部电压不稳导致的灾难性断电等）损坏，我们将不会承担任何责任。 3. 你有义务在维修前备份或保存你的数据。支持人员将在涉及到个人文件或数据的操作执行前再次询问征得你的许可。在这种情况下，我们不对任何数据丢失承担责任。 4. 在不造成任何灾难性损坏的前提下，当任何纠纷或冲突发生时，我们有权拒绝提供服务，尤其是支持人员的尊严或人身安全受到威胁时。 5. 「计算机义诊」是由个人团队自发参与并组织的志愿服务活动，我们保留无理由终止此服务的权利。
title
0
2022
');
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
</style>
