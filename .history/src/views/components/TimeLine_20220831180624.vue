<template>
                  <timeline>
                  <timeline-title bg-color ="#42a5f5" >文章总览</timeline-title>
                  <div v-for="(timeBlock,timePoint)  in timeBlocks" :key="timeBlock">
                    <timeline-item bg-color = "#ec407a">{{timePoint}}</timeline-item>
                    <div v-for="(block,index) in timeBlock " :key="index" >
                    <router-link :to="'/detail/' + timeBlock.id">
                      <timeline-item
                        icon-size="mudium"
                        bg-color="#42a5f5"
                        @click="goDetail"
                      >
                        <div>
                          <div class="md-title fontOverHide">一个标题 {{block.title}}</div>
                          <div class="md-caption">
                            <span class="mate-label">发表于</span>
                            <span>{{block.createTime}}</span>|
                            <span class="mate-label">文章序列号</span>
                            <span>{{block.id}}</span>|
                            <span class="mate-label">{{block.category}}</span>
                          </div>
                          <div class="md-body2 fontOverHide" ><span class="mate-label">Q:</span>{{block.question}}</div>
                          <div class="md-body fontOverHide"><span class="mate-label">A:</span>{{block.answer}}</div>
                        </div>
                      </timeline-item>
                    </router-link>
                  </div>
                </div>
                </timeline>
</template>

<script>
  import "vue-cute-timeline/dist/index.css";
  import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";
export default {
  name:"timeline" ,
  
data() {
  return {
    
  }
},
components:{
    Timeline,
    TimelineItem,
    TimelineTitle,
},
props:{
  timeBlocks: 
}
}
</script>

<style>

</style>