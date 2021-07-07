<template>
  <div class="home">
    <v-progress-linear
      top="0"
      absolute
      v-if="show"
      indeterminate
      color="orange accent-3"
    ></v-progress-linear>

    <v-card class="mx-10">
      <v-card-title>
        <v-text-field
          v-model="search"
          @focus="searchClosed = false"
          @blur="searchClosed = true"
          class="expanding-search"
          :class="{ closed: searchClosed && !$store.state.search }"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          filled
          dense
          clearable
          @keyup.enter="paging"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
          :items="itemsCat"
          label="Filter by category"
          v-model="filterCategory"
          item-text="title"
          item-value="_id"
        ></v-select>
        <v-btn class="ma-2" outlined color="indigo" @click="paging">
          Filter
        </v-btn>
      </v-card-title>
    </v-card>

    <list-books v-if="$store.state.books_Data.length" />

    <no-tasks v-else />
    <div class="text-center">
      <v-pagination
        @input="onChangePage"
        v-model="page"
        :length="totalPages"
        circle
      ></v-pagination>
    </div>
    <!-- <dialog_add v-if="add" @close="add = false" /> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
const { booksApi, categoriesApi } = require("../apis/");
export default {
  name: "Home",
  data: function() {
    return {
      filterCategory: "",
      itemsCat: [{ title: "Tất cả", _id: "" }],
      // add: false,
      show: false,
      ////////////////////////////////////////////////////////////////
      page: 1,
      totalPages: 0,
      limit: 8,
      // loading: true,
      // options: {},
      // items: [],
      search: "",
      // sortBy: "",
      // sortDesc: "",
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
    // handleClick() {
    //   this.add = true;
    // },
    ...mapMutations({
      setBooksData: "SET_BOOKS_DATA",
    }),
    async paging() {
      // this.loading = true;
      this.show = true;

      const condition = {
        filterCategory: this.filterCategory,
        keyword: this.search,
        page: this.page,
        limit: this.limit,
        sort_column: "_id",
        sort_direction: "-",
        // sort_column: this.sortBy,
        // sort_direction: this.sortDesc,
      };
      const result = await booksApi.pageHome(condition);

      // this.loading = false;
      this.show = false;

      if (result.data) {
        // eslint-disable-next-line object-curly-newline
        const { docs: books, limit, page, totalPages } = result.data.books;
        this.page = page;
        this.limit = limit;
        this.totalPages = totalPages;
        // this.items = books;
        this.setBooksData(books);
      }
    },
    onChangePage(e) {
      this.page = e;
      this.paging();
    },
    getListCat: async function() {
      debugger;
      const result = await categoriesApi.getCategory();
      const res = result.data;
      if (res) {
        res.categories.map((item) => this.itemsCat.push(item));
      }
    },
  },
  created() {
    this.paging();
    this.getListCat();
  },

  components: {
    // 'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
    "list-books": require("@/components/Book/ListBooks.vue").default,
    "no-tasks": require("@/components/Shared/NoTasks.vue").default,
    // dialog_add: require("@/components/Book/DialogsBook/DialogAdd.vue").default,
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
