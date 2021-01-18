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
      <v-col cols="12">
        <ResultadosLogica />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CalculadoraLogica from "@/components/CalculadoraLogica";
import ResultadosLogica from "@/components/ResultadosLogica";
export default {
  name: "LogicaProposicional",
  components: {
    CalculadoraLogica,
    ResultadosLogica,
  },
};
</script>
