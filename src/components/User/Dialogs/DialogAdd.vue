<template>
  <v-dialog :value="true" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">
        Add User
      </v-card-title>
      <v-card-text>
        <v-text-field label="User Name" v-model="user.newUserName" />
        <!-- <v-text-field label="Password" v-model="user.newPassword" /> -->
        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          label="Password"
          hint="At least 8 characters"
          class="input-group--focused"
          v-model="user.newPassword"
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field label="First Name" v-model="user.newFirstName" />
        <v-text-field label="Last Name" v-model="user.newLastName" />
        <v-select :items="items" label="Role" v-model="user.newRole"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>
          Cancel
        </v-btn>
        <v-btn
          @click="addBook"
          :disabled="newUserInvalid"
          color="red darken-1"
          text
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const { usersApi } = require("../../../apis");
import { mapMutations } from "vuex";
import { bus } from "../../../main";
export default {
  data() {
    return {
      user: [
        {
          newUserName: "",
          newPassword: "",
          newFirstName: "",
          newLastName: "",
          newRole: "",
        },
      ],
      show: false,
      password: "Password",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },

      items: ["normal", "contributor", "admin"],
    };
  },
  computed: {
    newUserInvalid() {
      if (
        !this.user.newUserName ||
        this.user.newPassword.length < 8 ||
        !this.user.newFirstName ||
        !this.user.newLastName ||
        !this.user.newRole
      )
        return true;
    },
  },
  methods: {
    ...mapMutations({
      showSnackbar: "showSnackbar",
    }),
    addBook: async function() {
      const result = await usersApi.createUser({
        username: this.user.newUserName,
        password: this.user.newPassword,
        firstName: this.user.newFirstName,
        lastName: this.user.newLastName,
        role: this.user.newRole,
      });
      if (result.data.code === 200) {
        this.showSnackbar("Add User Successfully");
        bus.$emit("submited");
        this.$emit("close");
      }
      if (result.data.code === 400) {
        this.user.newUserName = "";
        this.user.newPassword = "";
        this.user.newFirstName = "";
        this.user.newLastName = "";
        this.user.newRole = "";
        this.showSnackbar("Something is not right, please try again");
      }
    },
  },
};
</script>

<style></style>
