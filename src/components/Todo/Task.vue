<template>
  <div>
    <v-list-item>
      <template v-slot:default>
        <v-list-item-content class="mx-14">
          <v-list-item-title>
            <v-btn small outlined color="indigo">
              {{ task.title }}
            </v-btn>
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="$store.state.role === 'admin'">
          <task-menu :task="task" />
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
// import { format } from "date-fns";

export default {
  props: ["task"],
  // filters: {
  //   niceDate(value) {
  //     return format(new Date(value), "MMM d");
  //   },
  // },
  components: {
    "task-menu": require("@/components/Todo/TaskMenu.vue").default,
  },
};
</script>
