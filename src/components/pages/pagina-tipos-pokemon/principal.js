import {mostrarPokemons} from "./renderizado.js"
import {obtenerPokemonsPopulares} from "/src/services/api.js";

principal();

async function principal(){
    const pokemons = await obtenerPokemonsPopulares();
    console.log(pokemons);
    
    mostrarPokemons(pokemons);
}