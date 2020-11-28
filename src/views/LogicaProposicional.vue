<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <CalculadoraLogica />
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
                  v-for="item in $store.getters['log/conectores']"
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
        <ResultadosLogica/>
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
        >{{ errorMsg }}</v-alert
      >
    </v-dialog>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CalculadoraLogica from "@/components/CalculadoraLogica";
import ResultadosLogica from "@/components/ResultadosLogica";
import {view} from '@/mixins/';
export default {
  name: "LogicaProposicional",
  mixins: [view],
  components: {
    CalculadoraLogica, ResultadosLogica
  }
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
