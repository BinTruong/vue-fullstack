<template>
  <v-text-field
    v-model="newTaskTitle"
    @keyup.enter="addTask"
    class="pa-3"
    outlined
    label="Add Category"
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon @click="addTask" color="primary" :disabled="newTaskTitleInvalid">
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
const { categoriesApi } = require("../../apis/");
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      newTaskTitle: "",
    };
  },
  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle;
    },
  },
  methods: {
    // addTask() {
    //   if (!this.newTaskTitleInvalid) {
    //     this.$store.dispatch("addTask", this.newTaskTitle);
    //     this.newTaskTitle = "";
    //   }
    // },
    ...mapMutations({
      showSnackbar: "showSnackbar",
    }),
    addTask: async function() {
      const result = await categoriesApi.createCategory({
        title: this.newTaskTitle,
      });
      if (result.data.code === 200) {
        this.newTaskTitle = "";
        this.showSnackbar("Add category Successfully");
        this.$emit("submited");
      }
      if (result.data.code === 400) {
        this.showSnackbar("Something is not right, please try again");
      }
      // else {
      //   // show wrong username & password into UI
      //   this.showSnackbar(
      //     "UserName or Password is wrong, please check more carefully"
      //   );
      // }
    },
  },
};
</script>
