import {obtenerCartas} from "/src/services/tcgApi.js";
import {mostrarCartas} from "./renderizado.js";
import {buscarObjetosPorNombre} from "/src/utils/busqueda.js";

//Ejecución
EjecucionPrincipal();

//Funcion principal
async function EjecucionPrincipal(){
    const cartas = await obtenerCartas();
    mostrarCartas(cartas);

    //Eventos
    document.getElementById("input-cartas").addEventListener("input", (event) => {
        const textoInput = event.target.value;
        console.log(`buscando: ${textoInput}`);

        //Si el input esta vacio se muestran nuevamente las cartas iniciales y termina la ejecución
        if(textoInput.trim() === ""){
            mostrarCartas(cartas);
            return;
        }

        const cartasFiltradas = buscarObjetosPorNombre(cartas, textoInput);
        mostrarCartas(cartasFiltradas);
    });
}