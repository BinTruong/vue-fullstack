<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-img
        class="pa-4 pt-7"
        src="mountains.jpg"
        height="170"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2" color="indigo">
          <!-- <img
            src="https://s.gravatar.com/avatar/ce7f3697e231df38b3ca6065848520da?s=160"
            alt="Danny Connell"
          /> -->
          <v-icon dark size="50">
            {{ avatar }}
          </v-icon>
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">
          {{ FirstName }} {{ LastName }}
        </div>
      </v-img>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="mountains.jpg"
      prominent
      height="170"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <!-- <search /> -->
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">
            {{ $store.state.appTitle }}
          </v-toolbar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: function() {
    return {
      drawer: null,
      avatar:
        this.$store.state.role === "admin"
          ? "mdi-shield-account"
          : "mdi-account-circle",
      FirstName: this.$store.state.userInfo.data.user.firstName,
      LastName: this.$store.state.userInfo.data.user.lastName,
      items: [
        // { title: "Home", icon: "mdi-home-circle", to: "/admin" },
        // {
        //   title: "Category",
        //   icon: "mdi-format-list-checks",
        //   to: "/admin/category",
        // },
        // {
        //   title: "Book",
        //   icon: "mdi-book-open-page-variant-outline",
        //   to: "/admin/book",
        // },
        // {
        //   title: "User",
        //   icon: "mdi-account-edit",
        //   to: "/admin/user",
        // },
        // {
        //   title: "Sign out",
        //   icon: "mdi-logout-variant",
        //   to: "/admin/logout",
        // },
      ],
    };
  },
  computed: {
    checkRole() {
      console.log(this.$store.state.role);
      return this.$store.state.role;
    },
  },
  created() {
    const itemRouterAdmin = [
      { title: "Home", icon: "mdi-home-circle", to: "/" },
      {
        title: "Category",
        icon: "mdi-format-list-checks",
        to: "category",
      },
      {
        title: "Book",
        icon: "mdi-book-open-page-variant-outline",
        to: "book",
      },
      {
        title: "User",
        icon: "mdi-account-edit",
        to: "user",
      },
      {
        title: "Change Password",
        icon: "mdi-lock-reset",
        to: "changePassword",
      },
      {
        title: "Sign out",
        icon: "mdi-logout-variant",
        to: "logout",
      },
    ];
    const itemRouterNormal = [
      { title: "Home", icon: "mdi-home-circle", to: "/" },
      {
        title: "Category",
        icon: "mdi-format-list-checks",
        to: "category",
      },
      {
        title: "Change Password",
        icon: "mdi-lock-reset",
        to: "changePassword",
      },
      {
        title: "Sign out",
        icon: "mdi-logout-variant",
        to: "logout",
      },
    ];
    const itemRouterContributor = [
      { title: "Home", icon: "mdi-home-circle", to: "/" },
      {
        title: "Category",
        icon: "mdi-format-list-checks",
        to: "category",
      },
      {
        title: "Book",
        icon: "mdi-book-open-page-variant-outline",
        to: "book",
      },
      {
        title: "Change Password",
        icon: "mdi-lock-reset",
        to: "changePassword",
      },
      {
        title: "Sign out",
        icon: "mdi-logout-variant",
        to: "logout",
      },
    ];
    if (this.checkRole === "admin") {
      this.items = itemRouterAdmin;
    }
    if (this.checkRole === "normal") {
      this.items = itemRouterNormal;
    }
    if (this.checkRole === "contributor") {
      this.items = itemRouterContributor;
    }
  },
  components: {
    search: require("@/components/Tools/Search.vue").default,
    "live-date-time": require("@/components/Tools/LiveDateTime.vue").default,
    snackbar: require("@/components/Shared/Snackbar.vue").default,
  },
};
</script>

<style lang="sass">
.header-container
  max-width: none
</style>
