<template>
  <div class="home">
    <v-progress-linear
      top="0"
      absolute
      v-if="show"
      indeterminate
      color="orange accent-3"
    ></v-progress-linear>
    <!-- :value="$store.state.search"
        @input="$store.commit('setSearch', $event)" -->
    <v-card class="elevation-1 ma-15">
      <v-card-title>
        <v-btn fab dark color="indigo" @click="handleClick()">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- <div class="d-flex flex-column justify-center align-center"> -->
        <!-- <field-add-task /> -->
        <v-btn icon color="green" @click="reset">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          @focus="searchClosed = false"
          @blur="searchClosed = true"
          class="expanding-search mt-1"
          :class="{ closed: searchClosed && !$store.state.search }"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          filled
          dense
          clearable
          @keyup.enter="paging"
        ></v-text-field>
      </v-card-title>
      <v-container class="px-16">
        <v-layout>
          <v-flex xs12 md4>
            <v-btn
              class="pl-7"
              icon
              color="green"
              @click="handlerSort('username')"
            >
              User Name
              <v-icon
                v-if="sort_column === 'username'"
                :class="{
                  'mdi mdi-format-vertical-align-bottom': sort_des,
                  'mdi mdi-format-vertical-align-top': !sort_des,
                }"
              ></v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <v-btn
              class="pl-7"
              icon
              color="green"
              @click="handlerSort('firstName')"
            >
              First Name
              <v-icon
                v-if="sort_column === 'firstName'"
                :class="{
                  'mdi mdi-format-vertical-align-bottom': sort_des,
                  'mdi mdi-format-vertical-align-top': !sort_des,
                }"
              ></v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <v-btn
              class="pl-7"
              icon
              color="green"
              @click="handlerSort('lastName')"
            >
              Last Name
              <v-icon
                v-if="sort_column === 'lastName'"
                :class="{
                  'mdi mdi-format-vertical-align-bottom': sort_des,
                  'mdi mdi-format-vertical-align-top': !sort_des,
                }"
              ></v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <v-btn icon color="green" @click="handlerSort('role')">
              Role
              <v-icon
                v-if="sort_column === 'role'"
                :class="{
                  'mdi mdi-format-vertical-align-bottom': sort_des,
                  'mdi mdi-format-vertical-align-top': !sort_des,
                }"
              ></v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right mr-15">
              <v-btn
                class="float-right"
                icon
                color="green"
                @click="handlerSort('_id')"
              >
                Time Created
                <v-icon
                  v-if="sort_column === '_id'"
                  :class="{
                    'mdi mdi-format-vertical-align-bottom': sort_des,
                    'mdi mdi-format-vertical-align-top': !sort_des,
                  }"
                ></v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <list-users v-if="$store.state.usersData.length" />

      <no-tasks v-else />
      <div class="text-right mt-5">
        <v-pagination
          @input="onChangePage"
          v-model="page"
          :length="totalPages"
          circle
        ></v-pagination>
      </div>
      <!-- </div> -->

      <dialog_add v-if="add" @close="add = false" />
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
const { usersApi } = require("../apis/");
import { bus } from "../main";

export default {
  name: "Home",
  data() {
    return {
      add: false,
      ////////////////////////////////////////////////////////////////
      show: false,
      page: 1,
      totalPages: 0,
      limit: 5,
      search: "",
      sort_des: false,
      sort_direction: "-",
      sort_column: "_id",
    };
  },
  // watch: {
  //   options: {
  //     handler(newValue) {
  //       this.page = newValue.page;
  //       this.limit = newValue.itemsPerPage;
  //       // this.sortBy = newValue.sortBy[0];
  //       // this.sortDesc = newValue.sortDesc[0] === true ? '-' :'';
  //       this.paging();
  //     },
  //   },
  //   deep: true,
  // },
  methods: {
    handleClick() {
      this.add = true;
    },
    ...mapMutations({
      setUsersData: "SET_USERS_DATA",
    }),
    async paging() {
      // this.loading = true;
      this.show = true;

      const condition = {
        keyword: this.search,
        page: this.page,
        limit: this.limit,
        sort_column: this.sort_column,
        sort_direction: this.sort_direction,
      };
      const result = await usersApi.paging(condition);

      // this.loading = false;
      this.show = false;

      if (result.data) {
        const { docs: users, limit, page, totalPages } = result.data.users;
        this.page = page;
        this.limit = limit;
        this.totalPages = totalPages;
        this.setUsersData(users);
      }
    },
    onChangePage(e) {
      this.page = e;
      this.paging();
    },
    handlerSort(sort_column) {
      this.sort_des = this.sort_column === sort_column ? !this.sort_des : true;
      this.sort_direction = this.sort_des ? "-" : "";
      this.sort_column = sort_column;
      this.paging();
    },
    reset() {
      this.search = "";
      this.paging();
    },
  },
  mounted() {
    this.paging();
  },
  created() {
    bus.$on("submited", () => this.paging());
  },
  destroyed() {
    bus.$off("submited", () => this.paging());
  },
  components: {
    // "field-add-task": require("@/components/Todo/FieldAddTask.vue").default,
    "list-users": require("@/components/User/ListUsers.vue").default,
    "no-tasks": require("@/components/Shared/NoTasks.vue").default,
    dialog_add: require("@/components/User/Dialogs/DialogAdd.vue").default,
  },
};
</script>
