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
            <login-card header-color="green" class="loginCard">
              <h4 slot="title" class="title">预约</h4>
              <!-- <template slot="buttons">
                <md-button
                  href="#facebook"
                  class="md-just-icon md-simple md-white"
                >
                  <i class="fab fa-facebook-square"></i>
                </md-button>
              </template> -->
              <!-- <p slot="description" class="description">Or Be Classical</p> -->
              <template slot="inputs">
                <md-field class="md-form-group">
                  <md-icon>face</md-icon>
                  <label>姓名</label>
                  <md-input v-model="username"></md-input>
                </md-field>
                <md-field class="md-form-group">
                  <md-icon>school</md-icon>
                  <label>学院</label>
                  <md-input v-model="college" type="college"></md-input>
                </md-field>
                <md-field>
                  <md-icon>call</md-icon>
                  <label>电话号码</label>
                  <md-input v-model="phoneNumber"></md-input>
                </md-field>
                <md-field class="md-form-group">
                  <md-icon>schedule</md-icon>
                  <label>预约时间</label>
                  <md-select v-model="time">
                    <md-option
                      v-for="time in timesOption"
                      :key="time"
                      value="time"
                      class="md-simple "
                    >
                      {{ time }}</md-option
                    >
                  </md-select>
                </md-field>
                <md-field class="md-form-group">
                  <md-icon>question_mark</md-icon>
                  <label>遇到的问题</label>
                  <md-textarea v-model="question"></md-textarea>
                </md-field>

                <md-field class="md-form-group">
                  <label>上传问题图片</label>
                  <md-file @change="onFileSelected" multiple />
                </md-field>

                <md-field class="md-form-group">
                  <label>上传问题图片</label>
                  <file-upload
                    ref="upload"
                    v-model="files"
                    post-action="/post.method"
                    put-action="/put.method"
                    @input-file="inputFile"
                    @input-filter="inputFilter"
                  >
                    Upload file
                  </file-upload>
                </md-field>
              </template>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="formInput"
              >
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
import VueUploadComponent from "vue-upload-component";
import { LoginCard } from "@/components";
import axios from "axios";
import { error } from "console";

export default {
  components: { LoginCard, fileUpload: VueUploadComponent },
  bodyClass: "profile-page",
  data() {
    return {
      selectedFile: null,
      url: "https://easyimg.kurami.ga/application/upload.php",
      phoneNumber: null,
      timesOption: null,
      time: null,
      college: null,
      username: null,
      question: null,
      image: []
    };
  },

  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    },
    img: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  created() {
    axios
      .post("/timeoption")
      .then(response => {
        this.timesOption = response.data;
      })
      .catch(function(error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      const fd = new FormData();
      fd.append("file", this.selectedFile);
      console.log(this.selectedFile);
      axios
        .post("https://easyimg.kurami.ga/application/upload.php", fd, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.image.push(response.data.url);
        })
        .catch(error => {
          console.log(error);
        });
    },
    formInput() {
      axios
        .post("/form", {
          name: this.username,
          collage: this.college,
          phoneNumber: this.phoneNumber,
          time: this.time,
          question: this.question,
          image: this.image
        })
        .then(response => {
          if (response.status == 200) {
            this.$router.push("/");
          }
        })
        .catch(function(error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
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
.loginCard {
  margin-bottom: 40px;
}
</style>
