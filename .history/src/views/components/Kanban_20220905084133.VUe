<template>
  <div>
    <div class="kanban" v-for="(blocks,index) in statusBlocks" :key="index">
    <div class="md-Headline">{{blocks.status}}</div>
    <div class="block" v-for="(block,index) in kanbanVoList" :key="index">
      <div class="md-title">{{block.name}}</div>
      <div class="md-caption"><span class="mate-">Id:</span>{{block.id}}</div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    stage,
    statusBlocks
  }
},
props:{
  stage,
  statusBlocks
}
}
</script>

<style>
.kanban{
  width: 25%;
  height: auto;
  border-radius: 5px;
  padding: 25px;
}
</style>