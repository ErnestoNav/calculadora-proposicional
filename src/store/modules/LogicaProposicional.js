import { Logica } from '../../LogicaProposicional'

const LogicaProposicional = {
  namespaced:true,
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
}
export {LogicaProposicional}