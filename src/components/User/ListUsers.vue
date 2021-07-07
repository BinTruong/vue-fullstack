<template>
  <!-- <v-simple-table class="mt-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Username
          </th>
          <th class="text-left">
            FirstName
          </th>
          <th class="text-left">
            LastName
          </th>
          <th class="text-left">
            Role
          </th>
          <th class="text-right">
            Options
          </th>
        </tr>
      </thead>
      <tbody>
        <user
          v-for="user in $store.getters.tasksFilteredUser"
          :key="user.id"
          :user="user"
        >
        </user>
      </tbody>
    </template>
  </v-simple-table> -->
  <v-container class="px-16">
    <user
      v-for="user in $store.getters.tasksFilteredUser"
      :key="user.id"
      :user="user"
    >
    </user>
  </v-container>
</template>

<script>
export default {
  components: {
    user: require("@/components/User/User.vue").default,
  },
};
</script>
