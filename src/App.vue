<template>
  <div>
    <router-view />
    <snackbar />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    snackbar: require("@/components/Shared/Snackbar.vue").default,
  },
};
</script>
