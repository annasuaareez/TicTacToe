//Inicializamos el turno de cada jugador
let turno = true;

let tablero = document.getElementsByClassName("casilla")

let posicionX = []
let posicionO = []

let combinacionGanadora = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < tablero.length; i ++){
    tablero[i].setAttribute('onclick', `pintarCasilla(${i})`)
}

function pintarCasilla(i){
    if (turno){
        tablero[i].textContent = 'X'
        posicionX.push(i)
        posicionX.sort()
        if (posicionX.length >= 3){
            comprobarGanador(posicionX)
        } 
        //comprobarGanador(posicionX)
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
                detenerJuego()
                alert('ha ganado X')
                //crear una funcion que alerte quien ha ganado con la opcion de volver a jugar
            }else if (!turno){
                alert('ha ganado O')
            }else{
                alert('has empatado')
            }

            for (let k = 0; k < combinacionGanadora[i].length; k++){
                tablero[combinacionGanadora[i][k]].style.backgroundColor = 'green'
            }
        }
    }
}

function detenerJuego(){

}