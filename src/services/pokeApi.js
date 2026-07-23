//Funciones de API's
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {Pokemon} from "/src/models/objPokemon.js"
import {mostrarMensajeErrorApi} from "/src/utils/excepciones.js";
import {consultarAPI} from "/src/utils/api.js"

const URL_BASE = 'https://pokeapi.co/api/v2';

export async function obtenerPokemons(desde = 1, hasta = 20){
    try{
        const promesas = [];

        for (let idPokemon = desde; idPokemon <= hasta; idPokemon++) {
            const detallePokemon = await consultarAPI(`${URL_BASE}/pokemon/${idPokemon}`);
            
            const nuevoPokemon = new Pokemon(
                detallePokemon.id,
                detallePokemon.name,
                detallePokemon.height,
                detallePokemon.weight,
                detallePokemon.types.map(e => e.type.name),
                detallePokemon.sprites.front_default
            )

            promesas.push(nuevoPokemon);
        }
            
        const pokemons = await Promise.all(promesas);
        return pokemons;
    }catch(ex){
        throw new Error(`Error al obtener los pokemons desde la API: ${ex}`);
    }
    
}

export async function obtenerTiposDePokemons(){
    try{
        let url = `${URL_BASE}/type`;
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
    }catch(ex){
        throw new Error(`Error al obtener los tipos de pokemons desde la API: ${ex}`);
    }
    
}

export async function obtnerPokemonsPorNombre(nombrePokemon){
    let url = `${URL_BASE}/pokemon/${nombrePokemon}`;
    let resultado;
    const pokemons = [];

    do{
        resultado = await consultarAPI(url);
        resultado.results.filter(pokemon => pokemon.name === nombrePokemon);
        
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
        const detallePokemon = await consultarAPI(`${URL_BASE}/pokemon/${id}`)

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
