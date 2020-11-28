import Vue from 'vue'
import Vuex from 'vuex'

import { LogicaProposicional } from './modules/LogicaProposicional'
import { Relaciones } from './modules/Relaciones'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    log: LogicaProposicional,
    rel: Relaciones
  }
})
