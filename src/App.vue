<template>
  <v-app>
    <v-app-bar app color="primary" clipped-left tile>
      <div class="d-flex align-center logo" @click.stop="$route.name !== 'Home' ? $router.push({name:'Home'}): null" v-ripple>
        <v-icon size="25px" class="mr-3">fa-calculator</v-icon>
        <h1 class="text-h6">Matemáticas Discretas</h1>
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.mdAndDown"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer :stateless="$vuetify.breakpoint.lgAndUp" v-model="drawer" app clipped floating>
      <v-list nav>
        <template v-for="route in $router.options.routes">
          <v-list-item
            v-if="route.meta.title"
            :key="route.path"
            link
            :to="{ name: route.name }"
            exact color="yellow"
          >
            <v-list-item-avatar>
              <v-icon>{{ route.meta.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view ></router-view>
    </v-main>
  </v-app>
</template>
<script>
import bus from "@/bus";
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: Boolean,
  }),
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if(to.name === 'Home'){
          this.drawer = false;
        }
        document.title = to.meta.title
          ? "Matemáticas Discretas - " + to.meta.title
          : "Matemáticas Discretas";
      },
    },
  },
  created() {
    this.drawer = this.$vuetify.breakpoint.lgAndUp && this.$route.name !== 'Home';
    bus.$on("fromHomeToRoute", () => {
      this.drawer = true;
    });
    //console.log(this.$router.options.routes);
  },
};
</script>
<style>
.logo{
  cursor:pointer;
}
.container{
  min-height: 100%;
}
</style>
