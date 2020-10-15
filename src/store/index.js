import Vue from 'vue'
import Vuex from 'vuex'
import { Logica } from '../LogicaProposicional'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    results: [],
    conectores: [
      {
        tipo: 'Negación',
        sim: '~'
      },
      {
        tipo: 'Conjunción',
        sim: '∧'
      },
      {
        tipo: 'Disyunción',
        sim: '∨'
      },
      {
        tipo: 'Implicación',
        sim: '→'
      },
      {
        tipo: 'Doble implicación',
        sim: '↔'
      },
      {
        tipo: 'Disyunción exclusiva',
        sim: '⨁'
      },
      {
        tipo: 'Equivalencia',
        sim: '≡'
      }
    ]
  },
  getters: {
    conectores: state => {
      return state.conectores
    },
    results: state => {
      return state.results
    }
  },
  mutations: {
    result(state, val) {
      state.results.unshift(val)
    },
    eliminarResultado(state, val) {
      state.results = state.results.filter(el => {
        return el != val
      })
    }
  },
  actions: {
    result({ commit }, proposicion) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          /*let tipo = 'proposicion'
          proposicion = proposicion.split("≡")
          if (proposicion.length > 1) {
            tipo = 'equivalencia'
          }
          let propo = undefined
          let res = []
          for (let i = 0; i < proposicion.length; i++) {
            propo = new Logica(proposicion[i])
            if (!propo.esValida()) {
              reject(propo.error)
            }
            propo.tablaDeVerdad()
            res.push(propo)
          }
          commit('result', { tipo, res })*/
          let propo = new Logica(proposicion)
          if (!propo.esValida()) {
            reject(propo.error)
          } else {
            propo.tablaDeVerdad()
            commit('result', propo)
            resolve()
          }
        }, 1000)

      })
    },
    eliminarResultado({ commit }, res) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('eliminarResultado', res)
          resolve()
        }, 1000)
      })
    }
  }
})
