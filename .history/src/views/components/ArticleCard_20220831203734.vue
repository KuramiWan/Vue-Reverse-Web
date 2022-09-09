<template>
  <div>

    <div v-for="(block,index) in searchResult" :key="index">
      <router-link :to="'/detail/' + block.id">
        <div>
          <div class="md-title fontOverHide">{{block.title}}</div>
          <div class="md-caption">
            <span class="mate-label">发表于</span>
            <span>{{block.createTime}}</span>|
            <span class="mate-label">文章序列号</span>
            <span>{{block.id}}</span>|
            <span class="mate-label">{{block.category}}</span>
          </div>
          <div class="md-body2 fontOverHide"><span class="mate-label">Q:</span>{{block.question}}</div>
          <div class="md-body fontOverHide"><span class="mate-label">A:</span>{{block.answer}}</div>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
import { type } from 'os'

export default {
  data() {
    return {}
  },
  props: {
    searchResult: [],
  },
}
</script>

<style>
</style>