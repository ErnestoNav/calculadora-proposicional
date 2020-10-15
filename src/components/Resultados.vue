<template>
  <v-card
    class="resultados"
    :loading="loading"
    :disabled="loading"
    v-if="$store.getters['results'].length > 0"
  >
    <v-card-title> Resultados recientes </v-card-title>
    <v-card-text>
      <!--<v-card
        v-for="(result, idres) in $store.getters['results']"
        :key="'result-' + idres"
        class="mb-4"
        outlined
      >
        <v-card-text class="text-center">
          <div>{{ getFormattedDate(result.res[0].date) }}</div>
          <p class="display-1 text--primary wide-text">{{ getProposicion(result) }}</p>
          <p>{{ getTipo(result) }}</p>
          <v-btn
            color="error"
            text
            :icon="enMovil"
            absolute
            right
            top
            @click="eliminarResultado(result)"
            ><v-icon small :left="!enMovil">fa-trash-alt</v-icon
            ><span v-if="!enMovil">Eliminar</span></v-btn
          >
          <v-simple-table dense v-for="(res,idr) in result.res" :key="'res-'+idr" :class="result.res.length > 1 ? 'mb-8': ''">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="col in res.resultado.columnas"
                    :key="col.text"
                    class="text-center wide-text"
                  >
                    {{ col.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, idrow) in res.resultado.filas"
                  :key="idrow"
                  class="text-center"
                >
                  <td v-for="(r, idr) in row" :key="idr">
                    {{ r ? "V" : "F" }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>-->
      <v-card
        v-for="res in $store.getters['results']"
        :key="res.proposicion"
        class="mb-4"
        outlined
      >
        <v-card-text class="text-center">
          <div>{{ getFormattedDate(res.date) }}</div>
          <p class="headline text--primary wide-text">{{ res.proposicion }}</p>
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
                  <th
                    v-for="(col, idcol) in res.resultado.columnas"
                    :key="col.text"
                    class="text-center wide-text"
                    :class="clasesTh(idcol, res)"
                  >
                    {{ col.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, idrow) in res.resultado.filas"
                  :key="idrow"
                  class="text-center"
                >
                  <td
                    v-for="(r, idr) in row"
                    :key="idr"
                    :class="clasesTd(idr, res)"
                  >
                    {{ r ? "V" : "F" }}
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
import bus from "@/bus";
export default {
  name: "Resultados",

  data: () => ({
    loading: false,
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
  }),
  computed: {
    enMovil() {
      return this.$vuetify.breakpoint.name == "xs";
    },
  },
  methods: {
    getFormattedDate(date) {
      let horas =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutos =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

      return `${date.getDate()}/${this.months[date.getMonth()].substring(
        0,
        3
      )}/${date.getFullYear()} - ${horas}:${minutos} hrs.`;
    },
    getProposicion(result) {
      if (result.res.length > 1) {
        return result.res[0].proposicion + "≡" + result.res[1].proposicion;
      } else {
        return result.res[0].proposicion;
      }
    },
    getTipo(result) {
      /*let tipo = ''
      if(result.res.length > 1){
        tipo = 'Equivalentes'
        let propo1 = result.res[0].proposicion
        let propo2 = result.res[1].proposicion
        
        let res1 = result.res[0].resultado.filas.map((el) => {
          return el[propo1]
        })
        let res2 = result.res[1].resultado.filas.map((el) => {
          return el[propo2]
        }) 
        for(let i = 0; i < res1.length; i++){
          if(res1[i] !== res2[i]){
            tipo = 'No equivalentes'
          }
        }
        return tipo
      }else{
        tipo = result.res[0].resultado.tipo
      }*/
      return result.tipo;
    },
    eliminarResultado(res) {
      this.loading = true;
      this.$store
        .dispatch("eliminarResultado", res)
        .then(() => {
          this.$vuetify.goTo(440, {
            duration: 400,
            offset: 0,
            easing: "easeInOutCubic",
          });
        })
        .catch((e) => {
          bus.$emit("error", e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    clasesTh(idcol, res) {
      /*let equiv = false;
      if (res.proposicion.includes("≡")) {
        let prop = res.proposicion.split("≡");
        equiv = prop.includes(res.resultado.columnas[idcol].text);
      }*/
      return {
        "d-none":
          idcol == res.resultado.columnas.length - 1 &&
          res.proposicion.includes("≡")
      };
    },
    clasesTd(idr, res) {
      let equiv = false;
      if (res.proposicion.includes("≡")) {
        let prop = res.proposicion.split("≡");
        equiv = prop.includes(idr);
      }
      return {
        "d-none": idr == res.proposicion && res.proposicion.includes("≡"),
        equiv: equiv,
        "equiv-true":
          equiv && res.tipo == "equivalencia" && res.resultado.tipo == "Equivalentes",
        "equiv-false":
          equiv && res.tipo == "equivalencia" && res.resultado.tipo == "No equivalentes",
      };
    },
  },
};
</script>
<style lang="scss">
.resultados {
  th {
    font-size: 1.07rem !important;
    background-color:rgba(#41b6eb,.5);
  }
  td {
    &.equiv {
      &-true {
        background-color:rgba(#beffba,.1);
      }
      &-false {
        background-color:rgba(#fa2500,.1);
      }
    }
  }
  .wide-text {
    letter-spacing: 5px !important;
  }
}
</style>