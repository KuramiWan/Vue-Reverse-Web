<template>
  <div>
    <div class="kanban" v-for="(Blocks,index) in statusBlocks" :key="index">
    <div class="md-Title">{{Blocks.}}</div>
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