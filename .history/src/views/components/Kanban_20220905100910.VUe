<template>
  <div>
    <div
      class="kanban md-elevation-3"
      v-for="(blocks, index) in statusBlocks"
      :key="index"
    >
      <div class="md-Headline top-line">{{ blocks.status }}</div>
      <div
        class="block line md-elevation-3"
        v-for="(block, index) in blocks.kanbanVoList"
        :key="index"
      >
        <div class="md-title">{{ block.name }}</div>
        <div class="md-caption">
          <span class="mate-label">预约时间:</span>
          <span class="mate-label">{{ block.time }}</span>
          <span class="mate-label">Id:</span
          ><span class="mate-label">{{ block.id }}</span>
        </div>
        <div class="md-Body2">
          <span class="mate-label">Q:</span>
          <span class="mate-label">{{ block.question }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    statusBlocks: {
      type: Object,
      default: () => {}
    }
  },
  created() {}
};
</script>

<style>
.kanban {
  width: 25%;
  height: auto;
  border-radius: 5px;
  padding: 25px;
  margin: 10px;
}
</style>
