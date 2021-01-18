import { Relacion } from '../../Relaciones'

const Relaciones = {
  namespaced: true,
  state: {
    results: [],
    relaciones: {
      tipos: {
        eq: 'de Equivalencia',
        tra: 'Transitiva',
        sim: 'Simétrica',
        ref: 'Reflexiva'
      },
      detalle: {
        eq: {
          title: 'Relación de Equivalencia',
          img: '',
          text: 'Una relación es de Equivalencia si es Transitiva, Simétrica y Reflexiva.'
        },
        tra: {
          title: 'Relación Transitiva',
          img: require('@/assets/relaciones/transitiva.jpg'),
          text: 'Dado el conjunto A y una relación R, se dice que ésta es Transitiva si se cumple: siempre que ' +
            'un elemento se relaciona con otro y este último con un tercero, entonces el primero se relaciona con el tercero. Es decir, si (a,b) y (b,c), entonces (a,c).'
        },
        sim: {
          title: 'Relación Simétrica',
          img: require('@/assets/relaciones/simetrica.jpg'),
          text: 'Una relación R sobre un conjunto A, es Simétrica cuando se da que si un elemento está relacionado ' +
            'con otro, entonces ese otro también está relacionado con él. Por ejemplo, es lo mismo tener (a,b) que tener (b,a).'
        },
        ref: {
          title: 'Relación Reflexiva',
          img: require('@/assets/relaciones/reflexiva.jpg'),
          text: 'La relación Reflexiva, también conocida como refleja, es una relación R sobre un conjunto A, de manera que todo elemento de A ' +
            'está relacionado consigo mismo, es decir: (a,a).'
        }
      }
    },
    definicion: 'Una relación es la correspondencia entre dos conjuntos de un '
      + 'primer conjunto, llamado Dominio, con un segundo conjunto, donde a cada elemento del '
      + 'primer conjunto (Dominio), le corresponde al menos un elemento del segundo conjunto (Imagen o Codominio).',
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
    tiposRelacion: state => {
      return state.relaciones.tipos
    },
    detallesRelacion: state => {
      return state.relaciones.detalle
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