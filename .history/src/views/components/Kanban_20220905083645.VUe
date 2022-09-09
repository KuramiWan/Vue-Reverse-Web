<template>
  <div>
    <div class="kanban" v-for="(blocks,index) in statusBlocks" :key="index">
    <div class="md-Title">{{blocks.status}}</div>
    <div class="block" v-for="(block,index) in blocks" :key="index">
      <div></div>
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