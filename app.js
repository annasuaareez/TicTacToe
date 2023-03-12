//Inicializamos el turno de cada jugador
let tablero = document.getElementsByClassName('casilla')
let boton = document.getElementById('boton')

let turno = true;

let posicionX = []
let posicionO = []

let contadorX = 0
let contadorO = 0

let tiempo = 15
let segundos = document.getElementById('segundos')

let combinacionGanadora = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*
En la funcion pintar casilla inicializamos el tiempo que tiena cada jugados 
Analizamos que si en una fila los 3 huecos estan pintados son del mismo jugador
Y pasamos a la funcion de comprobar ganador
*/
function pintarCasilla(i){
    if (turno){
        tiempo = 15
        segundos.textContent = tiempo

        document.getElementById('turnoJugador').classList.add('visible')
        document.getElementById('turnoJugador').innerHTML = 'Jugador O'

        tablero[i].textContent = 'X'
        posicionX.push(i)
        posicionX.sort()

        if (posicionX.length >= 3){
            comprobarGanador(posicionX)
        }
    }else{
        tiempo = 15
        segundos.textContent = tiempo

        document.getElementById('turnoJugador').classList.add('visible')
        document.getElementById('turnoJugador').innerHTML = 'Jugador X'

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

/*añadimos el evento de onclick el cual al pulsar y soltar se pinta la casilla seleccionada*/
for (let i = 0; i < tablero.length; i ++){
    document.getElementById('turnoJugador').innerHTML = 'Jugador X'
    tablero[i].setAttribute('onclick', `pintarCasilla(${i})`)
}

/*
La funcion comprobar ganador como su nombre indica comprueba el ganador
Analizamos las casillas de las filas con las posibles combinaciones 
Si coinficen el contador aumenta y si llega hasta 3 analizamos si esta jugando las X o las O
Cuando gana un jugador se le proporciona un mensaje de enhorabuena asi como hacemos que no se pueda seguir clickando
A su vez paramos en tiempo y la puntuacion del jugador ganador aumenta
*/
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
                //clearInterval para que se pare el tiempo
                clearInterval(temporizador)
                contadorX++
                añadirPuntuacion()
            }else if (!turno){
                document.getElementById('mensaje').classList.add('visible')
                document.getElementById('mensaje').innerHTML = 'JUGADOR O HAS GANADO'
                for (let i = 0; i < tablero.length; i ++){
                    tablero[i].removeAttribute('onclick')
                }
                clearInterval(temporizador)
                contadorO++
                añadirPuntuacion()
            }

            //La combinacion ganadora se pintara de verde
            for (let k = 0; k < combinacionGanadora[i].length; k++){
                tablero[combinacionGanadora[i][k]].style.backgroundColor = 'green'
            }
        }
    }
}

/*
La funcion de volverAJugar hace su funcion en el boton para que los usuarios puedan repetir la partida
En esta funcion hacemos desaparecer el mensaje de enhorabuena, asi como las casillas
Reseteamos las posiciones y el turno del jugador, así como el tiempo
Y volvemos a imprimir la ejecucion que nos permite poner las fichas
*/
function volverAJugar(){
    for (let i = 0; i < tablero.length; i++) {
        document.getElementById('mensaje').innerHTML = ''
        tablero[i].innerText = ""
        tablero[i].style.backgroundColor = '#eff2f9'
    }

    posicionX = []
    posicionO = []
    turno = true

    tiempo = 15
    segundos.textContent = tiempo
    temporizador = setInterval(cuentaAtras, 1000)

    document.getElementById('turnoJugador').innerHTML = 'Jugador X'
    for (let i = 0; i < tablero.length; i ++){
        tablero[i].setAttribute('onclick', `pintarCasilla(${i})`)
    }

}

boton.addEventListener('click', volverAJugar)

/*
En esta fucnion se actualizan los contadores en funcion de si el jugador a ganado o no
*/
function añadirPuntuacion(){
    let contadorJugador1 = document.getElementById('jugador1')
    let contadorJugador2 = document.getElementById('jugador2')

    contadorJugador1.textContent = contadorX
    contadorJugador2.textContent = contadorO
}

//inicializamos el tiempo 
segundos.textContent = tiempo

/*
El tiempo empieza en 30 segundos y retrodece 1 segundo hasta llegar al -1, en donde se vuelve a iniciar el temporizador a 30
*/
function cuentaAtras(){
    tiempo = --tiempo <= -1 ? 15 : tiempo

    //Imprimimos el valor de los segundos que quedan
    segundos.textContent = tiempo

    //en el momento de que el tiempo llegue a 0 avisamos al jugador que le toca que ha perdido su turno
    if (tiempo == 0){
        document.getElementById('mensaje').innerHTML = 'HAS PERDIDO EL TURNO'
        
        turno = !turno 

        if (document.getElementById('turnoJugador').innerHTML = 'Jugador X'){
            document.getElementById('turnoJugador').classList.add('visible')
            document.getElementById('turnoJugador').innerHTML = 'Jugador O'
        }else if (document.getElementById('turnoJugador').innerHTML = 'Jugador O'){
            document.getElementById('turnoJugador').classList.add('visible')
            document.getElementById('turnoJugador').innerHTML = 'Jugador X'
        }

    }else{
        document.getElementById('mensaje').innerHTML = ''
    }
}

let temporizador = setInterval(cuentaAtras, 1000)


