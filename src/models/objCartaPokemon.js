export function CartaPokemon(id, nombre, rareza, urlImagen){
    this.id = id;
    this.nombre = nombre;
    this.rareza = rareza;
    this.urlImagen = urlImagen;
}

//Todas las instancias de CartaPokemon llamaran al Objeto padre "prototype" para imprimirse
//!!!ahorrando espacio en memoria!!!
CartaPokemon.prototype.toString = function(){
    return `
        id: ${this.id}
        nombre: ${this.nombre}
        rareza: ${this.rareza}
        urlImagen: ${this.urlImagen}
    `
};