import {obtenerPokemons} from "../golbales/api.js";
import {
    actualizarModalPokemon,
    actualizarVistaBusquedaPokemon
} from "./renderizado.js";
import {buscarPokemons} from "./busqueda.js";

//Ejecución
EjecucionPrincipal();

//Funcion principal
async function EjecucionPrincipal(){
    const pokemons = await obtenerPokemons();

    actualizarVistaBusquedaPokemon(pokemons);

    //Eventos
    document.getElementById("input-pokemon").addEventListener("input", async (event) => {
        const nombresPokemons = pokemons.map(pokemon => pokemon.nombre);
        const textoInput = event.target.value;

        //Si el input esta vacio actualiza la vista y termina la ejecución
        if(textoInput.trim() === ""){
            actualizarVistaBusquedaPokemon(pokemons);
            return;
        }

        actualizarVistaBusquedaPokemon(buscarPokemons(pokemons, textoInput));
    });

    document.getElementById("lista-pokemons").addEventListener("click", async (event) => {
        const tarjetaPokemon = event.target.closest(".card"); 
        const pokemon = pokemons.filter(pokemon => {
            return `pokemon-${pokemon.id}` === tarjetaPokemon.id
        });

        actualizarModalPokemon(pokemon[0]);
    })
}