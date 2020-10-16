import Vue from 'vue'
import VueAnalytics from "vue-analytics";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
//-- Initialize Google Analytics tracking.
Vue.use(VueAnalytics, {
  id: process.env.GA_TRACKING_ID,
  router
});
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
