<template>
  <v-card
    class="resultados"
    :loading="loading"
    :disabled="loading"
    v-if="$store.getters['rel/results'].length > 0"
  >
    <v-card-title> Resultados recientes </v-card-title>
    <v-card-text>
      <v-card
        v-for="res in $store.getters['rel/results']"
        :key="res.proposicion"
        class="mb-4"
        outlined
      >
        <v-card-text class="text-center">
          <div>{{ getFormattedDate(res.date) }}</div>
          <!--<p class="subtitle text-md-h5 text--primary wide-text">{{'C={'+ res.conjunto +'}'}}</p>-->
          <p class="subtitle text-md-h5 text--primary wide-text">{{'R={'+ res.relacion +'}'}}</p>
          <p>{{ res.resultado.tipo }}</p>
          <v-btn
            color="error"
            text
            :icon="enMovil"
            absolute
            right
            top
            @click="eliminarResultado(res)"
            ><v-icon small :left="!enMovil">fa-trash-alt</v-icon
            ><span v-if="!enMovil">Eliminar</span></v-btn
          >
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th
                    v-for="(col, idcol) in res.resultado.matriz"
                    :key="col.text"
                    class="text-center wide-text"
                    :class="clasesTh(idcol, res)"
                  >
                    {{ res.variablesBase[idcol] }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, idrow) in res.resultado.matriz"
                  :key="idrow"
                  class="text-center"
                >
                <td class="wide-text variables">
                  {{ res.variablesBase[idrow] }}
                </td>
                  <td
                    v-for="(r, idr) in row"
                    :key="idr"
                    :class="clasesTd(idr, res)"
                  >
                    {{ r ? "1" : "0" }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>

import {resultados} from '../mixins/'
export default {
  name: "ResultadosRelacion",
  mixins: [resultados],
  data: () => ({
    storeModule: 'rel'
  }),
  methods: {
    clasesTh(idcol, res) {
      return {
          idcol,res
      };
    },
    clasesTd(idr, res) {
      
      return {
        idr,res  
      };
    },
  },
};
</script>
<style lang="scss">
.resultados {
  th, .variables{
    font-size: 1.07rem !important;
    background-color: rgba(#41b6eb, 0.5);
  }
  .variables{
    width: 32px;
  }
  td {
    &.equiv {
      &-true {
        background-color: rgba(#beffba, 0.1);
      }
      &-false {
        background-color: rgba(#fa2500, 0.1);
      }
    }
  }
  .wide-text {
    letter-spacing: 5px !important;
  }
}
</style>