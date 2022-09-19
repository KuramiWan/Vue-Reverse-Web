<template>
  <div>
    <div class="md-subheading">
      <div class="bar">
        <div>
          <div><span class="mate-label focus">Tips:</span></div>
          <span>预约后两周内未完成被视为过期,如需服务请重新预约.</span>
        </div>
        <div>
          <div>{{ adminShow }}</div>
          <md-button
            v-if="adminShow"
            @click="kanbanUpdate"
            class="md-icon-button md-primary"
          >
            <md-icon>done</md-icon>
          </md-button>
        </div>
        <!-- <span class="line"
          >如需取消预约请前往<router-link class="mate-label" to="/cancel"
            >取消预约</router-link
          >界面</span
        > -->
      </div>
    </div>
    <div class=" md-layout md-gutter md-alignment-top">
      <div
        class="kanban-column md-elevation-3 md-layout-item md-medium-size-25 md-small-size-25 md-xsmall-size-100"
        v-for="(blocks, index) in statusBlocks"
        :key="index"
      >
        <div class="md-headline top-line">{{ blocks.status }}</div>
        <draggable
          v-model="kanbanVoList"
          group="people"
          @start="drag = true"
          @end="drag = false"
        >
          <div
            class="block kanban-item md-elevation-2"
            v-for="(block, index) in blocks.kanbanVoList"
            :key="index"
          >
            <div class="md-title line">
              {{ block.name }}
            </div>
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
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import notification from "../../util/Notification";

export default {
  data() {
    return {
      adminShow: false
    };
  },
  methods: {
    isAdmin() {
      var userInfo = localStorage.getItem("userInfo");
      console.log(userInfo);
      if (userInfo.permissions > 1) {
        this.adminShow = true;
      }
      this.adminShow = false;
    },
    kanbanUpdate() {
      // var updateBlocks = [];

      // Array.from(statusBlocks).forEach(blocks => {
      //   console.log(blocks.status, blocks.kanbanVoList);
      //   console.log(blocks);
      //   for (var key in statusMap) {
      //     if (statusMap[key] == blocks.status) {
      //       blocks.status = key;
      //       break;
      //     }
      //   }
      //   console.log(blocks.kanbanVoList);
      //   Array.from(blocks.kanbanVoList).forEach(block => {
      //     block.status = blocks.status;
      //   });
      //   updateBlocks.concat(blocks.kanbanVoList);
      // });
      // console.log(blocks);
      console.log(this.statusBlocks);
      notification
        .post("admin/kanban/update", this.statusBlocks, {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    Draggable
  },
  props: {
    statusBlocks: {
      type: Array,
      default: () => {}
    }
  },
  created() {
    this.isAdmin;
  }
};
</script>

<style>
.bar {
  display: flex;
  justify-content: space-between;
}
.kanban-column {
  margin: 10px;
}
.kanban-item {
  padding: 20px;
  margin-bottom: 5px;
  border-radius: 5px;
}
</style>
