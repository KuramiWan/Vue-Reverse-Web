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
            <md-table
              table-header-color="green"
              v-model="paginatedUsers"
              md-sort="name"
              md-sort-order="asc"
              @md-selected="onSelect"
            >
              <md-table-toolbar>
                <!-- <div class="md-toolbar-section-start">
                  <h1 class="md-title">Users</h1>
                </div> -->
                <!-- <div class="md-layout-item button md-toolbar-section-start">
                  <md-button
                    class="md-sm md-success md-icon-button "
                    @click="addItem"
                  >
                    <md-icon>add</md-icon>
                  </md-button>
                </div> -->
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input
                    placeholder="Search by name..."
                    v-model="search"
                    @input="searchOnTable"
                  />
                </md-field>
              </md-table-toolbar>
              <md-table-toolbar
                slot="md-table-alternate-header"
                slot-scope="{ count }"
              >
                <div class="md-toolbar-section-start">
                  {{ getAlternateLabel(count) }}
                </div>

                <div class="md-toolbar-section-end md-gutter">
                  <div class="md-layout-item button">
                    <md-button
                      class="md-sm md-danger md-icon-button "
                      @click="deleteItem"
                    >
                      <md-icon>delete</md-icon>
                    </md-button>
                  </div>

                  <div class="md-layout-item button">
                    <md-button
                      class="md-sm md-info md-icon-button "
                      @click="editItem"
                    >
                      <md-icon>edit</md-icon>
                    </md-button>
                  </div>
                </div>
              </md-table-toolbar>
              <md-table-empty-state
                md-label="No users found"
                :md-description="
                  `No user found for this '${search}' query. Try a different search term or create a new user.`
                "
              >
                <md-button class="md-primary md-raised" @click="newUser"
                  >Create New User</md-button
                >
              </md-table-empty-state>

              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                md-auto-select
                :md-disabled="item.userName.includes('Stave')"
                md-selectable="multiple"
              >
                <md-table-cell md-label="ID">{{ item.userId }}</md-table-cell>
                <md-table-cell md-label="userName">{{
                  item.userName
                }}</md-table-cell>

                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Permissions">{{
                  item.permissions
                }}</md-table-cell>
                <md-table-cell md-label="Deleted">{{
                  item.deleted
                }}</md-table-cell>
              </md-table-row>
            </md-table>
            <pagination
              v-model="pagination.page"
              :pageCount="pagination.pageCount"
              :perPage="pagination.pageSize"
              @input="input"
            />
            <md-table
              v-if="selected.length"
              v-model="selected"
              md-sort="name"
              md-sort-order="asc"
            >
              <!-- Delete -->
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                v-if="!select.DeOrEd"
              >
                <md-table-cell md-label="ID">{{ item.userId }}</md-table-cell>
                <md-table-cell md-label="userName">{{
                  item.userName
                }}</md-table-cell>

                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Permissions">{{
                  item.permissions
                }}</md-table-cell>
                <md-table-cell md-label="Deleted">{{
                  item.deleted
                }}</md-table-cell>
              </md-table-row>

              <!-- Edit -->
              <md-table-row
                v-if="select.DeOrEd"
                slot="md-table-row"
                slot-scope="{ item }"
              >
                <md-table-cell md-label="ID">
                  <md-field>
                    <label>ID</label>
                    <md-input v-model="item.userId"></md-input>
                  </md-field>
                </md-table-cell>
                <md-table-cell md-label="userName"
                  ><md-field>
                    <label>userName</label>
                    <md-input v-model="item.userName"></md-input> </md-field
                ></md-table-cell>

                <md-table-cell md-label="Emial"
                  ><md-field>
                    <label>Email</label>
                    <md-input v-model="item.email"></md-input> </md-field
                ></md-table-cell>
                <md-table-cell md-label="Permissions"
                  ><md-field>
                    <label>Permissions</label>
                    <md-input v-model="item.permissions"></md-input> </md-field
                ></md-table-cell>
                <md-table-cell md-label="Deleted"
                  ><md-field>
                    <label>Deleted</label>
                    <md-input v-model="item.deleted"></md-input> </md-field
                ></md-table-cell>
              </md-table-row>
            </md-table>
            <div class="md-layout md-gutter ">
              <div v-if="selected.length">
                <md-button
                  class="md-icon-button md-sm md-success"
                  @click="confirm"
                >
                  <md-icon>done</md-icon>
                </md-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "../components/Pagination.vue";
import notification from "../util/Notification";
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.userName).includes(toLower(term)));
  }

  return items;
};

export default {
  name: "TableSearch",
  data: () => ({
    users: [
      // {
      //   id: 1,
      //   name: "Shawna Dubbin",
      //   email: "sdubbin0@geocities.com",
      //   gender: "Male",
      //   title: "Assistant Media Planner",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 2,
      //   name: "Odette Demageard",
      //   email: "odemageard1@spotify.com",
      //   gender: "Female",
      //   title: "Account Coordinator",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 3,
      //   name: "Vera Taleworth",
      //   email: "vtaleworth2@google.ca",
      //   gender: "Male",
      //   title: "Community Outreach Specialist",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 4,
      //   name: "Lonnie Izkovitz",
      //   email: "lizkovitz3@youtu.be",
      //   gender: "Female",
      //   title: "Operator",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 5,
      //   name: "Thatcher Stave",
      //   email: "tstave4@reference.com",
      //   gender: "Male",
      //   title: "Software Test Engineer III",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 6,
      //   name: "Karim Chipping",
      //   email: "kchipping5@scribd.com",
      //   gender: "Female",
      //   title: "Safety Technician II",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 7,
      //   name: "Helge Holyard",
      //   email: "hholyard6@howstuffworks.com",
      //   gender: "Female",
      //   title: "Internal Auditor",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 8,
      //   name: "Rod Titterton",
      //   email: "rtitterton7@nydailynews.com",
      //   gender: "Male",
      //   title: "Technical Writer",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 9,
      //   name: "Gawen Applewhite",
      //   email: "gapplewhite8@reverbnation.com",
      //   gender: "Female",
      //   title: "GIS Technical Architect",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 10,
      //   name: "Nero Mulgrew",
      //   email: "nmulgrew9@plala.or.jp",
      //   gender: "Female",
      //   title: "Staff Scientist",
      //   permission: "1",
      //   deleted: "0"
      // },
      // {
      //   id: 11,
      //   name: "Cybill Rimington",
      //   email: "crimingtona@usnews.com",
      //   gender: "Female",
      //   title: "Assistant Professor"
      // },
      // {
      //   id: 12,
      //   name: "Maureene Eggleson",
      //   email: "megglesonb@elpais.com",
      //   gender: "Male",
      //   title: "Recruiting Manager"
      // },
      // {
      //   id: 13,
      //   name: "Cortney Caulket",
      //   email: "ccaulketc@cbsnews.com",
      //   gender: "Male",
      //   title: "Safety Technician IV"
      // },
      // {
      //   id: 14,
      //   name: "Selig Swynfen",
      //   email: "sswynfend@cpanel.net",
      //   gender: "Female",
      //   title: "Environmental Specialist"
      // },
      // {
      //   id: 15,
      //   name: "Ingar Raggles",
      //   email: "iragglese@cbc.ca",
      //   gender: "Female",
      //   title: "VP Sales"
      // },
      // {
      //   id: 16,
      //   name: "Karmen Mines",
      //   email: "kminesf@topsy.com",
      //   gender: "Male",
      //   title: "Administrative Officer"
      // },
      // {
      //   id: 17,
      //   name: "Salome Judron",
      //   email: "sjudrong@jigsy.com",
      //   gender: "Male",
      //   title: "Staff Scientist"
      // },
      // {
      //   id: 18,
      //   name: "Clarinda Marieton",
      //   email: "cmarietonh@theatlantic.com",
      //   gender: "Male",
      //   title: "Paralegal"
      // },
      // {
      //   id: 19,
      //   name: "Paxon Lotterington",
      //   email: "plotteringtoni@netvibes.com",
      //   gender: "Female",
      //   title: "Marketing Assistant"
      // },
      // {
      //   id: 20,
      //   name: "Maura Thoms",
      //   email: "mthomsj@webeden.co.uk",
      //   gender: "Male",
      //   title: "Actuary"
      // }
    ],
    select: {
      // F is Delete ,T is Edit
      DeOrEd: false,

      selectShow: false
    },
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
  components: {
    Pagination
  },
  methods: {
    confirm() {
      if (this.select.DeOrEd) {
        notification.post("/admin/user/update").then();
        response => {
          this.getUser();
          return;
        };
      }
      notification
        .post("/admin/user/delete", this.selected)
        .then(response => {
          this.getUser();
        })
        .catch(error => {
          console.log(error);
        });
      return;
    },
    deleteItem() {
      this.select.DeOrEd = false;
      console.log(!this.select.DeOrEd);
    },
    // addItem() {
    //   notification
    //     .post("/admin/user/insert")
    //     .then(response => {
    //       this.getUser();
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    editItem() {
      this.select.DeOrEd = true;
    },

    onSelect(items) {
      this.selected = items;
      console.log(this.selected);
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
      this.input(1);
    },
    input(currentPage) {
      this.pagination.pageCount = Math.ceil(
        (this.searched.length * 1.0) / this.pagination.pageSize
      );
      this.pagination.page = currentPage;
      this.paginatedUsers = this.searched.slice(
        (currentPage - 1) * this.pagination.pageSize,
        currentPage * this.pagination.pageSize
      );
    },
    getUser() {
      notification
        .get("/admin/user/getUser", {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(response => {
          this.users = response.data.data;
          this.searchOnTable(this.users, this.search);
          this.input(1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getUser();
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
    }
  }
};
</script>
<style lang="scss" scoped>
.buttonGutter {
  padding-left: 600px;
}
.button {
  padding: 20px;
}
.md-field {
  max-width: 300px;
}
.md-table + .md-table {
  margin-top: 16px;
}
</style>
