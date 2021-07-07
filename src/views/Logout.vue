<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="headline">
            Are you sure you want to Log Out?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="cancel">
              No
            </v-btn>
            <!-- @click="$store.dispatch('deleteUser', user.id)" -->
            <v-btn color="red darken-1" text @click="logout">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
const { authApi } = require("../apis/");
export default {
  //   props: ["user"],
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER_INFO",
      setUserRole: "SET_USER_ROLE",
      showSnackbar: "showSnackbar",
      setBooksData: "SET_BOOKS_DATA",
    }),

    logout: async function() {
      const result = await authApi.logout();

      if (result.data.code === 200) {
        this.setUserInfo({});
        this.setUserRole("");
        this.showSnackbar("Logout Successfull");
        this.setBooksData({});
        this.$router.push("/");
      }
    },
    cancel() {
      this.showSnackbar("Nice choice");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
