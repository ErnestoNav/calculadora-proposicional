import { Relacion } from '../../Relaciones'

const Relaciones = {
  namespaced: true,
  state: {
    results: [],
    definicion: 'Una relación es la correspondencia entre dos conjuntos de un '
    +'primer conjunto, llamado Dominio, con un segundo conjunto, donde a cada elemento del '
    +'primer conjunto (Dominio), le corresponde al menos un elemento del segundo conjunto (Imagen o Codominio).',
    simbolos: [
      {
        descripcion: 'Par ordenado.',
        sim: '(a,b)'
      },
      {
        descripcion: 'Conjunto con los elementos a y b.',
        sim: '{a,b}'
      },
      {
        descripcion: 'Relación.',
        sim: '{(a,b),(b,a)}'
      }

    ]
  },
  getters: {
    simbolos: state => {
      return state.simbolos
    },
    definicion: state => {
      return state.definicion
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
    result({ commit }, relacion) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let rel = new Relacion(relacion)
          if (!rel.esValida()) {
            reject(rel.error)
          } else {
            //rel.matrizRelacional()
            commit('result', rel)
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
export { Relaciones }