<template>
  <v-card
    class="resultados"
    :loading="loading"
    :disabled="loading"
    v-if="$store.getters['results'].length > 0"
  >
    <v-card-title> Resultados recientes </v-card-title>
    <v-card-text>
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
      return {
        "d-none":
          idcol == res.resultado.columnas.length - 1 &&
          res.proposicion.includes("≡"),
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
          equiv &&
          res.tipo == "equivalencia" &&
          res.resultado.tipo == "Equivalentes",
        "equiv-false":
          equiv &&
          res.tipo == "equivalencia" &&
          res.resultado.tipo == "No equivalentes",
      };
    },
  },
};
</script>
<style lang="scss">
.resultados {
  th {
    font-size: 1.07rem !important;
    background-color: rgba(#41b6eb, 0.5);
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