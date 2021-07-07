<template v-slot:default>
  <!-- <tr>
    <td>{{ user.userName }}</td>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.role }}</td>
    <td class="text-right"><task-menu :user="user" /></td>
  </tr> -->

  <v-card flat>
    <v-layout row wrap :class="`pa-3 project ${user.role[0]}`">
      <v-flex xs12 md4>
        <div class="caption grey--text">User Name</div>
        <div>{{ user.username }}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">First Name</div>
        <div>{{ user.firstName }}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Last Name</div>
        <div>{{ user.lastName }}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Role</div>
        <div>
          <v-chip small :class="`white--text caption ${user.role[0]}`">{{
            user.role[0]
          }}</v-chip>
        </div>
      </v-flex>
      <v-flex xs2 sm4 md2>
        <div class="text-right caption grey--text">
          Actions
          <task-menu :user="user" />
        </div>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  props: ["user"],
  components: {
    "task-menu": require("@/components/User/TaskMenu.vue").default,
  },
};
</script>

<style scoped>
.project.normal {
  border-left: 4px solid #3cd1c2;
}
.project.contributor {
  border-left: 4px solid #ffaa2c;
}
.project.admin {
  border-left: 4px solid #f83e70;
}
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
