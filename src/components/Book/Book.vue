<template>
  <v-row justify="center" class="mx-5 my-2">
    <v-dialog v-model="dialog" width="800px">
      <!-- <div>
    <v-list-item
      @click="$store.commit('doneTask', task.id)"
      :class="{ 'blue lighten-5' : task.done }"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox
            :input-value="task.done"
            color="primary"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through' : task.done }"
          >
            {{ task.title }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ task.dueDate | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <task-menu :task="task" />
        </v-list-item-action>
      </template>

    </v-list-item>
    <v-divider></v-divider>

  </div> -->
      <!-- <div> -->
      <template v-slot:activator="{ on, attrs }">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 24 : 6"
              class="transition-swing"
              v-bind="attrs"
              v-on="on"
            >
              <v-img
                height="120"
                :src="
                  'https://nodejs-auth-restapi-crud.herokuapp.com/' + book.cover
                "
              ></v-img>
              <v-btn class="ml-4 mt-3" small outlined color="indigo">
                {{ book.category.title }}
              </v-btn>
              <v-card-title class="headline">
                {{ book.title }}
              </v-card-title>
              <v-card-text class="py-0">
                <p>{{ book.description.substring(0, 80) + "..." }}</p>
              </v-card-text>
              <!-- <v-card-action>
            <book-menu :book="book" />
          </v-card-action> -->
            </v-card>
          </template>
        </v-hover>
      </template>
      <v-card>
        <v-img
          height="450"
          :src="'https://nodejs-auth-restapi-crud.herokuapp.com/' + book.cover"
        ></v-img>
        <v-card-title>
          <span class="text-h5"
            >{{ book.title }} - {{ book.author }} 's DETAILS</span
          >
          <v-btn class="ml-4" small outlined color="indigo">
            {{ book.category.title }}
          </v-btn>
        </v-card-title>
        <v-card-text class="body-1">
          {{ book.description }}
        </v-card-text>
      </v-card>
      <!-- 
    <dialog-detail :task="task" v-if="dialog" />
  </div> -->
    </v-dialog>
  </v-row>
</template>

<script>
// import { format } from "date-fns";

export default {
  props: ["book"],
  // filters: {
  //   niceDate(value) {
  //     return format(new Date(value), "MMM d");
  //   },
  // },
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    // "book-menu": require("@/components/Book/TaskMenuBook.vue").default,
  },
};
</script>
