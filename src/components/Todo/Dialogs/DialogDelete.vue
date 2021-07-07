<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Delete Category?
      </v-card-title>
      <v-card-text
        >Are you sure you wanna delete this category task?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>
          No
        </v-btn>
        <v-btn @click="deleteThisCategory" color="red darken-1" text>
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const { categoriesApi } = require("../../../apis/");
import { mapMutations } from "vuex";
import { bus } from "../../../main";
export default {
  props: ["task"],
  methods: {
    ...mapMutations({
      showSnackbar: "showSnackbar",
    }),
    deleteThisCategory: async function() {
      const result = await categoriesApi.deleteCategory(this.task._id);
      if (result.data.code === 200) {
        this.$emit("close");
        bus.$emit("submited");
        this.showSnackbar("Delete category Successfully");
      }
      if (result.data.code === 400) {
        this.showSnackbar("Something is not right, please try again");
        this.$emit("close");
      }
    },
  },
};
</script>

<style></style>
