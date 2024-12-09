"use strict";

document.addEventListener("DOMContentLoaded", inicio);

function inicio() {
    
    //Recojo elementos del DOM
    let botonValidarNombre = document.getElementById("botonValidarNombre");
    let botonGenerarTablero = document.getElementById("botonGenerarTablero");
    let seccionTablero = document.getElementById("seccionTablero");
    let seccionRegistro = document.getElementById("seccionRegistro");
    let botonTirarDados = document.getElementById("botonTirarDados");
    

    let jugadorX = 0;
    let jugadorY = 0; 
    let tesoroX = 9;
    let tesoroY = 9;
    let nombreUsuarioGlobal; // Variable global para almacenar el nombre del usuario
    
    seccionTablero.style.display = "none"; //Escondo el tablero
    botonGenerarTablero.disabled = true; //Deshabilito el boton de generar tablero

    botonValidarNombre.addEventListener("click", validarNombre); //Genero un evento en el boton de validar nombre que llama a la función de validar el nombre de usuario
    botonGenerarTablero.addEventListener("click", iniciarJuegoTablero); //Genero un evento en el boton de generarTablero que llama a la función de iniciar el juego
    botonTirarDados.addEventListener("click", tirarDados); //Genero un evento en el boton de tirar dados que llama a la función de tirar dados

    /*Función creada para añadir música al juego. Tiene un parámetro que es la ruta del recurso.mp3*/
    function reproducirMusica(ruta) {
        const audio = new Audio(ruta); // creo un objeto de tipo audio con la ruta del recurso
        audio.play(); //Activo el sonido
    }

    /*Función para validar el nombre del usuario en base a carácteres 
    númericos y longitud mediante el uso de expresiones regulares*/
    function validarNombre() {
        let nombreUsuario = document.getElementById("nombreUsuario").value.trim(); //Capturo el valor del input y quito espacios
        let pBotonValidarNombre = document.getElementById("pBotonValidarNombre"); //Capturo el elemento p del DOM
        // Caso 1: Validar longitud mínima
        if (!/^.{4,}$/.test(nombreUsuario)) { //Si tiene menos de 4 letras...
            pBotonValidarNombre.textContent = "El nombre debe tener 4 o más letras.";     
        }
        // Caso 2: Validar que no contenga números
        else if (/\d/.test(nombreUsuario)) { //Si contiene numeros...
            pBotonValidarNombre.textContent = "Números no permitidos.";
        }
        // Caso 3: Nombre válido
        else {
            pBotonValidarNombre.innerHTML = `A luchar héroe: <span>${nombreUsuario}</span> `; //Utilizo innerHTML para que trague el span y no lo muestre como texto literal
            botonGenerarTablero.disabled = false; //El boton de generar tablero se activa
            reproducirMusica("./sound/desbloquear.mp3"); //Reproduzco sonido
            // Guardar el nombre para utilizarlo en la  función de récord
            nombreUsuarioGlobal = nombreUsuario;
        }
    }


    /*Función encargada de generar dinámicamente el tablero en el que se jugará. */
    function generarTablero(tamano) {
        let tablero = document.getElementById("tablero"); // Recogo el tablero del DOM
        tablero.innerHTML = ""; //Lo limpio entero

        for (let i = 0; i < tamano; i++) { //Creo un bluce for que controlará las columnas
            let columna = document.createElement("tr"); // Creo el elemento columna
            for (let j = 0; j < tamano; j++) { //Creo un bluce for que controlará las filas
                let celda = document.createElement("td"); //Creo el elemento fila
                celda.classList.add("cell"); //Añado la  clase cell a las celdas
                celda.setAttribute("columna", i); //La añado también el índice  de la columna
                celda.setAttribute("fila", j); // Y el índice de la fila

                if (i == jugadorX && j == jugadorY){ // Si el indice de la columna coincide con la posición de X  y el índice de la fila con el de  Y ...
                    celda.classList.add("personaje");  // Añado el personaje
                } 
                if (i == tesoroX && j == tesoroY){ //Lo mismo que el anterior if pero añadiendo el tesoro que siempre va a estar en la (9,9)
                    celda.classList.add("premio"); // Añado el premio objetivo
                } 

                columna.appendChild(celda); // Introduzco en la columna la celda
            }
            tablero.appendChild(columna); // Introduzco en el tablero la columna que contiene  la celda
        }
    }

    /*Función que es llama a la hora de pulsar el boton de generarTablero
    en la que se llama a la función de crear tablero y hace que desaparezca la sección de
    registro y aparezca la de el juego*/
    function iniciarJuegoTablero() {
        generarTablero(10); //Llama a la función tablero
        seccionRegistro.style.display = "none";  //Desaparece sección registro
        seccionTablero.style.display = "block"; //Aparece sección tablero
    }




    /*Función que crea y devuelve un número aleatorio partiendo del 1 hasta el rango por
    parámetro que deseemos */
    function generarNumeroAleatorio(rango) {
        return Math.floor(Math.random() * rango) + 1;
    }



    /*Función que se encarga de coordinar el movimiento de los dados junto
    con parte de la movilidad del  personaje y la parte estética de cambiar imágen
    altirar el dado*/
    function tirarDados() {
        let numeroAleatorio = generarNumeroAleatorio(6); //Se genera  un número aleatorio
        moverImagenAleatoria(numeroAleatorio); // Se llama a la función moverImagen con el parámetro del número aleatorio
        resaltarCeldas(numeroAleatorio); // Se llama a la función resaltar celdas con el parámetro del número aleatorio
        botonTirarDados.disabled = true; //Se desactiva el boton de tirar dados
        reproducirMusica("./sound/tirarDado.mp3"); // Reproduce el sonido simulando un dado
        numeroTiradas(); // Llamo a la función numero tiradas
    }

    /*Función que se encarga del movimiento visual del dado. LLeva un parametro que es un número aleatorio*/
    function moverImagenAleatoria(numeroAleatorio) {
        let dadoImg = document.getElementById("dadoImg"); // Cojo el elemento del DOM
        dadoImg.setAttribute("src", `./img/Dado${numeroAleatorio}.png`); //Le pongo el src de la ruta a la imagen con el número que corresponda
        console.log(`Número del dado: ${numeroAleatorio}`);
    }

    /*Función que calcula, pinta y habilita al jugador desplazarse a una serie de
    celdas en función del número aleatorio */
    function resaltarCeldas(dado) {
        let celdas = document.querySelectorAll(".cell"); // // Selecciono todas las celdas con la clase "cell"

        celdas.forEach((celda) => { // Itero sobre toda las celdas del tablero
            let columna = parseInt(celda.getAttribute("columna")); //Recojo el atributo columna que añadimos al crear la tabla y lo parseo
            let fila = parseInt(celda.getAttribute("fila")); //Recojo el atributo fila que añadimos al crear la tabla y lo parseo

            if (columna != jugadorX || fila != jugadorY) { //Si la columna es distinta a la posicion del jugador en X y a la posicion del jugador en Y
                /*Utilizo Math.abs para trabajar con valores absolutos y descartar negativos.
                Si la columna menos la posicion de el jugador en X es menor o igual al dado
                y además la fila coincide con la posicion del jugador en Y añando la clase activa a esa
                celda y la habilito para mover al héreo. Como es un OR con que se cumpla una de 
                las conciones u otra ya entra por el if. También la otra condición del if es
                si la fila - la posicion de Y del jugador es menor o igual al dado y la columna es igual a l
                la posicón del jugador en X entra por el if*/
                if ((Math.abs(columna - jugadorX) <= dado && fila == jugadorY) 
                    || (Math.abs(fila - jugadorY) <= dado && columna == jugadorX)) {
                    celda.classList.add("activa"); // Añado clase activa
                    celda.addEventListener("click", moverHeroe); // Añado evento
                }
            }
        });
    }

    /*Función que recoge todas las celdas de clase activa y elimina esta */
    function limpiarCeldasActivas() {
        document.querySelectorAll(".cell.activa").forEach((celda) => { // Recojo todas las celdas activas y las recorro
            celda.classList.remove("activa"); // Se elimina la clase activa de las celdas y deja el tablero limpio
            celda.removeEventListener("click", moverHeroe); //Evento que al hacer click en la celda elimina el evento previamente asociado a la celda
        });
    }

    /*Función que hace que se mueve el personaje por el tablero*/
    function moverHeroe(evento) {
        let celda = evento.target; //Almaceno en una variable la celda que se clickea
        jugadorX = parseInt(celda.getAttribute("columna")); //Primero parseo y luego almaceno el atributo de la celda en la posicon X del jugador
        jugadorY = parseInt(celda.getAttribute("fila")); //Primero parseo y luego almaceno el atributo de la celda en la posicon Y del jugador

        limpiarCeldasActivas(); //LLamo a la función para limpiar las celdas uyna vez movido el personaje

        victoria(); // LLamo a la función de victoria(solo se activará una vez)

        generarTablero(10); //Vuelvo a generar el tablero con la posición del jugador actualizada
        botonTirarDados.disabled = false; //Habilito el botón para tirar el dado
    }


    /*Esta función sirve para saber cuando el usuario ha ganado. Una vez llega
    al premio(pokeball), se producen una serie de eventos*/
    function victoria() {
        if (jugadorX == tesoroX && jugadorY == tesoroY) { //Si la posición del jugador y del premio coinciden...
            alert(`¡Ganaste! usando ${tiradas} tiradas`); //Muestro un alert con las tiradas que usó
            let dadoImg = document.getElementById("dadoImg"); //Capturo elemento del DOM
            dadoImg.setAttribute("src", `./img/Dado0.png`); //Le añado la imagen del dado estándar
            reproducirMusica("./sound/victoria.mp3"); // Le añado un sonido de victoria
            establecerRecord(); //LLamo a la función para ver si ha establecido o no el record
        }
    }

    /*Esta función tiene la labor de autoincrementar las tiradas.Es decir,
    cada vez que se la llama su valor vale +1 */
    let tiradas = 0; //Declaro la variable fuera de la función para que su ámbito sea global
    function numeroTiradas() {
        tiradas++;
        return tiradas;
    }

    /*En esta función almaceno el nombre del usuario y las tiradas totales en localStorage
    para la  persistencia de datos. Además, en base a si estable o no el record de tiradas, muestro un feedback por
    pantalla para que el usuario sepa si lo ha batido o no y en cuento se encuentra el record actualmente*/
    function establecerRecord() {
        // Calculo y guardo las tiradas totales
        let tiradasTotales = numeroTiradas() - 1; // Restamos 1 porque al volver a llamar aquí a nuestra función nos cuenta una tirada de más

        // Recuperamos el récord anterior del localStorage (si existe)
        let recordTiradas = localStorage.getItem("recordTiradas");

        //Creo el elemento <p></p> mensaje que más adelante dependiendo de los if, albargará un mensaje u otro
        let mensajeVictoria = document.createElement('p');

        if (recordTiradas == null) { // Si no hay récord previo
            recordTiradas = tiradasTotales; //Establecemos el actual como récord inicial
            localStorage.setItem("recordTiradas", recordTiradas.toString());//Añadimos a localstorage el record de tiradas
            mensajeVictoria.textContent = `¡Primer récord establecido! Tiradas: ${recordTiradas}👑`; //Añadimos texto al p

        } else { //Si hay record previo...
            // Convertimos el récord recuperado a número dado que en localstorage almacenamos strings
            recordTiradas = parseInt(recordTiradas);
            if (tiradasTotales < recordTiradas) { //Si las tiradas totales son inferiores al record...
                recordTiradas = tiradasTotales;// Actualizamos el récord si las tiradas actuales son menores
                localStorage.setItem("recordTiradas", recordTiradas.toString()); //Añadimos a localstorage
                mensajeVictoria.textContent = `Nuevo récord establecido: ${recordTiradas} tiradas👑`; //Añadimos texto al p
            } else { //Si no se supera el record
                mensajeVictoria.textContent = `Récord actual no superado: ${recordTiradas} tiradas👑`; //Añadimos texto al p
            }
        }
        // Guardamos las tiradas totales y el nombre del jugador actual en localStorage
        localStorage.setItem(nombreUsuarioGlobal, tiradasTotales.toString());
        document.body.appendChild(mensajeVictoria); //Añado el p al body con el mensaje del cado del if por el que ha entrado
        botonTirarDados.replaceWith(mensajeVictoria); // Remplazo el boton por el <p></p> y al reemplazar el boton de tirar dado por el mensaje de record paro la ejecución del juego y a la vez doy feedback visual al usuario
    }


    /*Este efecto va de la mano con el código css. Es una función muy similar a
    una tarea que hicimos el año pasado en la asignatura de Lenguaje de Marcas. Básicamente,
    a modo de juego arcade, la pantalla crea un efecto visual de apertura de "telón"*/
    function pantallaDeCarga() {
        // Capturo elementos del DOM
        let contenedorSeparacion = document.getElementById("contenedorSeparacion");
        let separacionArriba = document.getElementById("separacionArriba");
        let separacionAbajo = document.getElementById("separacionAbajo");

        setTimeout(() => { //Establece un tiempo de espera de 1 segundo antes de aplicar la animación
            separacionArriba.style.transform = "translateY(-100%)"; //Mueve la imagen hacia arriba hasta que desaparece
            separacionAbajo.style.transform = "translateY(100%)";   //Mueve la imagen hacia abajo hasta que desaparece
        }, 1000);

        setTimeout(() => { //Establece un tiempo de espera de 2,4 segundos antes de aplicar la animación
            contenedorSeparacion.style.display = "none"; //Pone invible el contenedor de separación
            seccionRegistro.style.display = "block"; //Activa la sección de registro
        }, 2400);
    }





    pantallaDeCarga();
    

}
