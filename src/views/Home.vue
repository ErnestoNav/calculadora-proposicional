<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <Calculadora />
      </v-col>
      <v-col>
        <v-card>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Conectivo lógico</th>
                  <th class="text-center">Símbolo</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in $store.getters['conectores']"
                  :key="item.tipo"
                >
                  <td>{{ item.tipo }}</td>
                  <td class="text-center">{{ item.sim }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols=12>
        <Resultados/>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="325">
      <v-alert
        text
        prominent
        border="left"
        colored-border
        type="error"
        class="ma-0 error-alert"
        >{{ errorProposicion }}</v-alert
      >
    </v-dialog>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Calculadora from "@/components/Calculadora";
import Resultados from "@/components/Resultados";
import bus from "@/bus";
export default {
  name: "Home",
  components: {
    Calculadora, Resultados
  },
  data: () => ({
    dialog: false,
    errorProposicion: null,
  }),
  created() {
    bus.$on("error", (error) => {
      this.errorProposicion = error
      this.dialog = true
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
