<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">登录</h4>
              <!-- <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button> -->
              <!-- <p slot="description" class="description">Or Be Classical</p> -->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>用户名...</label>
                <md-input v-model="userName"></md-input>
              </md-field>
              <!-- <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>邮箱...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field> -->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>密码...</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon class="material-icons">
                  keyboard_double_arrow_right
                </md-icon>
                <label>验证...</label>
                <md-input v-model="captcha"></md-input>
              </md-field>

              <div slot="tips" class="md-caption line">
                <i class="material-icons mate-label">
                  notifications_active
                </i>
                没有帐号?无需帐号也可
                <router-link to="/form" class="mate-label"
                  >前往预约</router-link
                >
                或者
                <router-link to="/register" class="mate-label focus"
                  ><span class="material-icons">person_add</span>注册帐号</router-link
                >
              </div>
              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                @click="login"
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
