import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import modalPokemon from './modal-pokemon.js'
import {Pokemon} from '/src/models/objPokemon.js'
import {obtenerPokemons, obtenerTiposDePokemons} from '/src/services/api.js'

createApp({

    components:{
        modalPokemon
    },

    data(){
        return {
            pokemons: [],
            tiposDePokemons: [],
            cargando: true,
            error: null,
            textoDeBusqueda: '',
            tipoDePokemonSeleccionado: 'Todos'
        }
    },

    computed: {
        pokemonsFiltrados(){
            //filtra pokemon por nombre
            const coincideNombre = (pokemon) => {
                return pokemon.nombre
                    .trim()
                    .toLowerCase()
                    .includes(this.textoDeBusqueda.toLowerCase());
            };

            //filtra pokemon por tipo
            const coincideTipo = (pokemon) => {
                if(this.tipoDePokemonSeleccionado === 'Todos'){
                    return true
                }

                return pokemon.tipos.includes(this.tipoDePokemonSeleccionado);
            }

            const pokemonsFiltrados = this.pokemons.filter(pokemon => {
                return coincideNombre(pokemon) && coincideTipo(pokemon)
            });

            return pokemonsFiltrados;
        },

        contadorPokemons(){
            return this.pokemonsFiltrados.length;
        },
    },

    methods: {
        async cargarDatosIniciales(){
            try{
                //Resolvemos las dos promesas simultaneamente
                const tareasAsincronas = [obtenerPokemons(), obtenerTiposDePokemons()];
                const resultados = await Promise.all(tareasAsincronas);

                this.pokemons = resultados[0];
                this.tiposDePokemons = resultados[1];
            } catch (ex) {
                this.error = ex.message;
                console.log(`Ocurrio una excepción: ${ex.message}`);
            } finally {
                this.cargando = false;
            }
        }
    },

    created(){
        this.cargarDatosIniciales();
    }
}).mount('#busqueda-pokemons')

