<template>
  <div class="mainArticleDetail">
    <div class="md-display-1 top-line">title</div>
    <div class="top-line md-caption">subtitle</div>
    <p class="line "></p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    detail: {
      type: Object
    }
  }
};
</script>

<style scoped>
.top-line {
  padding: 10px, 0px;
}
.line{
  margin-bottom: 16px;
}
</style>
