<template>
  <div class="home">
    <v-progress-linear
      top="0"
      absolute
      v-if="show"
      indeterminate
      color="orange accent-3"
    ></v-progress-linear>
    <v-card class="elevation-1 mx-15 my-10">
      <v-card-title>
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
        <v-spacer></v-spacer>
        <field-add-task v-if="getRole === 'admin'" @submited="paging" />
      </v-card-title>
      <v-btn class="mx-15 mt-10" icon color="green" @click="reset">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      <v-btn class="mx-15 mt-10" icon color="green" @click="handlerSort('_id')">
        Sort created
        <v-icon
          v-if="sort_column === '_id'"
          :class="{
            'mdi mdi-format-vertical-align-bottom': sort_des,
            'mdi mdi-format-vertical-align-top': !sort_des,
          }"
        ></v-icon>
      </v-btn>
      <v-btn
        class="ml-15 mt-10"
        icon
        color="green"
        @click="handlerSort('title')"
      >
        Sort title
        <v-icon
          v-if="sort_column === 'title'"
          :class="{
            'mdi mdi-format-vertical-align-bottom': sort_des,
            'mdi mdi-format-vertical-align-top': !sort_des,
          }"
        ></v-icon>
      </v-btn>
      <list-tasks v-if="$store.state.categoriesData.length" />

      <no-tasks v-else />
      <div class="text-right mt-5">
        <v-pagination
          @input="onChangePage"
          v-model="page"
          :length="totalPages"
          circle
        ></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { bus } from "../main";

const { categoriesApi } = require("../apis/");
export default {
  name: "Home",
  data() {
    return {
      searchClosed: true,
      show: false,
      page: 1,
      totalPages: 0,
      limit: 7,
      search: "",
      sort_des: false,
      sort_direction: "-",
      sort_column: "_id",
    };
  },
  // watch: {
  //   options: {
  //     handler(newValue) {
  //       // this.page = newValue.page;
  //       // this.limit = newValue.itemsPerPage;
  //       this.sortBy = newValue.sortBy[0];
  //       this.sortDesc = newValue.sortDesc[0] === true ? "-" : "";
  //       this.paging();
  //     },
  //   },
  //   deep: true,
  // },
  computed: {
    ...mapGetters({
      getRole: "GET_USER_ROLE",
    }),
  },

  methods: {
    ...mapMutations({
      setCategoriesData: "SET_CATEGORIES_DATA",
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
        // sort_column: this.sortBy,
        // sort_direction: this.sortDesc,
      };
      const result = await categoriesApi.paging(condition);

      // this.loading = false;
      this.show = false;
      if (result.data) {
        const {
          docs: categories,
          limit,
          page,
          totalPages,
        } = result.data.categories;
        this.page = page;
        this.limit = limit;
        this.totalPages = totalPages;
        this.setCategoriesData(categories);
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
    "field-add-task": require("@/components/Todo/FieldAddTask.vue").default,
    "list-tasks": require("@/components/Todo/ListTasks.vue").default,
    "no-tasks": require("@/components/Shared/NoTasks.vue").default,
  },
};
</script>

<style scoped lang="sass">
.expanding-search
  transition: max-width 0.3s
  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
  &.closed
    max-width: 45px
    .v-input__slot
      background: transparent !important
</style>
