import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
// import Image from "../assets/form.png";

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    userInfo: null,
    search: null,
    role: null,
    booksData: [],
    usersData: [],
    categoriesData: [],
    // users: [
    //   {
    //     id: 1,
    //     userName: "BinTruong",
    //     password: "12345678",
    //     firstName: "Bin",
    //     lastName: "Truong",
    //     role: "admin",
    //   },
    //   {
    //     id: 2,
    //     userName: "TrongKhiem",
    //     password: "12345678",
    //     firstName: "Trong",
    //     lastName: "Khiem",
    //     role: "admin",
    //   },
    //   {
    //     id: 3,
    //     userName: "QuocAnh",
    //     password: "12345678",
    //     firstName: "Quoc",
    //     lastName: "Anh",
    //     role: "admin",
    //   },
    // ],
    tasks: [
      {
        id: 1,
        title: "Wake up",
      },
      {
        id: 2,
        title: "Get bananas",
      },
      {
        id: 3,
        title: "Eat bananas",
      },
    ],
    // books: [
    //   {
    //     id: 1,
    //     title: "Wake up",
    //     description:
    //       "Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.",
    //     author: "author 1",
    //     cover: Image,
    //     category: "category 1",
    //   },
    //   {
    //     id: 2,
    //     title: "Get bananas",
    //     description:
    //       "Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.",
    //     author: "author 1",
    //     cover: Image,
    //     category: "category 1",
    //   },
    //   {
    //     id: 3,
    //     title: "Eat bananas",
    //     description:
    //       "Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.",
    //     author: "author 1",
    //     cover: Image,
    //     category: "category 1",
    //   },
    //   {
    //     id: 4,
    //     title: "Evil",
    //     description:
    //       "Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.",
    //     author: "author 1",
    //     cover: Image,
    //     category: "category 1",
    //   },
    //   {
    //     id: 5,
    //     title: "Eat bananas",
    //     description:
    //       "Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.",
    //     author: "author 1",
    //     cover: Image,
    //     category: "category 1",
    //   },
    //   {
    //     id: 6,
    //     title: "Evil",
    //     description:
    //       "Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.",
    //     author: "author 1",
    //     cover: Image,
    //     category: "category 1",
    //   },
    // ],
    snackbar: {
      show: false,
      text: "",
    },
  },
  mutations: {
    // role
    SET_USER_ROLE(state, payload) {
      state.role = payload;
    },

    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    SET_BOOKS_DATA(state, payload) {
      state.booksData = payload;
    },
    SET_USERS_DATA(state, payload) {
      state.usersData = payload;
    },
    SET_CATEGORIES_DATA(state, payload) {
      state.categoriesData = payload;
    },
    RESET_USER_INFO(state) {
      state.userInfo = null;
    },
    setSearch(state, value) {
      state.search = value;
    },

    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
      };
      state.tasks.unshift(newTask);
    },
    addUser(state, payload) {
      let newUser = {
        id: Date.now(),
        userName: payload.newUserName,
        password: payload.newPassword,
        firstName: payload.newFirstName,
        lastName: payload.newLastName,
        role: payload.newRole,
      };
      state.users.unshift(newUser);
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    deleteBook(state, id) {
      state.books = state.books.filter((book) => book.id !== id);
    },
    deleteUser(state, id) {
      state.users = state.users.filter((user) => user.id !== id);
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateBook(state, payload) {
      let book = state.books.filter((book) => book.id === payload.id)[0];
      book.title = payload.title;
      book.description = payload.description;
      book.author = payload.author;
      book.category = payload.category;
    },
    updateUser(state, payload) {
      let user = state.users.filter((user) => user.id === payload.id)[0];
      user.userName = payload.userName;
      user.password = payload.password;
      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      user.role = payload.role;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    RESET_USER_INFO(state) {
      state.userInfo = null;
    },
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      commit("addTask", newTaskTitle);
      commit("showSnackbar", "Category has been added!");
    },
    addUser({ commit }, payload) {
      commit("addUser", payload);
      commit("showSnackbar", "User has been added!");
    },
    deleteTask({ commit }, id) {
      commit("deleteTask", id);
      commit("showSnackbar", "Category has been deleted!");
    },
    deleteBook({ commit }, id) {
      commit("deleteBook", id);
      commit("showSnackbar", "Book has been deleted!");
    },
    deleteUser({ commit }, id) {
      commit("deleteUser", id);
      commit("showSnackbar", "User has been deleted!");
    },
    updateTaskTitle({ commit }, payload) {
      commit("updateTaskTitle", payload);
      commit("showSnackbar", "Category has been updated!");
    },
    updateBook({ commit }, payload) {
      commit("updateBook", payload);
      commit("showSnackbar", "Book has been updated!");
    },
    updateUser({ commit }, payload) {
      commit("updateUser", payload);
      commit("showSnackbar", "User has been updated!");
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.categoriesData;
      }
      return state.categoriesData.filter((category) =>
        category.title.toLowerCase().includes(state.search.toLowerCase())
      );
    },
    tasksFilteredBook(state) {
      if (!state.search) {
        return state.booksData;
      }
      return state.booksData.filter((book) =>
        book.title.toLowerCase().includes(state.search.toLowerCase())
      );
    },
    tasksFilteredUser(state) {
      if (!state.search) {
        return state.usersData;
      }
      return state.usersData.filter((user) =>
        user.username.toLowerCase().includes(state.search.toLowerCase())
      );
    },
    GET_USER_INFO(state) {
      return state.userInfo;
    },
    GET_TOKEN(state) {
      return state.userInfo && state.userInfo.token;
    },
    GET_USER_ROLE(state) {
      return state.role;
    },
  },
});
