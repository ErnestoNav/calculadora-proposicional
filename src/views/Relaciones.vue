<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <CalculadoraRelaciones />
      </v-col>
      <v-col>
        <v-card>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Descripción</th>
                  <th class="text-center">Simbología</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in $store.getters['rel/simbolos']"
                  :key="item.descripcion"
                >
                  <td>{{ item.descripcion }}</td>
                  <td class="text-center simbologia">{{ item.sim }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-text>
            {{$store.getters['rel/definicion']}}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols=12>
        <ResultadosRelacion/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CalculadoraRelaciones from "@/components/CalculadoraRelaciones";
import ResultadosRelacion from "@/components/ResultadosRelacion";

export default {
  name: "LogicaProposicional",
  components: {
    CalculadoraRelaciones, ResultadosRelacion
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
.simbologia{
  letter-spacing: 3px !important;
  min-width: 140px !important;
}
</style>
