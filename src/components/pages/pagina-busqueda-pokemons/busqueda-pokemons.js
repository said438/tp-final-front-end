import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import modalPokemon from './modal-pokemon.js'
import contadorPokemons from './contador-pokemons.js'
import {Pokemon} from '/src/models/objPokemon.js'

createApp({

    components:{
        modalPokemon
    },

    data(){
        return {
            pokemons: [],
            cargando: false,
            error: null,
            contadorPokemons: 0,
            textoDeBusqueda: '',
            pokemonsEncontrados: []
        }
    },

    methods: {
        async obtenerPokemons(){
            this.cargando = false
            this.error = null

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
                        detallePokemon.sprites.front_default
                    );
                });

                this.pokemons = await Promise.all(promesas);
                console.log(`pokemons solicitado por la API: ${this.pokemons}`);
                this.contadorPokemons = this.pokemons.length;
            }catch(ex){
                this.error = ex.message || 'Ocurrio un error'
                console.log(this.error);
                console.log("Error al obtener los pokemones");
                console.log(ex);
            }finally{
                this.cargando = false;
            }
        },

        buscarPokemonsPorNombre(){
            if(this.textoDeBusqueda.trim() === ''){
                this.pokemonsEncontrados = this.pokemons;
                return;
            }

            this.pokemonsEncontrados = this.pokemons.filter(pokemon => {
                return pokemon.nombre
                    .trim()
                    .toLowerCase()
                    .includes(this.textoDeBusqueda.toLowerCase());
            });
        }
    },

    async created(){
        this.obtenerPokemons();
    },

    watch: {
        pokemons(pokemonsNuevos, pokemonsViejos){
            this.pokemonsEncontrados = pokemonsNuevos;
            console.log(`Se ha ejecutado el watch: ${this.pokemonsEncontrados} ${this.pokemon}` );
        }
    }

}).mount('#busqueda-pokemons')

