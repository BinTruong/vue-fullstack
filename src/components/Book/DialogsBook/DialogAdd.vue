<template>
  <v-dialog :value="true" persistent max-width="500">
    <v-card>
      <form>
        <v-card-title class="headline">
          Add Book
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
            <template v-if="preview">
              <v-img :src="preview" class="img-fluid" />
            </template>
          </div>

          <v-text-field label="Title" v-model="book.newTitle" />
          <v-textarea
            name="input-7-1"
            label="Description"
            hint="Hint text"
            v-model="book.newDescription"
          ></v-textarea>
          <v-text-field label="Author" v-model="book.newAuthor" />
          <!-- <v-text-field label="LastName" v-model="book.newLastName" /> -->
          <v-select
            :items="itemsCat"
            label="Category"
            v-model="book.newCategory"
            item-text="title"
            item-value="_id"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('close')" text>
            Cancel
          </v-btn>
          <v-btn
            @click="addBook"
            :disabled="newBookTitleInvalid"
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
  data() {
    return {
      image: null,
      preview: null,
      url: null,
      itemsCat: [],
      book: [
        {
          newTitle: "",
          newDescription: "",
          newAuthor: "",
          newCategory: "",
        },
      ],

      //   items: ["User", "Contributor"],
    };
  },
  computed: {
    newBookTitleInvalid() {
      if (
        !this.book.newTitle ||
        !this.book.newDescription ||
        !this.book.newAuthor ||
        !this.book.newCategory
      )
        return true;
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
    addBook: async function() {
      const data = {
        title: this.book.newTitle,
        description: this.book.newDescription,
        author: this.book.newAuthor,
        category: this.book.newCategory,
      };

      if (this.image) {
        data.cover = this.image;
      }
      debugger;
      const result = await booksApi.createBook(data);
      if (result.data.code === 200) {
        this.showSnackbar("Add Book Successfully");
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
  mounted() {
    this.getListCat();
  },
};
</script>

<style></style>
