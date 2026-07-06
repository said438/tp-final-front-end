document.getElementById("btn-enviar").addEventListener("click", (event) => {
    event.preventDefault(); // -> Evita que se recargue la pagina al hacer click al boton "Enviar"

    if(
        campoNombreCompletoEsValido() &&
        campoCorreoEsValido() &&
        campoTelefonoEsValido() &&
        campoMensajeEsValido()
    ){
        document.getElementById("formulario-contactos").submit();
        console.log("Formulario enviado");
    }
});

//Funciones de validación principales
function campoNombreCompletoEsValido(){
    //Regex: Valida un nombre completo.
    const regex = /^[A-Z][a-z]{3,15} [A-Z][a-z]{3,15}$/; 
    const input = document.getElementById("nombre-completo");
    const mensajeDeError = `
        Campo invalido: Ingrese solo el nombre, el apellido y presione el boton "Enviar" nuevamente.
    `;
    const textoAValidar = input.value.trim();

    //Si el campo esta vacio
    if(input.value.trim() === ""){
        indicarQueElCampoEsObligatorio(input);
        return false;
    }

    ocultarQueElCampoEsObligatorio(input);

    //Si el formato del texto ingresado es invalido
    if(!regex.test(textoAValidar)){
        mostrarErrorDeFormato(input, mensajeDeError);
        return false;
    }

    ocultarErrorDeFormato(input);
    return true;
}

function campoCorreoEsValido(){
    //Regex: Valida un correo electronico.
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const input = document.getElementById("correo");
    const mensajeDeError = `
        Campo invalido: Ingrese un correo valido y presione el boton "Enviar" nuevamente.
    `;
    const textoAValidar = input.value.trim();

    //Si el campo esta vacio
    if(input.value.trim() === ""){
        indicarQueElCampoEsObligatorio(input);
        return false;
    }

    ocultarQueElCampoEsObligatorio(input);

    //Si el formato del texto ingresado es invalido
    if(!regex.test(textoAValidar)){
        mostrarErrorDeFormato(input, mensajeDeError);
        return false;
    }

    ocultarErrorDeFormato(input);
    return true;
}

//El campo de telefono es opcional
function campoTelefonoEsValido(){
    //Regex: Valida que solo se ingresen posibles numeros de telefono
    const regex = /^(\+)?[0-9]+$/;
    const input = document.getElementById("telefono");
    const mensajeDeError = `
        Campo invalido: Ingrese un numero de telefono valido. y presione el boton "Enviar" nuevamente.
    `;
    const textoAValidar = input.value.trim();

    //Si el formato del texto ingresado es invalido
    if(!regex.test(textoAValidar)){
        mostrarErrorDeFormato(input, mensajeDeError);
        return false;
    }

    ocultarErrorDeFormato(input);
    return true;
}

function campoMensajeEsValido(){
    //Regex: Valida un correo electronico.
    const input = document.getElementById("mensaje");
    const textoAValidar = input.value.trim();

    //Si el campo esta vacio
    if(input.value.trim() === ""){
        indicarQueElCampoEsObligatorio(input);
        return false;
    }

    ocultarQueElCampoEsObligatorio(input);
    return true;
}

//Funciones auxiliares para enviarle feedback al usuario
function mostrarErrorDeFormato(input, mensaje){
    const error = input.parentElement.querySelector(".mensaje-error");
    error.textContent = `${mensaje}`;
}

function ocultarErrorDeFormato(input){
    const error = input.parentElement.querySelector(".mensaje-error");
    error.textContent = "";
}

function indicarQueElCampoEsObligatorio(input){
    const error = input.parentElement.querySelector(".mensaje-error");
    error.textContent = "Este campo es obligatorio";
}

function ocultarQueElCampoEsObligatorio(input){
    const error = input.parentElement.querySelector(".mensaje-error");
    error.textContent = "";  
}