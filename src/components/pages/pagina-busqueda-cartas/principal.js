import {obtenerCartas} from "/src/services/tcgApi.js";
import {mostrarCartas} from "./renderizado.js";
import {buscarCartas} from "./busqueda.js";

//Ejecución
EjecucionPrincipal();

//Funcion principal
async function EjecucionPrincipal(){
    const cartas = await obtenerCartas();
    mostrarCartas(cartas);

    //Eventos
    document.getElementById("input-cartas").addEventListener("input", (event) => {
        const textoInput = event.target.value;

        //Si el input esta vacio se muestran nuevamente las cartas iniciales y termina la ejecución
        if(textoInput.trim() === ""){
            mostrarCartas(cartas);
            return;
        }

        const cartasFiltradas = buscarCartas(cartas, textoInput);
        mostrarCartas(cartasFiltradas);
    });
}