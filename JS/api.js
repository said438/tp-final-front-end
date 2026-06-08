//Funciones de API's
import {mensajeErrorApi} from "./renderizado";

export async function obtenerNombresPokemons(){

    try{
        const respesta = await fetch("https://pokeapi.co/api/v2/pokemon");
        const resultado = await respesta.json();
        const nombresPokemon = resultado.results.map(resultado => resultado.name);
        
        return nombresPokemon;
    }catch(ex){
        console.log("Error, no se pudo obtener los nombres de los pokemones de la API");
        console.log("Descripción del error: " + ex);
        mensajeErrorApi();
    }
}

export async function obtenerUrlImagenesPokemons(){
    const promesas = [];
    const cantidadPokemons = await obtenerCantidadPokemons();

    try{
        for (let index = 0; index < cantidadPokemons; index++) {
            promesas.push( fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`));
        }

        const respuestas = await Promise.all(promesas);
        const pokemons = await Promise.all(respuestas.map(respuesta => respuesta.json()));
        const urlsImagenes = pokemons.map(pokemon => pokemon.sprites.front_default);

        return urlsImagenes;
    }catch(ex){
        console.log("Error, no se pudo obtener las urls de las imagenes de la API");
        console.log("Descripción del error: " + ex);
        mensajeErrorApi();
    }
}

export async function obtenerCantidadPokemons(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const resultado = await response.json();
    const cantidadPokemons = resultado.results.length;

    return cantidadPokemons;
}
