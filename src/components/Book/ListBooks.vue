<template>
  <!-- <v-list
    class="pt-0"
    flat
  >
    <task 
      v-for="task in $store.getters.tasksFiltered"
      :key="task.id"
      :task="task"
    />
  </v-list> -->
  <v-container>
    <v-row no-gutters>
      <v-col
        md="3"
        class="pa-2"
        v-for="book in $store.getters.tasksFilteredBook"
        :key="book._id"
      >
        <book :book="book" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // props: ["bookList"],
  components: {
    book: require("@/components/Book/Book.vue").default,
  },
};
</script>
