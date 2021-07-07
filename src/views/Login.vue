<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Sign in
                        </h1>
                        <v-form class="mx-16 px-16">
                          <v-text-field
                            label="UserName"
                            name="UserName"
                            type="text"
                            color="teal accent-3"
                            v-model="username"
                          />

                          <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show ? 'text' : 'passWord'"
                            label="Password"
                            hint="At least 8 characters"
                            class="input-group--focused"
                            color="teal accent-3"
                            @click:append="show = !show"
                            v-model="password"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-3" dark @click="login"
                          >SIGN IN</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      class="teal accent-3 d-flex flex-column justify-center align-center"
                    >
                      <v-card-text class="white--text">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5 class="text-center">
                          Enter your personal details and start journay with us
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col
                      cols="12"
                      md="4"
                      class="teal accent-3 d-flex flex-column justify-center align-center"
                    >
                      <v-card-text class="white--text">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5 class="text-center">
                          To Keep connected with us please login with your
                          personnel info
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Sign in</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Create Account
                        </h1>

                        <v-form class="mx-16 px-16 ">
                          <v-text-field
                            label="UserName"
                            name="UserName"
                            type="text"
                            color="teal accent-3"
                            v-model="signUp_username"
                          />
                          <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show ? 'text' : 'passWord'"
                            label="Password"
                            hint="At least 8 characters"
                            class="input-group--focused"
                            @click:append="show = !show"
                            color="teal accent-3"
                            v-model="signUp_password"
                          />
                          <v-text-field
                            label="FirstName"
                            name="FirstName"
                            type="text"
                            color="teal accent-3"
                            v-model="signUp_firstName"
                          />
                          <v-text-field
                            label="LastName"
                            name="LastName"
                            type="text"
                            color="teal accent-3"
                            v-model="signUp_lastName"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-5">
                        <v-btn
                          rounded
                          color="teal accent-3"
                          dark
                          @click="signUp"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
const { authApi } = require("../apis/");

export default {
  data: () => ({
    step: 1,
    show: false,
    passWord: "Password",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    username: "",
    password: "",
    signUp_username: "",
    signUp_password: "",
    signUp_firstName: "",
    signUp_lastName: "",
  }),

  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER_INFO",
      setUserRole: "SET_USER_ROLE",
      showSnackbar: "showSnackbar",
    }),

    login: async function() {
      const result = await authApi.login({
        username: this.username,
        password: this.password,
      });

      if (result.data.code === 200) {
        this.setUserInfo(result.data);
        this.setUserRole(result.data.data.user.role[0]);
        this.showSnackbar("Login Successfully");
        this.$router.push("/");
      }
      if (result.data.code === 400) {
        // this.setUserRole(result.data.data.user.role[0]);
        (this.username = ""), (this.password = "");
        this.showSnackbar(
          "UserName or Password is wrong, please check more carefully"
        );
        // this.$router.push("/");
      }
      // else {
      //   // show wrong username & password into UI
      //   this.showSnackbar(
      //     "UserName or Password is wrong, please check more carefully"
      //   );
      // }
    },
    signUp: async function() {
      const result = await authApi.register({
        username: this.signUp_username,
        password: this.signUp_password,
        firstName: this.signUp_firstName,
        lastName: this.signUp_lastName,
      });

      if (result.data.code === 200) {
        // this.setUserInfo(result.data);
        // this.setUserRole(result.data.data.user.role[0]);
        // (this.signUp_username = ""),
        //   (this.signUp_password = ""),
        //   (this.signUp_firstName = ""),
        //   (this.signUp_lastName = "");
        this.showSnackbar("Register Successfully, please login to complete");

        this.step--;
        // this.$router.push("/auth");
      }
      if (result.data.code === 400) {
        // this.setUserRole(result.data.data.user.role[0]);
        (this.signUp_username = ""),
          (this.signUp_password = ""),
          (this.signUp_firstName = ""),
          (this.signUp_lastName = "");
        this.showSnackbar(
          "Maybe the username is duplicated or the password is not suitable, please re-enter"
        );
        //   // this.$router.push("/");
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
