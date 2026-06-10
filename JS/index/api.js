//Funciones de API's
import {Pokemon} from "./pokemon.js"
import {mostrarMensajeErrorApi} from "./renderizado.js";

export async function obtenerPokemons(){
    try{
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon");
        const resultado = await respuesta.json();

        const promesas = resultado.results.map(async (pokemon) => {
            console.log(pokemon.url);
            const respuesta = await fetch(pokemon.url);
            const detallePokemon = await respuesta.json();

            /*Le colocamos al Obj Pokemon los detalles
            que nos interesan con los datos obtenidos de la Api*/
            return new Pokemon(
                detallePokemon.id,
                detallePokemon.name,
                detallePokemon.height,
                detallePokemon.weight,
                detallePokemon.types[0].type.name,
                detallePokemon.sprites.front_default
            );
        });

        const pokemons = Promise.all(promesas);
        
        //Retornamos los pokemons con sus detalles
        return pokemons;
    }catch(ex){
        console.log("Error al obtener los pokemones");
        console.log(ex);
        mostrarMensajeErrorApi();
    }
}