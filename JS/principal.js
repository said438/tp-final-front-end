import {obtenerNombresPokemons, obtenerUrlImagenesPokemons} from "./api.js";
import {mostrarPokemons} from "./renderizado.js";

//Ejecución
EjecucionPrincipal();

//Funcion principal
async function EjecucionPrincipal(){
    const listaNombresPokemons = 
        Array.from(await obtenerNombresPokemons());
    const listaUrlsImagenesPokemons = 
        Array.from(await obtenerUrlImagenesPokemons(listaNombresPokemons.length));

    console.log("lista de nombres de pokemons: ");
    console.log(listaNombresPokemons);
    console.log("lista de imagenes de los pokemons: ");
    console.log(listaUrlsImagenesPokemons);

    mostrarPokemons(listaNombresPokemons, listaUrlsImagenesPokemons);

    //Eventos
    document.getElementById("input-pokemon")
        .addEventListener("input", (event) => buscarPokemons(event, listaNombresPokemons));
}