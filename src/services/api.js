//Funciones de API's
import {Pokemon} from "../models/objPokemon.js"
import {mostrarMensajeErrorApi} from "/src/utils/excepciones.js";

export async function obtenerPokemons(){
    try{
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon");
        const resultado = await respuesta.json();

        const promesas = resultado.results.map(async (pokemon) => {
            const respuesta = await fetch(pokemon.url);
            const detallePokemon = await respuesta.json();

            /*Le colocamos al Obj Pokemon los detalles
            que nos interesan con los datos obtenidos de la Api*/
            return new Pokemon(
                detallePokemon.id,
                detallePokemon.name,
                detallePokemon.height,
                detallePokemon.weight,
                detallePokemon.types.map(e => e.type.name),
                detallePokemon.sprites.front_default,
                detallePokemon.species
            );
        });

        const pokemons = await Promise.all(promesas);
        
        //Retornamos los pokemons con sus detalles
        return pokemons;
    }catch(ex){
        console.log("Error al obtener los pokemones");
        console.log(ex);
        mostrarMensajeErrorApi();
    }
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
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const detallePokemon = await respuesta.json();

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


/*
export async function obtenerEspecies(pokemons) {
    try{
        const promesas = pokemons.map(async (pokemon) =>{
            const respuesta = await fetch(pokemon.especies.url);
            const especies = await respuesta.json();
            return especies;
        });
        
        const especies = await Promise.all(promesas);

        console.log(especies);
        
        return especies;
    }catch(ex){
        console.log("Error al obtener los pokemones");
        console.log(ex);
        mostrarMensajeErrorApi();
    }
}

export async function obtenerCadenasDeEvoluciones(especies) {

    const promesas = especies.map(async (especie) =>{
        console.log(especie);
        console.log(especie.evolution_chain.url);
        
        const respuesta = await fetch(especie.evolution_chain.url);
        const cadenaDeEvolucion = await respuesta.json();
        return cadenaDeEvolucion;
    });

    const cadenasDeEvoluciones = await Promise.all(promesas);

    console.log(cadenasDeEvoluciones);
    
    return cadenasDeEvoluciones;
}

export async function obtenerEvoluciones(cadenasDeEvoluciones) {

    const promesas = cadenasDeEvoluciones.map(async (cadenaDeEvolucion) =>{
        console.log(cadenaDeEvolucion);
        console.log(cadenaDeEvolucion.chain);
        
        const respuesta = await fetch(especie.evolution_chain.url);
        const cadenaDeEvolucion = await respuesta.json();
        return cadenaDeEvolucion;
    });

    const cadenasDeEvoluciones = await Promise.all(promesas);

    console.log(cadenasDeEvoluciones);
    
    return cadenasDeEvoluciones;
}
*/
