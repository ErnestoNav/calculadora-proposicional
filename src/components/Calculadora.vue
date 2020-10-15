<template>
  <v-card class="calculadora" :loading="loading" :disabled="loading">
    <v-card-title>
      <v-text-field
        class="proposicion"
        v-model="proposicion"
        readonly
        solo
        outlined
        hide-details
        label="Ejemplo: p ∨ q"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('p')"
            >p</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('q')"
            >q</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('r')"
            >r</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('s')"
            >s</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('t')"
            >t</v-btn
          ></v-col
        >
      </v-row>
      <v-row dense>
        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement('~')"
            >~</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement('∧')"
            >∧</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement('∨')"
            >∨</v-btn
          ></v-col
        >

        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement('(')"
            >(</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement(')')"
            >)</v-btn
          ></v-col
        >
      </v-row>
      <v-row dense>
        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement('→')"
            >→</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement('↔')"
            >↔</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement('⨁')"
            >⨁</v-btn
          ></v-col
        >
        <v-col
          ><v-btn
            color="error--text"
            block
            @click="deleteLast"
            :disabled="proposicionVacia"
          >
            <v-icon small>fa-backspace</v-icon></v-btn
          ></v-col
        >
        <v-col
          ><v-btn
            color="error--text"
            block
            @click="allClear"
            :disabled="proposicionVacia"
          >
            <v-icon small>fa-trash</v-icon></v-btn
          ></v-col
        >
      </v-row>
      <v-row dense>
        <v-col class="equivalencia">
          <v-btn
            class="text-none"
            color="pink--text text--lighten-3"
            block
             @click="addElement('≡')"
            :disabled="proposicionVacia || proposicion.includes('≡')"
          >
            ≡
          </v-btn>
        </v-col>
        <v-col class="resultado">
          <v-btn
            class="text-none"
            color="success--text"
            block
            @click="evaluar"
            :disabled="proposicionVacia"
          >
            <v-icon small>fa-equals</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import bus from "@/bus";
export default {
  name: "Calculadora",

  data: () => ({
    proposicion: "",
    loading: false,
  }),
  computed: {
    proposicionVacia() {
      return this.proposicion.length == 0;
    },
  },
  methods: {
    addElement(v) {
      this.proposicion += v;
    },
    deleteLast() {
      this.proposicion = this.proposicion.slice(0, -1);
    },
    allClear() {
      this.proposicion = "";
    },
    evaluar() {
      this.loading = true;
      this.$store
        .dispatch("result", this.proposicion)
        .then(()=>{
          this.$vuetify.goTo(440, {duration: 400,offset: 0,easing: 'easeInOutCubic'})
          this.allClear()
        }).catch((e) => {
          bus.$emit("error", e);
        })
        .finally(() =>{
          this.loading = false
        })
    },
  },
};
</script>
<style lang="scss">
.calculadora {
  max-width: 700px;
  margin: 0 auto;
  .proposicion {
    input {
      letter-spacing: 6px !important;
    }
  }
  .equivalencia{
    flex-grow: 2;
  }
  .resultado{
    flex-grow: 3;
  }
}
</style>