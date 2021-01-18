class Relacion {
  constructor(r) {
    this.variablesBase = ["a", "b", "c", "d", "e"]
    this.conjunto = []
    this.relacion = r
    this.error = null
    this.date = new Date()
    this.resultado = null
  }
  esValida() {
    let res = /(\([a-e],[a-e]\))(,\([a-e],[a-e]\))*$/.test(this.relacion)
    if (!res) {
      this.error = 'Relación incorrecta.'
    } else {
      this.matrizRelacional()
    }
    return res
  }
  matrizRelacional() {
    this.conjunto = this.obtenerConjunto(this.relacion)
    let matriz = []
    for (let i = 0; i < this.conjunto.length; i++) {
      matriz[i] = []
      for (let j = 0; j < this.conjunto.length; j++) {
        matriz[i][j] = (this.relacion.includes(this.conjunto[i] + ',' + this.conjunto[j]))
      }
    }
    this.resultado = { matriz }
    this.resultado.tipo = this.obtenerTipo()
  }
  isReflexiva() {
    for (let i = 0; i < this.resultado.matriz.length; i++) {
      for (let j = 0; j < this.resultado.matriz.length; j++) {
        //Se verifica que exista relación con el mismo término
        if (i === j && !this.resultado.matriz[i][j]) {
          return false
        }
      }
    }
    return true
  }
  isSimetrica() {
    for (let i = 0; i < this.resultado.matriz.length; i++) {
      for (let j = 0; j < this.resultado.matriz.length; j++) {
        // Se verifica que no se trate de una reflexión sino de términos diferentes y se comprueba con su opuesto
        if (i !== j && this.resultado.matriz[i][j] && !this.resultado.matriz[j][i]) {
          return false
        }
      }
    }
    return true
  }
  isTransitiva() {
    let cumple = false
    let usados = []
    for (let i = 0; i < this.resultado.matriz.length; i++) {
      for (let j = 0; j < this.resultado.matriz.length; j++) {
        // Si se encuentra un resultado se buscan las coincidencias con el segundo término
        if (this.resultado.matriz[i][j]) {
          cumple = false
          for (let k = 0; k < this.resultado.matriz.length; k++) {
            // Si existe un (j,k) y un (i,k) se infiere que es transitiva, por lo que se pasa a la siguiente
            if(this.resultado.matriz[j][k] && this.resultado.matriz[i][k]){
              cumple = true
              usados.push(this.resultado.matriz[i][j],)
            }
          }
          // Para evitar un falso positivo de incumplimiento, se verifica si el par ordenado ya fue usado
          if(!cumple && !usados.includes(this.resultado.matriz[i][j])){
            return false
          }
        }
      }
    }
    return true
  }
  isEquivalencia() {
    return this.isReflexiva() && this.isSimetrica() && this.isTransitiva()
  }
  obtenerTipo() {
    let tipos = []
    if (this.isEquivalencia()) {
      return ['eq']
    } else if (!this.isReflexiva() && !this.isSimetrica() && !this.isTransitiva()) {
      return []
    }
    this.isReflexiva() ? tipos.push('ref') : null
    this.isSimetrica() ? tipos.push('sim') : null
    this.isTransitiva() ? tipos.push('tra') : null

    /*for (let i = 0; i < tipos.length; i++) {
      tipo += (i === 0) ? tipos[i] : ' y ' + tipos[i]
    }*/

    return tipos
  }
  obtenerConjunto(rel) {
    let relArray = rel.split('')
    let conjunto = []
    for (let i = 0; i <= relArray.length; i++) {
      this.variablesBase.includes(relArray[i]) && !conjunto.includes(relArray[i]) ? conjunto.push(relArray[i]) : null
    }
    conjunto.sort()
    return conjunto
  }
}

export { Relacion }