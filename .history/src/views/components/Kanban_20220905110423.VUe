<template>
  <div>
    <div class="md-subheading">
      <div>
        <div><span class="mate-label font-color = red">Tips:</span></div>
        <span>预约后两周内未完成被定位过期,视为无效,如需服务请重新预约</span>
        <span class="line"
          >如需取消请前往<span class="md-link">取消预约</span>界面</span
        >
      </div>
    </div>
    <div class=" md-layout md-gutter md-alignment-top">
      <div
        class="kanban-column md-elevation-3 md-layout-item md-medium-size-25 md-small-size-25 md-xsmall-size-100"
        v-for="(blocks, index) in statusBlocks"
        :key="index"
      >
        <div class="md-headline top-line">{{ blocks.status }}</div>
        <div
          class="block kanban-item md-elevation-2"
          v-for="(block, index) in blocks.kanbanVoList"
          :key="index"
        >
          <div class="md-title line">{{ block.name }}</div>
          <div class="md-caption line">
            <span class="mate-label">预约时间:</span>
            <span class="mate-label">{{ block.time }}</span>
            <span class="mate-label">Id:</span
            ><span class="mate-label">{{ block.id }}</span>
          </div>
          <div class="md-body2 line">
            <span class="mate-label">Q:</span>
            <span class="mate-label">{{ block.question }}</span>
          </div>
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
      type: Array,
      default: () => {}
    }
  },
  created() {}
};
</script>

<style>
.kanban-column {
  margin: 10px;
}
.kanban-item {
  padding: 20px;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>
