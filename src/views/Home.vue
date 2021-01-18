<template>
  <v-container fluid class="container-home">
    <v-row>
      <v-col cols="12"
        ><h1 class="text-center d-none d-sm-block text-h5 text-md-h3">
          Matemáticas Discretas
        </h1></v-col
      >
      <template v-for="route in $router.options.routes">
        <v-col :key="route.path" v-if="route.meta.menu" class="text-center">
          <v-card
            ripple
            @click.stop="goToRoute(route)"
            outlined
            hover
            color="primary"
            height="100%"
          >
            <v-card-text class="text-center">
              <v-icon
                class="mt-2 mt-md-4"
                :size="$vuetify.breakpoint.mdAndUp ? '70px' : '35px'"
                >{{ route.meta.icon }}</v-icon
              >
              <v-spacer></v-spacer>
              <h1 class="text-h5 text-lg-h4 my-2 my-md-4">
                {{ route.meta.title }}
              </h1>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <v-col cols="12 pa-0"></v-col>
      <v-col cols="12" sm="4" offset-sm="4" class="text-center">
        <v-card
          ripple
          @click.stop="goToRoute(rutaProyecto)"
          outlined
          hover
          color="secondary"
          height="100%"
        >
          <v-card-text class="text-center">
            <v-icon
              class="mt-1 mt-md-2"
              :size="$vuetify.breakpoint.mdAndUp ? '50px' : '25px'"
              >{{ rutaProyecto.meta.icon }}</v-icon
            >
            <v-spacer></v-spacer>
            <h1 class="text-h6 text-lg-h5 my-1 my-md-2">
              {{ rutaProyecto.meta.title }}
            </h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import bus from "@/bus";
export default {
  name: "Home",
  components: {},
  data: () => ({
    dialog: false,
    errorProposicion: null,
    rutaProyecto: null,
  }),
  methods: {
    goToRoute(route) {
      if (this.$vuetify.breakpoint.lgAndUp) {
        bus.$emit("fromHomeToRoute", true);
      }
      this.$router.push(route);
    },
  },
  created() {
    this.rutaProyecto = this.$router.options.routes.find((route) => {
      return route.name == "Proyecto";
    });
  },
};
</script>
<style lang="scss" scoped>
.container-home {
  height: 100%;
  position: relative;
  > div {
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
    top: 42%;
    transform: translateY(-50%);
  }
}
</style>
