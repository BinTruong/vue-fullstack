<template>
  <v-dialog :value="true" persistent max-width="600">
    <v-card>
      <form>
        <v-card-title class="headline">
          Edit book
        </v-card-title>
        <v-card-text>
          <input
            accept="image/*"
            label="Cover image"
            prepend-icon="mdi-camera"
            placeholder="Pick an image"
            @change="previewImage"
            type="file"
          />

          <!-- <v-img :src="url"></v-img> -->
          <div class="border p-2 mt-3">
            <template v-if="image">
              <v-img
                height="250"
                :src="!preview ? 'http://localhost:3001/' + image : preview"
                class="img-fluid"
              />
            </template>
          </div>
          <v-text-field label="Title" v-model="bookTitle"></v-text-field>
          <v-select
            :items="itemsCat"
            label="Category"
            v-model="bookCategory"
            item-text="title"
            item-value="_id"
          ></v-select>
          <v-textarea v-model="bookDescription">
            <template v-slot:label>
              <div>
                Description
              </div>
            </template>
          </v-textarea>
          <v-text-field label="Author" v-model="bookAuthor"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('close')" text>
            Cancel
          </v-btn>
          <v-btn
            @click="saveBook"
            :disabled="bookInvalid"
            color="red darken-1"
            text
          >
            Save
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
const { booksApi, categoriesApi } = require("../../../apis/");
import { mapMutations } from "vuex";
import { bus } from "../../../main";
export default {
  props: ["book"],
  data() {
    return {
      image: "",
      preview: "",
      url: "",
      bookTitle: "",
      bookDescription: "",
      bookAuthor: "",
      bookCategory: [],
      itemsCat: [],
      checkCategory: "",
    };
  },
  computed: {
    bookInvalid() {
      return (
        (!this.image || this.image === this.book.cover) &&
        (!this.bookTitle || this.bookTitle === this.book.title) &&
        (!this.bookDescription ||
          this.bookDescription === this.book.description) &&
        (!this.bookAuthor || this.bookAuthor === this.book.author) &&
        (!this.bookCategory || this.bookCategory === this.book.category._id)
      );
    },
  },
  methods: {
    ...mapMutations({
      showSnackbar: "showSnackbar",
    }),
    previewImage: function(event) {
      const input = event.target;
      if (input) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    saveBook: async function() {
      const data = {
        title: this.bookTitle,
        description: this.bookDescription,
        author: this.bookAuthor,
        category: this.bookCategory,
      };
      // if (this.checkCategory !== this.bookCategory) {
      //   data.category = this.bookCategory;
      // } else {
      //   data.category = this.bookCategory._id;
      // }
      if (this.image) {
        data.cover = this.image;
      }
      const result = await booksApi.updateBook(this.book._id, data);
      debugger;
      if (result.data.code === 200) {
        this.showSnackbar("Update Book Successfully");
        bus.$emit("submited");
        this.$emit("close");
      }
      if (result.data.code === 400) {
        this.showSnackbar("Something is not right, please try again");
      }
    },
    getListCat: async function() {
      const result = await categoriesApi.getCategory();
      const res = result.data;
      if (res) {
        res.categories.map((item) => this.itemsCat.push(item));
      }
    },
  },
  created() {
    this.getListCat();
    this.bookTitle = this.book.title;
    this.bookDescription = this.book.description;
    this.bookAuthor = this.book.author;
    this.bookCategory = this.book.category._id;
    this.image = this.book.cover;
    // this.checkCategory = this.book.category;
  },
};
</script>

<style></style>
