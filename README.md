# 🧠 CuantoSabes - Web Trivia Game

¡Bienvenido a **CuantoSabes**! Un juego de preguntas y respuestas (Trivia) interactivo desarrollado enteramente con JavaScript, HTML5 y CSS3. 

Este proyecto fue diseñado para poner a prueba conocimientos generales a través de una interfaz moderna estilo *Dark Neon*, implementando lógicas avanzadas de manipulación del DOM y consumo de datos asíncronos.

## ✨ Características Principales

*   **Bilingüe (Español / Inglés):** El sistema detecta el idioma seleccionado a través del análisis de la URL (`window.location.pathname`) y carga dinámicamente los recursos correspondientes.
*   **Persistencia de Datos:** Utiliza `localStorage` para guardar el *nickname* del jugador y mostrarlo durante toda la partida.
*   **Carga Asíncrona de Datos:** Las preguntas se obtienen desde archivos `.json` externos utilizando promesas con `async/await` y `fetch`, implementando bloques `try/catch` para una gestión de errores robusta.
*   **Baraje para ordenes aleatorios** Implementa el algoritmo de *Fisher-Yates* para barajar tanto el orden de las preguntas como el de las opciones de respuesta, garantizando que cada partida sea única.
*   **Renderizado Dinámico:** Inyección de HTML en tiempo real mediante plantillas literales y validación de estado (preguntas bloqueadas por ronda, opciones previamente marcadas).
*   **Interfaz Dark Neon:** Diseño *responsive* construido con CSS Grid y Flexbox, utilizando variables CSS (`:root`) para mantener una paleta de colores coherente y efectos de resplandor (*glow*).

## 🛠️ Tecnologías Utilizadas

*   **HTML5:** Estructuración semántica y accesible.
*   **CSS3:** Flexbox, Grid, Variables CSS, transiciones y pseudo-clases (`:hover`, `:checked`).
*   **JavaScript:** 
    *   Funciones flecha (`=>`) y métodos de iteración de arrays (`forEach`, `slice`).
    *   Manipulación del DOM (`querySelector`, `getElementById`, `classList.remove()`).
    *   Operadores ternarios.
    *   Generación de objetos JSON (`JSON.stringify`) para simular envío a servidor web.

## 🚀 Instalación y Uso

No se requiere instalación de dependencias ni frameworks. Para ejecutar el juego localmente:

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/cuantosabes.git](https://github.com/tu-usuario/cuantosabes.git)

## ESTRUCTURA DEL PROYECTO

/
├── index.html              # Pantalla de inicio (Español)
├── indexIngles.html        # Pantalla de inicio (Inglés)
├── preguntas.html          # Tablero de juego (Español)
├── preguntasIngles.html    # Tablero de juego (Inglés)
├── styles.css              # Hoja de estilos principal (Dark Neon)
├── scripts.js              # Lógica central del juego
├── preguntas.json          # Base de datos de preguntas (Español)
├── preguntasIngles.json    # Base de datos de preguntas (Inglés)
└── imagenes/               # Recursos gráficos (logos, iconos)
└── documentacionPractica.PDF          #Explicación detallada del funcionamiento del JS 
