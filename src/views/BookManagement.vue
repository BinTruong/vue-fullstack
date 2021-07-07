<template>
  <div>
    <v-progress-linear
      top="0"
      absolute
      v-if="show"
      indeterminate
      color="orange accent-3"
    ></v-progress-linear>

    <v-card class="elevation-1 ma-15">
      <v-card-title>
        <v-btn fab dark color="indigo" @click="handleClick()">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer
        ><v-btn icon color="green" @click="reset">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          @keyup.enter="paging"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :page="page"
        :pageCount="numberOfPages"
        :server-items-length="totalPassengers"
        :loading="loading"
        :options.sync="options"
        :items-per-page="limit"
        :headers="headers"
        :items="items"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="book in items" :key="book._id">
              <td width="200" class="py-2">
                <v-img
                  width="150"
                  height="150"
                  :src="
                    'https://nodejs-auth-restapi-crud.herokuapp.com/' +
                      book.cover
                  "
                ></v-img>
              </td>
              <td>{{ book.title }}</td>
              <td width="200">
                <v-btn small outlined color="indigo">
                  {{ book.category.title }}
                </v-btn>
              </td>
              <td width="400">
                <p>{{ book.description.substring(0, 100) + "..." }}</p>
              </td>
              <td>{{ book.author }}</td>
              <td>
                <v-chip :class="`white--text caption ${book.owner.role[0]}`"
                  >{{ book.owner.firstName }} {{ book.owner.lastName }}</v-chip
                >
              </td>

              <td>
                <!-- v-if="book.owner._id === $store.state.userInfo.data.user._id" -->
                <task-menu :book="book" />
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
    <dialog_add v-if="add" @close="add = false" />
  </div>
</template>
<script>
const { booksApi } = require("../apis/");
import { bus } from "../main";
export default {
  data: () => ({
    add: false,
    // dialog: false,
    // dialogDelete: false,
    search: "",
    show: false,
    page: 1,
    numberOfPages: 0,
    totalPassengers: 0,
    loading: true,
    limit: 5,
    options: {},
    sort_direction: "-",
    sort_column: "_id",
    headers: [
      {
        text: "Cover",
        sortable: true,
        value: "cover",
      },
      { text: "Title", value: "title", sortable: true },
      { text: "Category (g)", value: "category", sortable: true },
      { text: "Description (g)", value: "description", sortable: true },
      { text: "Author (g)", value: "author", sortable: true },
      { text: "Owner", value: "owner", sortable: true },
      { text: "Action", sortable: false },
    ],
    items: [],
  }),

  watch: {
    options: {
      handler(newValue) {
        this.page = newValue.page;
        this.limit = newValue.itemsPerPage;
        this.sort_column = newValue.sortBy[0] || "_id";
        this.sort_direction = newValue.sortDesc[0] === false ? "" : "-";
        this.paging();
      },
    },
    deep: true,
  },

  methods: {
    handleClick() {
      this.add = true;
    },
    async paging() {
      this.loading = true;
      this.show = true;

      const condition = {
        keyword: this.search,
        page: this.page,
        limit: this.limit,
        sort_column: this.sort_column,
        sort_direction: this.sort_direction,
      };

      const result = await booksApi.paging(condition);

      this.loading = false;
      this.show = false;

      if (result.data) {
        // eslint-disable-next-line object-curly-newline
        const { docs: books, limit, page, totalDocs } = result.data.books;

        this.page = page;
        this.numberOfPages = limit;
        this.limit = limit;
        this.totalPassengers = totalDocs;
        this.items = books;
      }
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
    "task-menu": require("@/components/Book/TaskMenuBook.vue").default,
    dialog_add: require("@/components/Book/DialogsBook/DialogAdd.vue").default,
  },
};
</script>
<style scoped>
.caption.normal {
  background: #3cd1c2;
}
.caption.contributor {
  background: #ffaa2c;
}
.caption.admin {
  background: #f83e70;
}
</style>
