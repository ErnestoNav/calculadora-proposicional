<template>
  <v-dialog v-model="show" max-width="325" @click:outside="salir">
    <v-alert
      text
      prominent
      border="left"
      colored-border
      type="error"
      class="ma-0 error-alert"
      >{{ errorMsg }}</v-alert
    >
  </v-dialog>
</template>

<script>
import bus from "@/bus";
export default {
  name: "DialogError",
  data: () => ({
    show: false,
    errorMsg: "",
  }),
  methods: {
    salir() {
      this.show = false;
      this.errorMsg = "";
    },
  },
  created() {
    bus.$on("error", (error) => {
      this.errorMsg = error;
      this.show = true;
    });
  },
};
</script>
<style lang="scss">
.error-alert {
  font-size: 1.2rem !important;
  .v-icon {
    margin-left: 6px;
  }
}
</style>