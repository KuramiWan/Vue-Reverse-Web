<template>
  <div>
    <div class="kanban" v-for="(blocks, index) in statusBlocks" :key="index">
      <div class="md-Headline">{{ blocks.status }}</div>
      <div class="block" v-for="(block, index) in kanbanVoList" :key="index">
        <div class="md-title">{{ block.name }}</div>
        <div class="md-caption">
          <span class="mate-label">预约时间:</span>
          <span class="mate-label">{{block.time}}</span>
          <span class="mate-label">Id:</span
          ><span class="mate-label">{{ block.id }}</span>
        </div>
        <div class="md-Body2">
          <span class="mate-label">Q:</span>
          <span class="mate-label">{{block.question}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusBlocks
    };
  },
  props: {
    statusBlocks:[]
  }
};
</script>

<style>
.kanban {
  width: 25%;
  height: auto;
  border-radius: 5px;
  padding: 25px;
}
</style>