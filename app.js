//Inicializamos el turno de cada jugador
let tablero = document.getElementsByClassName("casilla")
let boton = document.getElementById('boton')

let turno = true;

let posicionX = []
let posicionO = []

let contadorX = 0
let contadorO = 0

let combinacionGanadora = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function pintarCasilla(i){
    if (turno){
        tablero[i].textContent = 'X'
        posicionX.push(i)
        posicionX.sort()
        if (posicionX.length >= 3){
            comprobarGanador(posicionX)
        }
    }else{
        tablero[i].textContent = 'O'
        posicionO.push(i)
        posicionO.sort()
        if (posicionO.length >= 3){
            comprobarGanador(posicionO)
        } 
    }

    tablero[i].removeAttribute('onclick')
    turno = !turno
}

for (let i = 0; i < tablero.length; i ++){
    tablero[i].setAttribute('onclick', `pintarCasilla(${i})`)
}

function comprobarGanador(posicion){
    for(let i  = 0; i < combinacionGanadora.length; i++){
        let contador = 0
        for(let j  = 0; j < posicion.length; j++){
            if (combinacionGanadora[i].includes(posicion[j])){
                contador++
            }
        }
        if(contador == 3){
            if (turno){
                document.getElementById('mensaje').classList.add('visible')
                document.getElementById('mensaje').innerHTML = 'JUGADOR X HAS GANADO'
                for (let i = 0; i < tablero.length; i ++){
                    tablero[i].removeAttribute('onclick')
                }
                contadorX++
                añadirPuntuacion()
            }else if (!turno){
                for (let i = 0; i < tablero.length; i ++){
                    document.getElementById('mensaje').classList.add('visible')
                    document.getElementById('mensaje').innerHTML = 'JUGADOR O HAS GANADO'
                    tablero[i].removeAttribute('onclick')
                }
                contadorO++
                añadirPuntuacion()
            }

            for (let k = 0; k < combinacionGanadora[i].length; k++){
                tablero[combinacionGanadora[i][k]].style.backgroundColor = 'green'
            }
        }
    }
}

function volverAJugar(){
    for (let i = 0; i < tablero.length; i++) {
        document.getElementById('mensaje').innerHTML = ''
        tablero[i].innerText = ""
        tablero[i].style.backgroundColor = '#eff2f9'
    }

    posicionX = []
    posicionO = []
    turno = true

    for (let i = 0; i < tablero.length; i ++){
        tablero[i].setAttribute('onclick', `pintarCasilla(${i})`)
    }

}

function añadirPuntuacion(){
    let contadorJugador1 = document.getElementById('jugador1')
    let contadorJugador2 = document.getElementById('jugador2')

    contadorJugador1.textContent = contadorX
    contadorJugador2.textContent = contadorO
}

boton.addEventListener('click', volverAJugar)

