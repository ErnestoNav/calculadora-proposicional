<template>
  <v-card class="calculadora" :loading="loading" :disabled="loading">
    <v-card-title>
      <v-text-field
        class="relacion"
        v-model="input"
        readonly
        solo
        outlined
        hide-details
        label="Ejemplo: ( a , b ) , ( b , a )"
        prefix="R = {"
        suffix="}"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('a')"
            >a</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('b')"
            >b</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('c')"
            >c</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('d')"
            >d</v-btn
          ></v-col
        >
        <v-col
          ><v-btn class="text-none yellow--text" block @click="addElement('e')"
            >e</v-btn
          ></v-col
        >
      </v-row>
      <v-row dense>
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
        <v-col
          ><v-btn class="text-none primary--text" block @click="addElement(',')"
            >,</v-btn
          ></v-col
        >
        <v-col
          ><v-btn
            color="error--text"
            block
            @click="deleteLast"
            :disabled="inputVacia"
          >
            <v-icon small>fa-backspace</v-icon></v-btn
          ></v-col
        >
        <v-col
          ><v-btn
            color="error--text"
            block
            @click="allClear"
            :disabled="inputVacia"
          >
            <v-icon small>fa-trash</v-icon></v-btn
          ></v-col
        >
      </v-row>
      <v-row dense>
        <v-col class="resultado">
          <v-btn
            class="text-none"
            color="success--text"
            block
            @click="evaluar"
            :disabled="inputVacia"
          >
            <v-icon small>fa-equals</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {calculadora} from '../mixins/'
export default {
  name: "CalculadoraRelaciones",
  mixins: [calculadora],
  data: () => ({
    storeModule: 'rel'
  })
};
</script>
<style lang="scss">
.calculadora {
  max-width: 700px;
  margin: 0 auto;
  .relacion {
    input {
      letter-spacing: 6px !important;
    }
  }
}
</style>