// Preguntas del concurso. Cada pregunta tiene opciones y una respuesta correcta.
const preguntas = [
    {
        pregunta: "¿Qué lenguaje se utiliza para dar estructura a una página web?",
        opciones: ["CSS", "HTML", "JavaScript", "Python"],
        correcta: "HTML"
    },
    {
        pregunta: "¿Qué lenguaje se utiliza principalmente para dar estilos a una página web?",
        opciones: ["CSS", "Java", "SQL", "PHP"],
        correcta: "CSS"
    },
    {
        pregunta: "¿Qué lenguaje permite agregar interactividad a una página web?",
        opciones: ["HTML", "CSS", "JavaScript", "XML"],
        correcta: "JavaScript"
    },
    {
        pregunta: "¿Qué significa la sigla CPU?",
        opciones: [
            "Central Processing Unit",
            "Computer Personal User",
            "Control Program Unit",
            "Central Program Utility"
        ],
        correcta: "Central Processing Unit"
    },
    {
        pregunta: "¿Cuál de estos es un navegador web?",
        opciones: ["Visual Studio Code", "Google Chrome", "MySQL", "Git"],
        correcta: "Google Chrome"
    },
    {
        pregunta: "¿Para qué sirve Git?",
        opciones: [
            "Editar imágenes",
            "Administrar versiones del código",
            "Crear presentaciones",
            "Diseñar bases de datos"
        ],
        correcta: "Administrar versiones del código"
    },
    {
        pregunta: "¿Qué símbolo se utiliza normalmente para comentarios de una línea en JavaScript?",
        opciones: ["<!-- -->", "//", "**", "##"],
        correcta: "//"
    },
    {
        pregunta: "¿Qué estructura permite repetir instrucciones en JavaScript?",
        opciones: ["if", "for", "const", "return"],
        correcta: "for"
    }
];

// Obtenemos los elementos del HTML.
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaPregunta = document.getElementById("pantalla-pregunta");
const pantallaFinal = document.getElementById("pantalla-final");
const botonIniciar = document.getElementById("btn-iniciar");
const botonSiguiente = document.getElementById("btn-siguiente");
const botonRepetir = document.getElementById("btn-repetir");
const numeroPregunta = document.getElementById("numero-pregunta");
const textoPregunta = document.getElementById("texto-pregunta");
const opciones = document.getElementById("opciones");
const retroalimentacion = document.getElementById("retroalimentacion");

let preguntaActual = 0;
let puntaje = 0;
let respuestasUsuario = [];

// Mezcla las preguntas para que el orden cambie en cada intento.
function mezclarPreguntas() {
    preguntas.sort(() => Math.random() - 0.5);
}

// Inicia o reinicia el concurso.
function iniciarConcurso() {
    preguntaActual = 0;
    puntaje = 0;
    respuestasUsuario = [];

    mezclarPreguntas();

    pantallaInicio.classList.add("oculto");
    pantallaFinal.classList.add("oculto");
    pantallaPregunta.classList.remove("oculto");

    mostrarPregunta();
}

// Muestra la pregunta y crea un botón por cada respuesta.
function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];

    numeroPregunta.textContent =
        "Pregunta " + (preguntaActual + 1) + " de " + preguntas.length;
    textoPregunta.textContent = pregunta.pregunta;
    opciones.innerHTML = "";
    retroalimentacion.textContent = "";
    botonSiguiente.classList.add("oculto");

    pregunta.opciones.forEach(function(opcion) {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.classList.add("opcion");
        boton.type = "button";

        boton.addEventListener("click", function() {
            comprobarRespuesta(opcion, boton);
        });

        opciones.appendChild(boton);
    });
}

// Comprueba si la opción elegida es correcta y muestra el resultado.
function comprobarRespuesta(respuesta, botonElegido) {
    const pregunta = preguntas[preguntaActual];
    const botones = document.querySelectorAll(".opcion");
    const esCorrecta = respuesta === pregunta.correcta;

    botones.forEach(function(boton) {
        boton.disabled = true;

        if (boton.textContent === pregunta.correcta) {
            boton.classList.add("correcta");
        }
    });

    if (esCorrecta) {
        puntaje++;
        retroalimentacion.textContent = "¡Correcto! Muy bien.";
        retroalimentacion.style.color = "#527d5d";
    } else {
        botonElegido.classList.add("incorrecta");
        retroalimentacion.textContent =
            "Respuesta incorrecta. La respuesta correcta es: " + pregunta.correcta;
        retroalimentacion.style.color = "#b45f5f";
    }

    respuestasUsuario.push({
        pregunta: pregunta.pregunta,
        respuesta: respuesta,
        correcta: pregunta.correcta,
        acierto: esCorrecta
    });

    botonSiguiente.classList.remove("oculto");

    if (preguntaActual === preguntas.length - 1) {
        botonSiguiente.textContent = "Ver resultado";
    } else {
        botonSiguiente.textContent = "Siguiente pregunta";
    }
}

// Avanza a la siguiente pregunta o muestra el resultado final.
function siguientePregunta() {
    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

// Muestra el puntaje y la revisión de todas las respuestas.
function mostrarResultado() {
    pantallaPregunta.classList.add("oculto");
    pantallaFinal.classList.remove("oculto");

    document.getElementById("resultado-final").textContent =
        "Tu puntaje fue " + puntaje + " de " + preguntas.length + ".";

    const listaResultados = document.getElementById("lista-resultados");
    listaResultados.innerHTML = "";

    respuestasUsuario.forEach(function(resultado, indice) {
        const elemento = document.createElement("div");
        elemento.classList.add("resultado-item");

        const estado = resultado.acierto
            ? '<strong class="correcto-texto">Correcta</strong>'
            : '<strong class="incorrecto-texto">Incorrecta</strong>';

        elemento.innerHTML =
            "<p><strong>" + (indice + 1) + ". " + resultado.pregunta + "</strong></p>" +
            "<p>Tu respuesta: " + resultado.respuesta + "</p>" +
            "<p>Respuesta correcta: " + resultado.correcta + "</p>" +
            "<p>Resultado: " + estado + "</p>";

        listaResultados.appendChild(elemento);
    });
}

// Eventos de los botones principales.
botonIniciar.addEventListener("click", iniciarConcurso);
botonSiguiente.addEventListener("click", siguientePregunta);
botonRepetir.addEventListener("click", iniciarConcurso);
