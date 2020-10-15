module.exports = {
  publicPath: '/calculadora-logica-proposicional',
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Calculadora de Lógica Proposicional | Matemáticas Discretas";
        return args;
      })
  }
}