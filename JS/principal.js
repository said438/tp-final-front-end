import {obtenerPokemons} from "./api.js";
import {mostrarPokemons, actualizarModalPokemon} from "./renderizado.js";
import {buscarPokemons} from "./busqueda.js";

//Ejecución
EjecucionPrincipal();

//Funcion principal
async function EjecucionPrincipal(){
    const pokemons = await obtenerPokemons();
    mostrarPokemons(pokemons);

    //Eventos
    document.getElementById("input-pokemon").addEventListener("input", async (event) => {
        const nombresPokemons = pokemons.map(pokemon => pokemon.nombre);
        const textoInput = event.target.value;

        //Si el input esta vacio muestra todos los pokemons y termina la ejecución
        if(textoInput.trim() === ""){
            mostrarPokemons(pokemons);
            return;
        }

        mostrarPokemons(buscarPokemons(pokemons, textoInput));
    });

    document.getElementById("lista-pokemons").addEventListener("click", async (event) => {
        const tarjetaPokemon = event.target.closest(".card"); 
        const pokemon = pokemons.filter(pokemon => {
            return `pokemon-${pokemon.id}` === tarjetaPokemon.id
        });

        actualizarModalPokemon(pokemon[0]);
    })
}