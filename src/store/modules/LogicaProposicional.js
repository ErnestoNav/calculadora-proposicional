import { Logica } from '../../LogicaProposicional'

const LogicaProposicional = {
  namespaced: true,
  state: {
    results: [],
    proposiciones: {
      tipos: {
        T: 'Tautología',
        C: 'Contradicción',
        X: 'Contingencia',
        EQ: 'Equivalentes',
        NE: 'No equivalentes'
      },
      detalle: {
        T: {
          title: 'Tautología',
          img: require('@/assets/logica-proposicional/tautologia.jpg'),
          text: 'Una proposición compuesta es tautología si todos sus valores de verdad son verdaderos, ' +
            'independientemente de los valores de verdad de las variables proposicionales que la componen.'
        },
        C: {
          title: 'Contradicción',
          img: require('@/assets/logica-proposicional/contradiccion.jpg'),
          text: 'Una proposición compuesta es una contradicción si todos sus valores de verdad son falsos, ' +
            'independientemente de los valores de verdad de las variables proposicionales que la componen.'
        },
        X: {
          title: 'Contingencia',
          img: require('@/assets/logica-proposicional/contingencia.jpg'),
          text: 'Una proposición compuesta es una contingencia cuando sus valores de verdad pueden ser verdaderos ' +
            'o falsos, dependiendo de los valores de verdad de las variables proposicionales que la componen.'
        },
        EQ:{
          title: 'Equivalentes',
          img: require('@/assets/logica-proposicional/equivalencia.jpg'),
          text: 'Dos proposiciones lógicas son equivalentes si tienen los mismos valores de verdad para todos '+
          'los posibles valores de verdad de sus componentes atómicos (proposición simple).'
        },
        NE:{
          title: 'No equivalentes',
          img: require('@/assets/logica-proposicional/no-equivalencia.jpg'),
          text: 'Se dice que dos proposiciones lógicas NO son equivalentes si tienen distintos valores de verdad para todos '+
          'los posibles valores de verdad de sus componentes atómicos (proposición simple).'
        }
      }
    },
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
    tiposProposicion: state => {
      return state.proposiciones.tipos
    },
    detallesProposicion: state => {
      return state.proposiciones.detalle
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
export { LogicaProposicional }