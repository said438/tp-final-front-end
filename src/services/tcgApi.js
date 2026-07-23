
import {consultarAPI} from "/src/utils/api.js";
import {CartaPokemon} from "/src/models/objCartaPokemon.js";

const URL_BASE = 'https://api.tcgdex.net/v2/es';

export async function obtenerCartas(limiteDeCartas = 20){

    try{
        //Aplico paginación a la API con '?pagination:page=1&pagination:itemsPerPage=${limiteDeCartas}'
        const cartas = await consultarAPI(
            `${URL_BASE}/cards?pagination:page=1&pagination:itemsPerPage=${limiteDeCartas}`
        );

        //Solo me quedo con las cartas que tengan una imagen
        const cartasConImagen = cartas.filter(carta => carta.image !== undefined)

        const promesasDeCartas = cartasConImagen.map(async (carta) => {
            const detalleCarta = await consultarAPI(`${URL_BASE}/cards/${carta.id}`);

            return new CartaPokemon(
                detalleCarta.id,
                detalleCarta.name,
                detalleCarta.rarity,
                detalleCarta.image += '/low.webp'
            );
        });

        //Esperamos a que se resuelvan todas las promesas en paralelo antes de retornarlas
        return Promise.all(promesasDeCartas);
    }catch(ex){
        throw new Error(`Error al obtener las cartas desde la API: ${ex}`);
    }
}