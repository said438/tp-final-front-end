//Funciones de API's
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {Pokemon} from "/src/models/objPokemon.js"
import {mostrarMensajeErrorApi} from "/src/utils/excepciones.js";

export async function obtenerPokemons(){
    const resultado = await consultarAPI("https://pokeapi.co/api/v2/pokemon");

    const promesas = resultado.results.map(async (pokemon) => {
        const detallePokemon = await consultarAPI(pokemon.url);

        /*Le colocamos al Obj Pokemon los detalles
        que nos interesan con los datos obtenidos de la Api*/
        return new Pokemon(
            detallePokemon.id,
            detallePokemon.name,
            detallePokemon.height,
            detallePokemon.weight,
            detallePokemon.types.map(e => e.type.name),
            detallePokemon.sprites.front_default
        );
    });

    const pokemons = await Promise.all(promesas);
    return pokemons;
}

export async function obtenerTiposDePokemons(){
    let url = 'https://pokeapi.co/api/v2/type';
    let resultado;
    const tiposDePokemons = [];

    do{
        resultado = await consultarAPI(url);
        resultado.results.forEach(elemento => {
            tiposDePokemons.push(elemento.name);
        });

        url = resultado.next;
    }while(url !== null);

    return tiposDePokemons;
}

export async function obtenerPokemonsPopulares(){
    const idPokemonsPopulares = [
        25,   // Pikachu
        6,    // Charizard
        150,  // Mewtwo
        143,  // Snorlax
        448,  // Lucario
        445   // Garchomp
    ];

    const promesas = idPokemonsPopulares.map(async (id) =>{
        const detallePokemon = await consultarAPI(`https://pokeapi.co/api/v2/pokemon/${id}`)

        return new Pokemon(
            detallePokemon.id,
            detallePokemon.name,
            detallePokemon.height,
            detallePokemon.weight,
            detallePokemon.types.map(e => e.type.name),
            detallePokemon.sprites.front_default,
            detallePokemon.species
        );
    })

    const pokemonsPopulares = Promise.all(promesas);
    return pokemonsPopulares;
}

//función auxiliar
export async function consultarAPI(url){
    try{
        const respuesta = await fetch(url);
        return respuesta.json();
    }catch(ex){
        console.log(`Ocurrio un error al obtener datos de la API: ${ex}`);
        throw ex;
    }
}
