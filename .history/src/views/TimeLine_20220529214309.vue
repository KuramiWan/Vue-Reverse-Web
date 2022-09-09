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
          <div class="profile-tabs">
            <timeline>
              <timeline-title>title</timeline-title>
              <timeline-item bg-color="#9dd8e0">item1</timeline-item>
              <timeline-item :hollow="true">item2</timeline-item>
            </timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";
import "vue-cute-timeline/dist/index.css";

export default {
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  }
};
</script>

<style></style>
