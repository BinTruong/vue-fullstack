<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Delete this user??
      </v-card-title>
      <v-card-text>Are you sure you wanna delete this user?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>
          No
        </v-btn>
        <v-btn @click="deleteThisUser" color="red darken-1" text>
          Yes
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
  methods: {
    ...mapMutations({
      showSnackbar: "showSnackbar",
    }),
    deleteThisUser: async function() {
      debugger;
      const result = await usersApi.deleteUser(this.user._id);
      if (result.data.code === 200) {
        this.$emit("close");
        bus.$emit("submited");
        this.showSnackbar("Delete user Successfully");
      } else if (result.data.code === 400) {
        this.showSnackbar("Something is not right, please try again");
        this.$emit("close");
      } else {
      }
    },
  },
};
</script>

<style></style>
