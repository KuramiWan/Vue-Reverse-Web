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
            <login-card header-color="green">
              <h4 slot="title" class="title">Log in</h4>
              <template slot="buttons">
                <md-button
                  href="#facebook"
                  class="md-just-icon md-simple md-white"
                >
                  <i class="fab fa-facebook-square"></i>
                </md-button>
              </template>
              <p slot="description" class="description">Or Be Classical</p>
              <template slot="inputs">
                <md-field class="md-form-group">
                  <md-icon>face</md-icon>
                  <label>姓名</label>
                  <md-input v-model="firstname"></md-input>
                </md-field>
                <md-field class="md-form-group">
                  <md-icon>school</md-icon>
                  <label>学院</label>
                  <md-input v-model="college" type="college"></md-input>
                </md-field>

                <md-field class="md-form-group">
                  <md-icon>schedule</md-icon>
                  <label>预约时间</label>
                  <md-select v-model="time">
                    <md-option value="3:00~4:00"> 3:00~4:00</md-option>
                    <md-option value="4:00~5:00"> 4:00~5:00</md-option>
                    <md-option value="5:00~6:00"> 5:00~6:00</md-option>
                  </md-select>
                </md-field>
                <md-field class="md-form-group">
                  <md-icon>question_mark</md-icon>
                  <label>遇到的问题</label>
                  <md-textarea v-model="question"></md-textarea>
                </md-field>
                <md-field class="md-form-group">
                  <md-file v-model="image"></md-file>
                  <label for="">上传问题图片</label>
                </md-field>
              </template>
              <md-button slot="footer" class="md-simple md-success md-lg">
                Lets Go
              </md-button>
            </login-card>
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
  components: {},
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
