module.exports = {
  publicPath: '/matematicas-discretas',
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Matemáticas Discretas";
        return args;
      })
  }
}