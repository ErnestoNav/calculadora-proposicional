<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9" class="text-center">
        <v-card light class="text-center">
          <v-card-title class="text-center">
            <v-img
              contain
              position="center"
              src="@/assets/header.jpg"
              width="900px"
              max-width="100%"
              max-height="100px"
              class="header"
            ></v-img>
          </v-card-title>
          <v-card-text class="text-left secondary--text"> 
            <h1 class=" text-center text-subtitle-1 text-sm-h5 font-weight-bold mb-2">Tecnológico Nacional de México</h1>
            <p>
              Proyecto desarrollado por alumnos de la <b>Maestría en Sistemas Computacionales</b>  
              del <b>Instituto Tecnológico de Acapulco</b>
              El cual tiene como finalidad reforzar los conocimientos adquiridos en la materia de <b>Matemáticas Discretas</b>.
            </p>
            <p>
              <b>Alumnos:</b>
              <ul>
                <li>Ing. Héctor García Montalvo</li>
                <li>Ing. Jorge Ernesto Navarrete Alejo</li>
                <li>Ing. José Rafael Plancarte Oliva</li>
              </ul>
            </p>
            <v-btn :absolute="mobile" :block="!mobile" right bottom outlined color="black white--text" href="https://github.com/ErnestoNav/matematicas-discretas" target="_blank">
            <v-icon left>fab fa-github</v-icon>Github
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Proyecto",
  computed:{
    mobile(){
      return this.$vuetify.breakpoint.smAndUp
    }
  }
};
</script>
<style>
.header {
  margin: 0 auto;
}
</style>
