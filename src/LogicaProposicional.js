class Logica {
  constructor(p) {
    this.precedencias = ["≡","⨁", "↔", "→", "∨", "∧", "~"]
    this.variablesBase = ["p", "q", "r", "s", "t"]
    this.variables = []
    this.proposicion = p
    this.error = null
    this.postfix = null
    this.date = new Date()
    this.tipo = (p.includes('≡')) ? 'equivalencia' : 'proposicion'
    this.resultado = null
  }
  esValida() {
    let simbolos = this.separar(this.proposicion);
    let apertura = 0
    let cierre = 0
    let sim = null
    let ant = null
    let sig = null
    let esOperador = false
    let eraOperador = false

    if (simbolos.length === 0) {
      this.error = 'Expresión vacía'
    }

    for (let i = 0; i < simbolos.length; ++i) {
      sim = simbolos[i]
      sig = simbolos[i + 1] === undefined ? '' : simbolos[i + 1]
      ant = simbolos[i - 1] === undefined ? '' : simbolos[i - 1]
      esOperador = this.precedencias.includes(sim)
      if (this.variablesBase.includes(sim) && this.variablesBase.includes(sig)) {
        this.error = "Proposición sobrante"
      }
      if (sim === '(') {
        apertura += 1
        if (sig === ')') {
          this.error = 'Paréntesis vacios'
        }
      } else if (sim === ')') {
        cierre += 1
      } else if (esOperador && eraOperador && sim !== '~') {
        this.error = 'Doble operador.'
      } else if (esOperador && sim !== '~') {
        if ((ant !== ')' && !this.variablesBase.includes(ant)) || (sig !== '(' && sig !== '~' && !this.variablesBase.includes(sig))) {
          this.error = 'Proposición faltante'
        }
      } else if (sim === '~') {
        if (!this.variablesBase.includes(sig) && sig !== '(' && sig !== '~') {
          this.error = 'Proposición faltante'
        }
      }
      eraOperador = esOperador
    }

    if (apertura !== cierre) {
      this.error = 'Revisar paréntesis'
    } else if (simbolos.length === (apertura + cierre)) {
      this.error = 'Expresión vacía'
    }
    return (!this.error) ? true : false

  }
  infixToPostfix() {
    let infix = this.separar(this.proposicion);

    var stackOperadores = [],
      postfix = []

    for (let token of infix) {
      // Paso 1: Si se trata de una variable, la agregamos al postfix
      if (this.variablesBase.includes(token)) {
        postfix.push(token)
        continue
      }
      let ultimoDelStack = stackOperadores[stackOperadores.length - 1]
      // Paso 2: En caso que no tenga operadores en el stack o el último agregado sea un "(", agregamos el actual. 
      if (!stackOperadores.length || ultimoDelStack == "(") {
        stackOperadores.push(token)
        continue
      }
      // Paso 3: Se agrega el token actual en caso de que sea un "("
      if (token == "(") {
        stackOperadores.push(token)
        continue
      }
      // Paso 4: Revisamos si el token es un ")"
      if (token == ")") {
        // Mientras tenga elementos en el stack de operadores se realiza lo siguiente:
        while (stackOperadores.length) {
          //Eliminamos el último elemento agregado
          let op = stackOperadores.pop()
          // nos detenemos si nos encontramos con un "("
          if (op == "(") break
          postfix.push(op)
        }
        continue;
      }
      // Paso 5: Se reordena el stack de acuerdo a su precedencia.
      let precedenciaAnt = this.precedencias.indexOf(ultimoDelStack),
        precedenciaAct = this.precedencias.indexOf(token)
      while (precedenciaAct < precedenciaAnt) {
        let op = stackOperadores.pop()
        postfix.push(op)
        precedenciaAnt = this.precedencias.indexOf(stackOperadores[stackOperadores.length - 1])
      }
      stackOperadores.push(token);
    }
    // Paso 6: Mientras queden elementos en el stack, los agregamos al postfix
    while (stackOperadores.length) {
      let op = stackOperadores.pop()
      // Se ignoran en caso de ser uno de éstos
      if (op == "(" || op == ")") break
      postfix.push(op)
    }
    this.postfix = postfix
  }
  separar(exp) {
    return exp
      .replace(/\s/g, "")
      .split("")
  }
  evaluarProposicion(izq, operador, der) {
    let res = false
    switch (operador) {
      case '⨁':
        res = (izq != der)
        break;
      case '↔':
      case '≡':
        res = (izq == der)
        break;
      case '→':
        res = !(izq && !der)
        break;
      case '∨':
        res = (izq || der)
        break;
      case '∧':
        res = (izq && der)
        break;
      case '~':
        res = !der
        break;
    }
    return res
  }
  existeEnArreglo(arr,obj){
    let existe = false
    arr.forEach(el =>{
      if(el.text == obj.text){
        existe = true
      }
    })
    return existe
  }
  tablaDeVerdad() {
    this.infixToPostfix()
    let variables = []
    let ultimoIndex = 0
    let stack = []
    let cols = []
    let rows = []
    let filas = null
    this.variablesBase.forEach(val => {
      if (this.postfix.includes(val)) {
        variables.push(val)
        cols.push({ text: val, func: null })
      }
    })
    this.variables = variables
    filas = Math.pow(2, variables.length)
    ultimoIndex = variables.length - 1
    this.postfix.forEach((val) => {
      let pop1 = ''
      let pop2 = ''
      if (variables.includes(val)) {
        stack.push(val)
        //stack.push({text:val,func:val})
      } else {
        if (val == '~') {
          if (stack.length > 0) {
            pop1 = stack.pop()
          }
        } else {
          pop1 = stack.pop()
          pop2 = stack.pop()
        }
        let prop = pop2 + val + pop1
        if (this.proposicion.includes('(' + prop + ')')) {
          stack.push('(' + prop + ')')
          let col = { text: '(' + prop + ')', func: { izq: pop2, operador: val, der: pop1 } }
          if(!this.existeEnArreglo(cols,col)){
            cols.push(col)
          }
          
        } else {
          stack.push(prop)
          let col = { text: prop, func: { izq: pop2, operador: val, der: pop1 } }
          if(!this.existeEnArreglo(cols,col)){
            cols.push(col)
          }
        }
      }
    })
    for (let r = 0; r < filas; r++) {
      //
      let row = {}
      for (let c = 0; c < cols.length; c++) {
        // Se obtiene el llenado de las tablas de verdad con base en la cantidad de proposiciones simples
        if (variables.includes(cols[c].text)) {
          let pares = Math.pow(2, ultimoIndex - c)
          let trueFalse = parseInt(r / pares)
          row[cols[c].text] = trueFalse % 2 === 0
        } else {
          // En caso de ser composición compuesta, se considera lo siguiente
          let izq = row[cols[c].func.izq] !== undefined ? row[cols[c].func.izq] : ''
          let operador = cols[c].func.operador
          let der = row[cols[c].func.der]

          row[cols[c].text] = this.evaluarProposicion(izq, operador, der)
        }

      }
      rows.push(row)
    }
    let falacias = 0
    let verdades = 0

    for(let i = 0; i < rows.length; i++){
      rows[i][this.proposicion] ? verdades++ : falacias++
    }
    let tipo = ''
    if(falacias == 0){
      tipo = 'T'
    }else if(verdades == 0){
      tipo = 'C'
    }else{
      tipo = 'X'
    }
    if(this.proposicion.includes('≡')){
      tipo = (tipo == 'T') ? 'EQ' : 'NE'
    }
    this.resultado = { columnas: cols, filas: rows, tipo }
  }
}

export { Logica }