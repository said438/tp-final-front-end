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
            //estructuras de datos
            pokemons: [],
            tiposDePokemons: [],
            //inputs
            textoDeBusqueda: '',
            tipoDePokemonSeleccionado: 'Todos',
            //Banderas de estados de la API
            cargandoDatosIniciales: false,
            errorDatosIniciales: null,
            cargandoObtenerMasPokemons: false,
            errorObtenerMasPokemons: null,

            //Manejo de paginación de la API
            //Cantidad de veces que se busco pokemons de la Api 
            cantidadPeticionesApi: 2,
            //Cantidad de pokemons que se obtienen en cada llamada a la Api
            rangoPokemon: 20
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

            console.log(`Lista de pokemons filtrados: ${pokemonsFiltrados}`);
            
            return pokemonsFiltrados;
        },

        contadorPokemons(){
            return this.pokemonsFiltrados.length;
        },

        //Limite inferior del Id del pokemon a obtener (desde)
        idPokemonInferior(){
            return (this.cantidadPeticionesApi - 1) * this.rangoPokemon + 1;
        },

        //Limite superior del Id del pokemon a obtener (hasta)
        idPokemonSuperior(){
            return this.cantidadPeticionesApi * this.rangoPokemon;
        },
    },

    methods: {
        async cargarDatosIniciales(){
            this.cargandoDatosIniciales = true;

            try{
                //Resolvemos las dos promesas simultaneamente
                const tareasAsincronas = [obtenerPokemons(), obtenerTiposDePokemons()];
                const resultados = await Promise.all(tareasAsincronas);

                this.pokemons = resultados[0];
                this.tiposDePokemons = resultados[1];
            } catch (ex) {
                this.errorDatosIniciales = ex.message;
                console.log(`Ocurrio una excepción al cargar los datos iniciales: ${ex.message}`);
            } finally {
                this.cargandoDatosIniciales = false;
            }
        },

        async cargarMasPokemons(){
            this.cargandoObtenerMasPokemons = true;
            this.errorObtenerMasPokemons = null;

            try{
                const nuevosPokemons = await obtenerPokemons(this.idPokemonInferior, this.idPokemonSuperior);
                this.pokemons.push(...nuevosPokemons);
                this.cantidadPeticionesApi += 1;
            }catch(ex){
                this.error = ex;
                console.log(`Ocurrio una excepción al cargar más pokemons: ${ex.message}`);
            }finally{
                this.cargandoObtenerMasPokemons = false;
            }
        }
    },

    created(){
        this.cargarDatosIniciales();
    }
}).mount('#busqueda-pokemons')

