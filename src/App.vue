<template>
  <v-app>
    <v-app-bar app color="primary" clipped-left tile>
      <div
        class="d-flex align-center logo"
        @click.stop="
          $route.name !== 'Home' ? $router.push({ name: 'Home' }) : null
        "
        v-ripple
      >
        <v-icon size="25px" class="mr-3">fa-calculator</v-icon>
        <h1 class="text-h6">Matemáticas Discretas</h1>
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.mdAndDown"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      :stateless="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      app
      clipped
      floating
    >
      <v-list nav height="100%">
        <template v-for="route in $router.options.routes">
          <v-list-item
            v-if="route.meta.menu"
            :key="route.path"
            :to="{ name: route.name }"
            :class="route.name"
            exact
            color="yellow"
          >
            <v-list-item-avatar>
              <v-icon>{{ route.meta.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list-item
          :to="{ name: rutaProyecto.name }"
          :class="rutaProyecto.name"
          exact
          color="yellow"
        >
          <v-list-item-avatar>
            <v-icon>{{ rutaProyecto.meta.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ rutaProyecto.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
      <DialogDetalle />
      <DialogError />
    </v-main>
  </v-app>
</template>
<script>
import DialogDetalle from "@/components/DialogDetalle";
import DialogError from "@/components/DialogError";
import bus from "@/bus";
export default {
  name: "App",
  components: { DialogDetalle, DialogError },
  data: () => ({
    drawer: Boolean,
    rutaProyecto: null,
  }),
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if (to.name === "Home") {
          this.drawer = false;
        }
        document.title = to.meta.title
          ? "Matemáticas Discretas - " + to.meta.title
          : "Matemáticas Discretas";
      },
    },
  },
  created() {
    this.drawer =
      this.$vuetify.breakpoint.lgAndUp && this.$route.name !== "Home";
    bus.$on("fromHomeToRoute", () => {
      this.drawer = true;
    });
    this.rutaProyecto = this.$router.options.routes.find((route) => {
      return route.name == "Proyecto";
    });
  },
};
</script>
<style>
.logo {
  cursor: pointer;
}
.container {
  min-height: 100%;
}
.Proyecto {
  margin-top: 8px;
}
</style>
