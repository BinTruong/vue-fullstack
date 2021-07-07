<template>
  <v-dialog :value="true" persistent max-width="500">
    <v-card>
      <v-card-title class="headline">
        Edit User
      </v-card-title>
      <v-card-text>
        Edit the details of this User:
        <v-text-field v-model="userName" />
        <!-- <v-text-field v-model="password"/> -->
        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'passWord'"
          label="Password"
          hint="At least 8 characters"
          class="input-group--focused"
          v-model="password"
          @click:append="show = !show"
        ></v-text-field>
        <v-text-field v-model="firstName" />
        <v-text-field v-model="lastName" @keyup.enter="saveUser" />
        <v-select :items="items" label="Role" v-model="role"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>
          Cancel
        </v-btn>
        <v-btn
          @click="saveUser"
          :disabled="userInvalid"
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
  props: ["user"],
  data() {
    return {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
      items: ["normal", "contributor", "admin"],
      show: false,
      passWord: "Password",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  computed: {
    userInvalid() {
      return (
        (!this.userName || this.userName === this.user.userName) &&
        (!this.firstName || this.firstName === this.user.firstName) &&
        (!this.lastName || this.lastName === this.user.lastName) &&
        (!this.role || this.role === this.user.role[0])
      );
    },
  },
  methods: {
    ...mapMutations({
      showSnackbar: "showSnackbar",
    }),
    saveUser: async function() {
      // if (!this.userInvalid) {
      //   let payload = {
      //     id: this.user.id,
      //     userName: this.userName,
      //     password: this.password,
      //     firstName: this.firstName,
      //     lastName: this.lastName,
      //     role: this.role,
      //   };
      //   this.$store.dispatch("updateUser", payload);
      //   this.$emit("close");
      // }
      const result = await usersApi.updateUser(this.user._id, {
        username: this.userName,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
      });
      if (result.data.code === 200) {
        this.$emit("close");
        bus.$emit("submited");
        this.showSnackbar("Update User Successfully");
      }
      if (result.data.code === 400) {
        this.showSnackbar("Something is not right, please try again");
        this.$emit("close");
      }
    },
  },
  mounted() {
    this.userName = this.user.username;
    // this.password = this.user.password;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.role = this.user.role[0];
  },
};
</script>

<style></style>
