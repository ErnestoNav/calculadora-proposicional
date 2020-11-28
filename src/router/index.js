import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import LogicaProposicional from '../views/LogicaProposicional.vue'
//import FormasNormales from '../views/FormasNormales.vue'
import Relaciones from '../views/Relaciones.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { icon: 'fa fa-home' }
  },
  {
    path: '/logica-proposicional',
    name: 'Logica',
    component: LogicaProposicional,
    meta: { title: 'Lógica Proposicional', icon: 'fa fa-brain' }
  },
  /*{
    path: '/formas-normales',
    name: 'FormNorm',
    component: FormasNormales,
    meta: { title: 'Formas Normales', icon: 'fa fa-draw-polygon' }
  },*/
  {
    path: '/relaciones',
    name: 'Relaciones',
    component: Relaciones,
    meta: { title: 'Relaciones', icon: 'fa fa-project-diagram' }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
