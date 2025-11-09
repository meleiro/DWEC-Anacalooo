// Importamos dos utilidades desde el módulo local "utils.js":
// - obtenerReservas: función asíncrona que llama a la API y devuelve la lista de reservas.
// - formatearReserva: función pura (presumiblemente) que recibe una reserva y devuelve un string legible.
import { obtenerReservas, formatearReserva } from "./utils.js"

// Referenciamos elementos del DOM que vamos a usar:
// - Un botón con id="btnConsultar" que el usuario pulsará para lanzar la consulta.
// - Un contenedor (por ejemplo <pre> o <div>) con id="resultado" donde mostraremos mensajes y resultados.
const btn = document.querySelector("#btnConsultar");
const resultado = document.querySelector("#resultado");

// Registramos un "escuchador" del evento click en el botón.
// La función manejadora es asíncrona porque dentro usaremos 'await' para esperar a la API.
btn.addEventListener("click", async () => {

    // Feedback inmediato al usuario: indicamos que estamos consultando.
    // Esto mejora la UX, evitando que parezca que no pasa nada tras pulsar.
    resultado.textContent = "Consultando API .... ";

    try{
        // Llamamos a la capa de datos. Como es una promesa, usamos 'await'.
        // Si la petición falla, el 'await' lanzará una excepción que capturará el catch.
        const reservas = await obtenerReservas();

        // Transformamos el array de reservas en un único string:
        // - .map(formatearReserva): aplica la función de formateo a cada elemento del array.
        //   Es equivalente a reservas.map(r => formatearReserva(r)).
        // - .join("\n"): concatena todas las líneas separándolas por un salto de línea.
        const texto = reservas.map(formatearReserva).join("\n");

        // Mostramos el resultado final en pantalla.
        // Anteponemos un encabezado y abajo la lista formateada.
        resultado.textContent = "Reservas obtenidas: \n" + texto;

    }catch (err){
        // Si ocurre cualquier error (de red, de parseo, error en formatearReserva, etc.),
        // informamos al usuario de forma genérica.
        // Nota: aquí NO se muestra el detalle del error; ver recomendaciones más abajo.
         resultado.textContent = "Error al cargar las reservas";
    }

});
