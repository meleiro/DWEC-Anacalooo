// Exportamos una función asíncrona llamada `obtenerReservas`.
// Su responsabilidad es simular la obtención de datos desde una API externa (como un fetch),
// y devolver un array de objetos con reservas una vez finaliza.
export async function obtenerReservas() {

    try {
        // Simulamos una llamada HTTP real usando un Promise y setTimeout.
        // Esto es muy común en entornos educativos o de prueba cuando aún no existe la API real.
        // La promesa se resuelve después de 3 segundos (3000 ms).
        const respuesta = await new Promise(resolve => {
            setTimeout(() => { 
                // Simulamos el objeto `Response` típico de `fetch`.
                // Incluye la propiedad `ok` (indicando éxito) y un método `json()` que devuelve otra promesa.
                resolve({
                  ok: true, // simulamos que la respuesta es exitosa (como HTTP 200)
                  json: () => Promise.resolve([
                    { id: 1, cliente: "Lucía", fecha: "2025-11-02"},
                    { id: 2, cliente: "Carlos", fecha: "2025-11-05"}
                  ])
                });
             }, 3000); // <-- simulamos una espera de red de 3 segundos
        });

        // Verificamos si la respuesta fue exitosa.
        // En una llamada real a fetch, `ok` sería false si el código HTTP es >=400.
        if (!respuesta.ok) throw new Error("Error de conexión");

        // Si todo va bien, obtenemos los datos en formato JSON.
        // En este caso, `respuesta.json()` devuelve directamente el array de reservas.
        const datos = await respuesta.json();

        // Devolvemos los datos al lugar donde se invocó `obtenerReservas()`.
        return datos;

    } catch (error) {
        // Si ocurre cualquier error durante la simulación (o en la llamada real),
        // se captura aquí para:
        // 1) registrar el error en consola (útil para depuración),
        // 2) volver a lanzarlo (`throw error`) para que el código que invoca
        //    esta función pueda manejarlo (en el bloque try/catch del otro archivo).
        console.error("Error obteniendo las reservas", error);
        throw error;
    }

}

// Exportamos una función pura que recibe un objeto `reserva`
// y devuelve un string legible con su información formateada.
// Esto permite separar la lógica de presentación de la lógica de datos.
export function formatearReserva(reserva) {
    return ` #${reserva.id} -> ${reserva.cliente} -> ${reserva.fecha} `;
}
