<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="headline">
            Change Password
          </v-card-title>
          <v-card-text>
            <!-- <v-text-field label="Old Password" v-model="oldPassworde" />
            <v-text-field label="New Password" v-model="newPassword" /> -->
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'passWord'"
              label="Old Password"
              hint="At least 8 characters"
              class="input-group--focused"
              @click:append="show = !show"
              color="teal accent-3"
              v-model="oldPassword"
            />
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'passWord'"
              label="New Password"
              hint="At least 8 characters"
              class="input-group--focused"
              @click:append="show = !show"
              color="teal accent-3"
              v-model="newPassword"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="reset">
              Reset
            </v-btn>
            <!-- @click="$store.dispatch('deleteUser', user.id)" -->
            <v-btn color="red darken-1" text @click="Confirm">
              Confirm
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
  data: () => ({
    show: false,
    passWord: "Password",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    oldPassword: "",
    newPassword: "",
  }),
  methods: {
    ...mapMutations({
      // setUserInfo: "SET_USER_INFO",
      // setUserRole: "SET_USER_ROLE",
      showSnackbar: "showSnackbar",
    }),

    Confirm: async function() {
      const result = await authApi.changePassword({
        username: this.$store.state.userInfo.data.user.username,
        password: this.oldPassword,
        newPassword: this.newPassword,
      });
      //! Để sau sửa
      if (result.data.code === 200) {
        debugger;
        console.log(result.data);
        // this.setUserInfo({});
        // this.setUserRole(result.data.data.user.role[0]);
        this.showSnackbar("Logout Successfull");
        this.$router.push("/");
      }
    },
    reset() {
      this.oldPassword = "";
      this.newPassword = "";
    },
  },
};
</script>

<style></style>
