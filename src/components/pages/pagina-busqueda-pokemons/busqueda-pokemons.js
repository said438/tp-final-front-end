import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {Pokemon} from '/src/models/objPokemon.js'
import {obtenerPokemons, obtenerTiposDePokemons} from '/src/services/pokeApi.js'
import componenteGrafico from './componente-grafico.js'
import componenteEstadistica from './componente-estadistica.js'

const appBusquedaPokemons = createApp({
    components:{
        componenteGrafico,
        componenteEstadistica
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
        },

        //Este componente nunca usa este metodo, solo se los pasa a sus componentes hijos.
        obtenerCantidadesDeTiposDePokemons(pokemons){
            const contador = 0;

            //Objeto que almacena y lleva la cuenta de cada tipo
            function TiposPokemons(){}

            //Hace la operación de conteo
            pokemons.map(pokemon =>{
                pokemon.tipos.map(tipo =>{
                    if(!(tipo in TiposPokemons)){
                        TiposPokemons[tipo] = 1;
                    }else{
                        TiposPokemons[tipo] += 1;
                    }
                })
            });

            return TiposPokemons;
        },
    },

    created(){
        this.cargarDatosIniciales();
    }
}).mount('#app')

