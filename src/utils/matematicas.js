export function calcularPromedio(array){
    let suma = 0;
    
    array.forEach(elemento => {
        suma += elemento
    })

    return suma / array.length;
}