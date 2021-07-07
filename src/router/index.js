import Vue from "vue";
import VueRouter from "vue-router";
import Todo from "../views/Todo.vue";
const store = require("../store").default;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/auth",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/",
      component: () => import("../views/dashboard/Index.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "category",
          name: "Category",
          component: Todo,
        },
        {
          path: "book",
          name: "Book",
          component: () => import("../views/BookManagement.vue"),
        },
        {
          path: "user",
          name: "User",
          component: () => import("../views/UserManagement.vue"),
        },
        {
          path: "logout",
          name: "Logout",
          component: () => import("../views/Logout.vue"),
        },
        {
          path: "changePassword",
          name: "ChangePassword",
          component: () => import("../views/ChangePassword.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = store.getters.GET_TOKEN;
  let role = "";
  if (token) {
    role = store.getters.GET_USER_ROLE;
  }

  const permission = [
    {
      roles: "normal",
      namePage: ["Home", "Category", "Logout", "ChangePassword"],
    },
    {
      roles: "contributor",
      namePage: ["Home", "Category", "Book", "Logout", "ChangePassword"],
    },
  ];

  const permissionObj = permission.find(({ roles }) => roles === role);

  if (to.name !== "Login" && !token) {
    next({ name: "Login" });
  } else if (to.name === "Login" && token) {
    next({ name: "Home" });
  } else if (permissionObj) {
    if (permissionObj.namePage.includes(to.name)) {
      next();
    } else {
      next({ name: "Home" });
    }
  } else next();
});

// router.beforeEach((to, from, next) => {
//   const title = store.state.userInfo.data.user.role[0].toUpperCase();
//   document.title = `${process.env.VUE_APP_TITLE} - ${title}`;
//   next();
// });

export default router;
