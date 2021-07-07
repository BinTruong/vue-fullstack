<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Edit category
      </v-card-title>
      <v-card-text>
        Edit the title of this category:
        <v-text-field v-model="categoryTitle" @keyup.enter="saveTask" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>
          Cancel
        </v-btn>
        <v-btn
          @click="saveTask"
          :disabled="categoryTitleInvalid"
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
const { categoriesApi } = require("../../../apis");
import { mapMutations } from "vuex";
import { bus } from "../../../main";
export default {
  props: ["task"],
  data() {
    return {
      categoryTitle: null,
    };
  },
  computed: {
    categoryTitleInvalid() {
      return !this.categoryTitle || this.categoryTitle === this.task.title;
    },
  },
  methods: {
    ...mapMutations({
      showSnackbar: "showSnackbar",
    }),
    saveTask: async function() {
      const result = await categoriesApi.updateCategory(this.task._id, {
        title: this.categoryTitle,
      });
      if (result.data.code === 200) {
        this.$emit("close");
        bus.$emit("submited");
        this.showSnackbar("Update category Successfully");
      }
      if (result.data.code === 400) {
        this.showSnackbar("Something is not right, please try again");
        this.$emit("close");
      }
    },
  },
  mounted() {
    this.categoryTitle = this.task.title;
  },
};
</script>

<style></style>
