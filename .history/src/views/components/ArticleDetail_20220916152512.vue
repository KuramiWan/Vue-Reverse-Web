<template>
  <div class="mainArticleDetail">
    <div class="md-display-1 top-line">title</div>
    <div class="top-line md-caption">subtitle</div>
    <p class="line "><span class="md-body-2 mate-label">Q:</span>
      <span class="md-body-1">question</span>
    </p>
    <div class="image">image</div>
    <p class="line "><span class="md-body-2 mate-label">A:</span>
      
    </p>
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
