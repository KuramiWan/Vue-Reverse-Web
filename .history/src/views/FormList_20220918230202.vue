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
              v-model="paginatedForms"
              md-sort="name"
              md-sort-order="asc"
              @md-selected="onSelect"
            >
              <md-table-toolbar>
                <!-- <div class="md-toolbar-section-start">
                  <h1 class="md-title"></h1>
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
                md-label="No  found"
                :md-description="
                  `No form found for this '${search}' query. Try a different search term or create a new form.`
                "
              >
                <md-button class="md-primary md-raised" @click="newForm"
                  >Create New form</md-button
                >
              </md-table-empty-state>

              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                md-auto-select
                md-selectable="multiple"
              >
                <md-table-cell
                  v-for="(value, key) in item"
                  :key="key"
                  :md-label="keyMap(key)"
                  >{{ value }}</md-table-cell
                >
              </md-table-row>
            </md-table>
            <pagination
              v-model="pagination.page"
              :pageCount="pagination.pageCount"
              :perPage="pagination.pageSize"
              @input="input"
            />

            <div v-if="select.show">
              <md-table
                v-if="select.edit"
                v-model="selected"
                md-sort="name"
                md-sort-order="asc"
              >
                <md-table-toolbar>
                  <!-- <div class="md-toolbar-section-start">
                    <h1 class="md-title">已选择</h1>
                  </div> -->
                  <div class="md-toolbar-section-start">
                    <md-button
                      class="md-icon-button md-lg md-success confirmButton"
                      @click="confirm"
                    >
                      <span class="mate-label">确认</span>
                      <md-icon>done</md-icon>
                    </md-button>
                  </div>
                </md-table-toolbar>
                <!-- Delete
  
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }"
                  v-if="select.delete"
                  :key="1"
                >
                  {{ item }}
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
                </md-table-row> -->

                <!-- Edit -->
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell
                    v-for="(value, key) in item"
                    :key="key"
                    :md-label="keyMap(key)"
                  >
                    <md-field>
                      <label>{{ keyMap(key) }}</label>
                      <md-input v-model="item[key]"></md-input>
                    </md-field>
                  </md-table-cell>
                </md-table-row>
              </md-table>
              <md-table
                v-if="select.delete"
                v-model="selected"
                md-sort="name"
                md-sort-order="asc"
              >
                <md-table-toolbar>
                  <!-- <div class="md-toolbar-section-start">
                    <h1 class="md-title">已选择</h1>
                  </div> -->
                  <div class="md-toolbar-section-start">
                    <md-button
                      class="md-icon-button md-lg md-success confirmButton"
                      @click="confirm"
                    >
                      <span class="mate-label">确认</span>
                      <md-icon>done</md-icon>
                    </md-button>
                  </div>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell
                    v-for="(value, key) in item"
                    :key="key"
                    :md-label="keyMap(key)"
                    >{{ value }}</md-table-cell
                  >
                </md-table-row>
              </md-table>
              <div class="md-layout md-gutter ">
                <div v-if="this.select.show"></div>
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
import { notification } from "../util/Notification";
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
  data() {
    return {
      formStructure: {
        id: "ID",
        name: "姓名",
        title: "标题",
        question: "问题",
        status: "状态",
        createTime: "创建时间",
        answer: "解答",
        college: "学院",
        reserveTime: "预约时间",
        image: "图片",
        isArchived: "是否归档",
        tag: "标签",
        phoneNumber: "电话"
      },

      forms: [],
      select: {
        // F is Delete ,T is Edit
        delete: false,
        edit: false,
        show: 0
      },
      paginatedForms: [],
      search: null,
      searched: [],
      selected: null,
      pagination: {
        pageSize: 10,
        pageCount: null,
        page: null
      }
    };
  },
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
      if (this.select.edit) {
        notification
          .post("/admin/form/update", this.selected, {
            headers: {
              Authorization: localStorage.getItem("Authorization")
            }
          })
          .then(response => {
            this.getForm();
            return;
          })
          .catch(error => {
            console.log(error);
          });
        return;
      }
      notification
        .post("/admin/form/delete", this.selected, {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(response => {
          this.getForm();
        })
        .catch(error => {
          console.log(error);
        });
      return;
    },
    deleteItem() {
      this.select.delete = true;
      this.select.edit = false;
    },
    // addItem() {
    //   notification
    //     .post("/admin/form/insert")
    //     .then(response => {
    //       this.getForm();
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    editItem() {
      this.select.delete = false;
      this.select.edit = true;
    },

    onSelect(items) {
      this.selected = items;
      this.select.show = this.selected.length;
    },
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} form${plural} selected`;
    },
    newForm() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByName(this.forms, this.search);
      this.input(1);
    },
    input(currentPage) {
      this.pagination.pageCount = Math.ceil(
        (this.searched.length * 1.0) / this.pagination.pageSize
      );
      this.pagination.page = currentPage;
      this.paginatedForms = this.searched.slice(
        (currentPage - 1) * this.pagination.pageSize,
        currentPage * this.pagination.pageSize
      );
    },
    getForm() {
      notification
        .get("/admin/form/getAllForms", {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        .then(response => {
          this.forms = response.data.data;
          this.searchOnTable(this.forms, this.search);
          this.input(1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    keyMap(key) {
      for (var i in this.formStructure) {
        if (i == key) {
          key = this.formStructure[i];
        }
      }
      return key;
    }
  },
  created() {
    this.getForm();
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
.confirmButton {
  height: 30px;
  width: auto;
}
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
