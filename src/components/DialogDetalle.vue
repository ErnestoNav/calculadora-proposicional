<template>
  <v-dialog
    v-model="show"
    scrollable
    transition="dialog-bottom-transition"
    max-width="700"
    @click:outside="salir"
  >
    <template v-slot:default>
      <v-card>
        <v-toolbar color="secondary" dense dark>Infornación adicional</v-toolbar>
        <v-card-text class="pt-2">
          <template v-for="el in detalle">
            <div :key="el.title">
              <h5 class="text-h6">{{ el.title }}</h5>
              <p>{{ el.text }}</p>
              <v-img
                  contain
                  position="center"
                  :src="el.img"
                  width="900px"
                  max-width="100%"
                  max-height="300px"
                  class="mb-3"
                ></v-img>
            </div>
          </template>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="salir">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  
</template>

<script>
import bus from "@/bus";
export default {
  name: "DialogDetalle",
  data: () => ({
    show: false,
    detalle: [],
  }),
  methods: {
    salir() {
      this.show = false;
    },
  },
  created() {
    bus.$on("verDetalle", (detalle) => {
      this.detalle = detalle;
      this.show = true;
    });
  },
};
</script>
<style lang="scss">
</style>