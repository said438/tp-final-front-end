import {Pokemon} from "/src/models/objPokemon.js"

export function actualizarEstadisticasPokemon(pokemons){
    /*Como hambas funciones denpenden de la lista de pokemons
    las pongo a hambas en una sola función*/
    mostrarGraficos(pokemons);
    mostararEstadisticasGenerales(pokemons);
}

//Genera y muestra los graficos echos con eChart
export function mostrarGraficos(pokemons){
    //RECORDAR: Hacer que el grafico sea responsive
    const cantidadDeCadaTipoDePokemon = obtenerCantidadDeCadaTipoPokemon(pokemons);
    const tipos = Object.keys(cantidadDeCadaTipoDePokemon);
    const cantidades = Object.values(cantidadDeCadaTipoDePokemon);

    //Inicializar el objeto echart
    let myChart = echarts.init(document.getElementById("grafico-barras"));

    //Especificar los datos
    let option = {
        title: {
            text: 'Cantidad de tipos de pokemon'
        },
        tooltip: {},
        legend: {
            data: ['tipos de pokemon']
        },
        xAxis: {
            data: tipos
        },
        yAxis: {},
        series: [
            {
                name: 'tipo de pokemon',
                type: 'bar',
                data: cantidades
            }
        ]
    };

    //muestra el grafico
    myChart.setOption(option);
}

function mostararEstadisticasGenerales(pokemons){
    const tipoMasFrecuente = obtenerTipoPokemonMasFrecuente(pokemons);
    const pesoPromedio = obtenerPromedio(pokemons.map(pokemon => pokemon.peso));
    const alturaPromedio = obtenerPromedio(pokemons.map(pokemon => pokemon.altura));

    document.getElementById("estadisticas-generales").innerHTML = `
        <h2>Estadísticas generales</h2>

        <ul>
            <li>Total de Pokémon cargados: ${pokemons.length}</li>
            <li>Tipo más frecuente: ${tipoMasFrecuente}</li>
            <li>Promedio de peso: ${pesoPromedio}</li>
            <li>Promedio de altura: ${alturaPromedio}</li>
        </ul>
    `
}

//Funciones auxiliares
function obtenerTipoPokemonMasFrecuente(pokemons){
    const cantidadDeCadaTipoDePokemon = obtenerCantidadDeCadaTipoPokemon(pokemons);
    const tipos = Object.keys(cantidadDeCadaTipoDePokemon);
    const cantidades = Object.values(cantidadDeCadaTipoDePokemon);

    let max = 0;
    let tipoMasFrecuente = 0;

    for (let index = 0; index < cantidades.length; index++) {
        if(cantidades[index] > max){
            max = cantidades[index];
            tipoMasFrecuente = tipos[index];
        }
    }

    return tipoMasFrecuente;
}

function obtenerCantidadDeCadaTipoPokemon(pokemons){
    const contador = 0;

    /*Objeto que almacena y lleva la cuenta de cada tipo*/
    function TiposPokemons(){}

    //Hace la operación de conteo de los tipos de cada pokemon
    pokemons.map(pokemon =>{
        //Un mismo pokemon puede ser de varios tipos
        pokemon.tipos.map(tipo =>{
            if(!(tipo in TiposPokemons)){
                //Agrega el tipo al objeto y lo inicializa en uno
                TiposPokemons[tipo] = 1;
            }else{
                //Le suma uno al tipo que ya agrego anteriormente
                TiposPokemons[tipo]++;
            }
        })
    });

    return TiposPokemons;
}

function obtenerPromedio(array){
    let suma = 0;
    array.forEach(elemento => {
        suma += elemento
    })

    return (suma/array.length);
}

