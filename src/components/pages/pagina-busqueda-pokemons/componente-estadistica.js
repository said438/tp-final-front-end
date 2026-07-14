import {calcularPromedio} from '/src/utils/matematicas.js'

export default {
    name: 'ComponenteEstadistica',

    props: {
        pokemons: {
            type: Array,
            required: true
        },

        obtenerCantidadesDeTiposDePokemons: {
            type: Function,
            required: true
        }
    },

    data(){
        return {
            tipoMasFrecuente: '',
            pesoPromedio: 0,
            alturaPromedio: 0
        }
    },
    
    //Actualiza las estadisticas al cargar más pokemons
    watch:{
        pokemons(nuevosPokemons){
            this.cargarDatos(nuevosPokemons);
        }
    },


    methods: {
        //funciones auxiliares
        obtenerTipoPokemonMasFrecuente(){
            const obtenerTiposDePokemon = this.obtenerCantidadesDeTiposDePokemons(this.pokemons);
            const tipos = Object.keys(obtenerTiposDePokemon);
            const cantidades = Object.values(obtenerTiposDePokemon);

            let max = 0;
            let tipoMasFrecuente = 0;

            for (let index = 0; index < cantidades.length; index++) {
                if(cantidades[index] > max){
                    max = cantidades[index];
                    tipoMasFrecuente = tipos[index];
                }
            }

            return tipoMasFrecuente;
        },

        cargarDatos(pokemons){
            this.tipoMasFrecuente = this.obtenerTipoPokemonMasFrecuente(pokemons);
            this.pesoPromedio = calcularPromedio(pokemons.map(pokemon => pokemon.peso));
            this.alturaPromedio = calcularPromedio(pokemons.map(pokemon => pokemon.altura));
        }
    },

    template: `
        <h2>Estadísticas generales</h2>

        <ul>
            <li>Tipo más frecuente: {{this.tipoMasFrecuente}}</li>
            <li>Promedio de peso: {{this.pesoPromedio}}</li>
            <li>Promedio de altura: {{this.alturaPromedio}}</li>
        </ul>
    `,

    created(){
        this.cargarDatos(this.pokemons);
    }
}