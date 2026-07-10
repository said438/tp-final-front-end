import {obtenerPokemons} from "/src/services/api.js";
import {actualizarEstadisticasPokemon} from "./renderizado.js";
import {buscarPokemons} from "./busqueda.js";


//Ejecución
/*EjecucionPrincipal();*/

//Funcion principal
async function EjecucionPrincipal(){
    const pokemons = await obtenerPokemons();

    actualizarEstadisticasPokemon(pokemons);

    //Eventos
    document.getElementById("busqueda-pokemons").addEventListener("input", (event) => {
        const textoInput = event.target.value;

        //Si el input esta vacio actualiza la vista y termina la ejecución
        if(textoInput.trim() === ""){
            actualizarEstadisticasPokemon(pokemons);
            return;
        }

        const pokemonsFiltrados = buscarPokemons(pokemons, textoInput)
        actualizarEstadisticasPokemon(pokemonsFiltrados);
    });
}
