<template>
  <v-list class="pt-0" flat>
    <task
      v-for="task in $store.getters.tasksFiltered"
      :key="task.id"
      :task="task"
    />
  </v-list>
</template>

<script>
export default {
  props: ["task"],
  components: {
    task: require("@/components/Todo/Task.vue").default,
  },
};
</script>
