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
          <div class="description text-center"></div>
          <div class="mainAchieve">
            <div class="md-layout md-gutter md-alignment-top">
              <div
                class="md-layout-item md-large-size-30 md-medium-size-33  md-xsmall-size-100 sideBar"
              >
                <div class="md-elevation-3 newArticle sideCard">
                  <div class="md-title">最新文章</div>
                  <div class="card">
                    <router-link to="path">
                      <div class="md-title">标题</div>
                      <div class="md-subhead">时间</div>
                    </router-link>
                  </div>
                </div>
                <div class="md-elevation-3 tagCard sideCard">
                  <div class="md-title">标签</div>
                  <router-link to="path">
                    <span class="md-caption cardText">tag</span>
                  </router-link>
                  <router-link to="path">
                    <span class="md-caption">tag</span>
                  </router-link>
                </div>
              </div>
              <div
                class="md-layout-item md-large-size-70 md-medium-size-66  md-xsmall-size-100 mainBar"
              >
                <md-field class="md-form-group-outline" slot="inputs">
                  <md-icon>search</md-icon>
                  <label>查找你的问题</label>
                  <md-input v-model="question" @input="search"></md-input>
                </md-field>
                <div v-if="isShow">
                  <article-card :searchResult="searchResult"></article-card>
                </div>
                <timeline v-if="!isShow">
                  <timeline-title class="md-headline" bg-color="#42a5f5"
                    >文章总览</timeline-title
                  >
                  <div v-for="(timeBlock, index) in timeBlocks" :key="index">
                    <timeline-item bg-color="#ec407a">{{
                      timeBlock.dateString
                    }}</timeline-item>
                    <div
                      v-for="(block, index) in timeBlock.archivesListVo"
                      :key="index"
                    >
                      <router-link :to="'/detail/' + block.id">
                        <timeline-item
                          icon-size="mudium"
                          bg-color="#42a5f5"
                          @click="goDetail"
                        >
                          <div>
                            <div class="md-title fontOverHide">
                              {{ block.title }}
                            </div>
                            <div class="md-caption">
                              <span class="mate-label">发表于</span>
                              <span>{{ block.createTime }}</span
                              >|
                              <span class="mate-label">文章序列号</span>
                              <span>{{ block.id }}</span
                              >|
                              <span class="mate-label">{{
                                block.category
                              }}</span>
                            </div>
                            <div class="md-body2 fontOverHide">
                              <span class="mate-label">Q:</span
                              >{{ block.question }}
                            </div>
                            <div class="md-body fontOverHide">
                              <span class="mate-label">A:</span
                              >{{ block.answer }}
                            </div>
                          </div>
                        </timeline-item>
                      </router-link>
                    </div>
                  </div>
                  <pagination
                    v-model="pagination.page"
                    :pageCount="pagination.pageCount"
                    :perPage="pagination.pageSize"
                    @input="input"
                  />
                </timeline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }

  return items;
};

export default {
  name: "TableSearch",
  data: () => ({
    users: [
      {
        id: 1,
        name: "Shawna Dubbin",
        email: "sdubbin0@geocities.com",
        gender: "Male",
        title: "Assistant Media Planner",
        permission: "1",
        deleted: "0"
      },
      {
        id: 2,
        name: "Odette Demageard",
        email: "odemageard1@spotify.com",
        gender: "Female",
        title: "Account Coordinator",
        permission: "1",
        deleted: "0"
      },
      {
        id: 3,
        name: "Vera Taleworth",
        email: "vtaleworth2@google.ca",
        gender: "Male",
        title: "Community Outreach Specialist",
        permission: "1",
        deleted: "0"
      },
      {
        id: 4,
        name: "Lonnie Izkovitz",
        email: "lizkovitz3@youtu.be",
        gender: "Female",
        title: "Operator",
        permission: "1",
        deleted: "0"
      },
      {
        id: 5,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III",
        permission: "1",
        deleted: "0"
      },
      {
        id: 6,
        name: "Karim Chipping",
        email: "kchipping5@scribd.com",
        gender: "Female",
        title: "Safety Technician II",
        permission: "1",
        deleted: "0"
      },
      {
        id: 7,
        name: "Helge Holyard",
        email: "hholyard6@howstuffworks.com",
        gender: "Female",
        title: "Internal Auditor",
        permission: "1",
        deleted: "0"
      },
      {
        id: 8,
        name: "Rod Titterton",
        email: "rtitterton7@nydailynews.com",
        gender: "Male",
        title: "Technical Writer",
        permission: "1",
        deleted: "0"
      },
      {
        id: 9,
        name: "Gawen Applewhite",
        email: "gapplewhite8@reverbnation.com",
        gender: "Female",
        title: "GIS Technical Architect",
        permission: "1",
        deleted: "0"
      },
      {
        id: 10,
        name: "Nero Mulgrew",
        email: "nmulgrew9@plala.or.jp",
        gender: "Female",
        title: "Staff Scientist",
        permission: "1",
        deleted: "0"
      },
      {
        id: 11,
        name: "Cybill Rimington",
        email: "crimingtona@usnews.com",
        gender: "Female",
        title: "Assistant Professor"
      },
      {
        id: 12,
        name: "Maureene Eggleson",
        email: "megglesonb@elpais.com",
        gender: "Male",
        title: "Recruiting Manager"
      },
      {
        id: 13,
        name: "Cortney Caulket",
        email: "ccaulketc@cbsnews.com",
        gender: "Male",
        title: "Safety Technician IV"
      },
      {
        id: 14,
        name: "Selig Swynfen",
        email: "sswynfend@cpanel.net",
        gender: "Female",
        title: "Environmental Specialist"
      },
      {
        id: 15,
        name: "Ingar Raggles",
        email: "iragglese@cbc.ca",
        gender: "Female",
        title: "VP Sales"
      },
      {
        id: 16,
        name: "Karmen Mines",
        email: "kminesf@topsy.com",
        gender: "Male",
        title: "Administrative Officer"
      },
      {
        id: 17,
        name: "Salome Judron",
        email: "sjudrong@jigsy.com",
        gender: "Male",
        title: "Staff Scientist"
      },
      {
        id: 18,
        name: "Clarinda Marieton",
        email: "cmarietonh@theatlantic.com",
        gender: "Male",
        title: "Paralegal"
      },
      {
        id: 19,
        name: "Paxon Lotterington",
        email: "plotteringtoni@netvibes.com",
        gender: "Female",
        title: "Marketing Assistant"
      },
      {
        id: 20,
        name: "Maura Thoms",
        email: "mthomsj@webeden.co.uk",
        gender: "Male",
        title: "Actuary"
      }
    ],
    paginatedUsers: [],
    search: null,
    searched: [],
    selected: null,
    pagination: {
      pageSize: 10,
      pageCount: null,
      page: null
    }
  }),
  props: {
    userList: {
      type: Array,
      default: () => {}
    }
  },
  components: {},
  methods: {
    onSelect(items) {
      this.selected = items;
    },
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} user${plural} selected`;
    },
    newUser() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    input(currentPage) {
      this.searched.slice(
        (currentPage - 1) * this.pagination,
        currentPage * this.pagination.pageSize
      );
    },
    getUser() {}
  },

  created() {
    this.searched = this.users;
    this.pageCount = this.getPageCount;
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    getPageCount() {
      return Math.ceil(this.searched.length / (this.pageSize * 1.0));
    }
  }
};
</script>
<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
.md-table + .md-table {
  margin-top: 16px;
}
</style>
