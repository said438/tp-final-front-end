export function Pokemon(id, nombre, altura, peso, tipos, urlImagen){
    this.id = id;
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.tipos = tipos;
    this.urlImagen = urlImagen;
}

//Todas las instancias de Pokemon llamaran al Objeto padre "prototype" para imprimirse
//!!!ahorrando espacio en memoria!!!
Pokemon.prototype.toString = function(){
    return `
        id: ${this.id}
        nombre: ${this.nombre}
        altura: ${this.altura}
        peso: ${this.peso}
        tipos: ${this.tipos}
        urlImagen: ${this.urlImagen}
    `
};