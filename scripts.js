//Gestión del nickname del jugador y almacenamiento en localStorage

function guardarYComenzar() {
    let inputNickname = document.getElementById("nickname").value;
    if (inputNickname.trim() === "") {
        alert("Por favor, introduce un nickname antes de comenzar el juego.");
        return;
    }
    localStorage.setItem("nombreUsuario", inputNickname);
    if (window.location.pathname.includes("indexIngles.html")) {
        window.location.href = "preguntasIngles.html";
    } else {
        window.location.href = "preguntas.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let elementoJugador = document.getElementById("display-jugador");
    
    // Se establece un método de seguridad para asegurarnos de que los elementos existen antes de intentar manipularlos
    if (elementoJugador) {
        let nombreGuardado = localStorage.getItem("nombreUsuario");
        
        if (nombreGuardado) {
            elementoJugador.textContent = nombreGuardado;
        } 
        cargarPreguntas(); 
    }});


// Carga de las preguntas a partir de un archivo JSON externo
let listaPreguntas = [];

async function cargarPreguntas() {
    try {
        let archivo;
        if (window.location.pathname.includes("preguntasIngles.html")) {
            archivo = "preguntasIngles.json";
        } else {
            archivo = "preguntas.json";
        }

        const respuesta = await fetch(archivo);
        
        const datos = await respuesta.json();
        
        listaPreguntas = datos;
        
        prepararJuego(); // Llamamos a la función para preparar el juego con las preguntas cargadas

    } catch (error) {
        console.error("Hubo un problema al cargar el JSON:", error);
    }
}

//Función para bajarar el JSON de preguntas y preparar el juego

function barajarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));
        
        // Intercambiamos los elementos en las posiciones i y j
        let temporal = array[i];
        array[i] = array[j];
        array[j] = temporal;
    }
    return array;
}





// Preparación del juego: desordenar preguntas, seleccionar 4 y preparar respuestas

let preguntasJuego = []; 

function prepararJuego() {
    barajarArray(listaPreguntas); 
    preguntasJuego = listaPreguntas.slice(0, 4);

    preguntasJuego.forEach(pregunta => {
        
        pregunta.textoRespuestaCorrecta = pregunta.respuestas[pregunta.correcta];

        barajarArray(pregunta.respuestas);
    });
    
    dibujarRonda(); // Llamamos a la función para dibujar la primera ronda
    
    // El siguiente paso será dibujarlas en el HTML
    // dibujarRonda(); 
}


// Variable global para controlar en qué ronda estamos
let rondaActual = 1;

function dibujarRonda() {
    let contenedor = document.getElementById("contenedor-preguntas");
    contenedor.innerHTML = ""; 

    // IMPORTANTE: Ahora dibujamos desde la primera pregunta (0) hasta el límite de la ronda actual
    let fin = rondaActual * 2;
    let preguntasMostrar = preguntasJuego.slice(0, fin);

    let html = "";
    
    preguntasMostrar.forEach((pregunta, index) => {
        // Si el índice de la pregunta es menor a las de la ronda actual, significa que es antigua y la bloqueamos
        let bloqueado = (index < (rondaActual - 1) * 2) ? "disabled" : "";

        html += `<div class="tarjeta-pregunta">
                    <h4>Pregunta ${index + 1}</h4>
                    <h3>${pregunta.pregunta}</h3>
                    <div class="opciones">`;
        
        pregunta.respuestas.forEach((respuesta) => {
            // Si el usuario ya había elegido esta opción en una ronda anterior, le ponemos "checked" para no borrar su selección
            let marcado = (pregunta.respuestaUsuario === respuesta) ? "checked" : "";
            
            html += `<label>
                        <input type="radio" name="pregunta-${pregunta.id}" value="${respuesta}" ${bloqueado} ${marcado}>
                        ${respuesta}
                     </label><br><br>`;
        });

        html += `</div></div><hr>`;
    });

    contenedor.innerHTML = html;
    
    // Detalle visual extra: Cambiamos el texto del botón en la última ronda
    let btnComprobar = document.getElementById("btn-comprobar");
    if (btnComprobar && rondaActual === 2) {
        btnComprobar.textContent = "Comprobar y Finalizar";
    }
}

// NUEVA FUNCIÓN PARA EVALUAR
function comprobarRespuestas() {
    // Calculamos qué preguntas estamos evaluando en ESTA ronda
    let inicio = (rondaActual - 1) * 2;
    let fin = inicio + 2;
    let preguntasRonda = preguntasJuego.slice(inicio, fin);
    
    let todasCorrectas = true;
    let faltanRespuestas = false;

    preguntasRonda.forEach(pregunta => {
        // Magia de JS: Buscamos el radio button que el usuario haya marcado para el ID de esta pregunta en concreto
        let seleccion = document.querySelector(`input[name="pregunta-${pregunta.id}"]:checked`);
        
        if (!seleccion) {
            faltanRespuestas = true; // El jugador no marcó nada en esta pregunta
        } else {
            // Guardamos la respuesta del usuario en nuestro objeto para no perderla cuando redibujemos el HTML
            pregunta.respuestaUsuario = seleccion.value;
            
            // Comparamos el texto del radio button con el que guardamos al principio
            if (seleccion.value !== pregunta.textoRespuestaCorrecta) {
                todasCorrectas = false; // El jugador falló
            }
        }
    });

    // 1. Validar que no se dejó nada en blanco
    if (faltanRespuestas) {
        alert("¡Eh! Te has dejado alguna pregunta sin responder en esta ronda.");
        return;
    }

    // 2. Comprobar si ganó o perdió
    if (!todasCorrectas) {
        // Si hay algún fallo, termina el juego enviando "false"
        finalizarJuego(false);
    } else {
        if (rondaActual === 1) {
            alert("¡Correcto! Pasas a la ronda final.");
            rondaActual++;
            dibujarRonda(); // Redibujamos la pantalla
        } else {
            // Si es la ronda 2 y acertó todo, termina el juego enviando "true"
            finalizarJuego(true);
        }
    }
}

function finalizarJuego(haGanado) {
    let acertadas = 0;
    let falladas = 0;

    // 1. Contamos aciertos y fallos
    preguntasJuego.forEach(pregunta => {
        if (pregunta.respuestaUsuario) {
            if (pregunta.respuestaUsuario === pregunta.textoRespuestaCorrecta) {
                acertadas++;
            } else {
                falladas++;
            }
        }
    });

    let nombreJugador = localStorage.getItem("nombreUsuario") || "Invitado";

    // 2. Creamos el objeto JSON tal y como lo pide el enunciado
    const datosFinales = {
        jugador: nombreJugador,
        acertadas: acertadas,
        falladas: falladas,
        victoria: haGanado
    };

    // Imprimimos el JSON por consola para demostrar que está empaquetado y listo
    console.log("JSON listo (simulación de envío):", JSON.stringify(datosFinales));

    // 3. Modificamos el contenido del Modal
    let modal = document.getElementById("modal-resultados");
    let mensajeFinal = document.getElementById("mensaje-final");
    let puntuacionFinal = document.getElementById("puntuacion-final");

    if (haGanado) {
        mensajeFinal.textContent = `¡Felicidades, ${nombreJugador}! ¡Has ganado el concurso!`;
    } else {
        mensajeFinal.textContent = `¡Fin del juego, ${nombreJugador}!`;
    }

    // Mostramos la puntuación en formato X / Y
    puntuacionFinal.textContent = `${acertadas} / ${acertadas + falladas} Correctas`;

    // 4. Hacemos visible la ventana emergente quitándole la clase "oculto"
    modal.classList.remove("oculto");
}