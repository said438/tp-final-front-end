document.getElementById("btn-enviar").addEventListener("click", (event) => {
    event.preventDefault(); // -> Evita que se recargue la pagina al hacer click al boton "Enviar"



}

function campoNombreCompletoEsValido(regex, input, mensajeDeError){
    formatoEsValido(input, regex, mensajeDeError);

    /*Hacer: No se puede ejecutar la funcion formatoDelCampoEsValido()
    sin que campoEstaVacio() de false primero*/
    const campoVacio = campoEstaVacio(input); //tiene que dar false
    const formatoValido = formatoDelCampoEsValido(input, regex, mensajeDeError); //tiene que dar true
    

    if(formatoValido && campoVacio === false){
        
    }
}

function formatoDelCampoEsValido(input, regex, mensajeDeError){
    const textoAValidar = input.value.trim();

    if(regex.test(textoAValidar)){
        ocultarErrorDeFormato(input);
        return true
    }else{
        mostrarErrorDeFormato(input, mensajeDeError);
        return false;
    }
}

function campoEstaVacio(input){
    const textoAValidarEstaVacio = input.value.trim() === "";

    if(textoAValidarEstaVacio){
        mostrarIndicacionDeCampoObligatorio(input);
        return false;
    }

    ocultarIndicacionDeCampoObligatorio(input);
    return true;
}



/*
document.getElementById("btn-enviar").addEventListener("click", (event) => {
    event.preventDefault(); // -> Evita que se recargue la pagina al hacer click al boton "Enviar"

    //Validar si los campos estan Vacios
    const camposValidos =
    campoEsValido(
        /^[A-Z][a-z]{3,15} [A-Z][a-z]{3,15}$/,
        document.getElementById("nombre-completo"),
        `Error: Ingrese solo el nombre y el apellido presione el boton "Enviar" nuevamente.`
    );
    campoEsValido(
        //Regex: Valida un correo electronico.
        /^[A-Za-z0-9_]{5,30}@(gmail|hotmail|outlook)\.(com|ar|net)$/,
        document.getElementById("correo"),
        `Error: Ingrese un correo valido y presione el boton "Enviar" nuevamente.`
    );
    campoEsValido(
        //Regex: Valida que sea un numero de telefono de Argentina
        /^\+549[0-9]{10}$/,
        document.getElementById("telefono"),
        `Error: Ingrese un numero de telefono valido para la republica Argentina(+54).`
    );
    campoEsValido(regex, input, mensajeDeError);

    validarSiCampoEstaVacio(document.getElementById("nombre-completo"));
    validarSiCampoEstaVacio(document.getElementById("correo"));
    validarSiCampoEstaVacio(document.getElementById("telefono"));
    validarSiCampoEstaVacio(document.getElementById("mensaje"));


    console.log(campoVacio !== true);
    
        //Validar si hay error de formato en algun campo
        validarFormatoDelCampo(
            //Regex: Valida que se ingrese un nombre completo (sin incluir el segundo nombre).
            
        );

        validarFormatoDelCampo(
            
        );

        validarFormatoDelCampo(
            
        );
    }

    if(errorDeFormato === false || campoVacio === false){
        const formulario = document.getElementById("formulario-contactos");
        formulario.submit(); // -> Envia el formulario y recarga la pagina al cliquear el btn "Enviar"
    }
);

function campoEsValido(regex, input, mensajeDeError){
    const textoAValidar = input.value.trim();

    if(textoAValidar !== ""){
        mostrarIndicacionCampoObligatorio(input);
        return false;
    }else{
        ocultarCampoObligatorio(input);
    }

    if(regex.test(textoAValidar) === false){
        mostrarErrorDeFormato(input, mensajeDeError);
        return true;
    }else{
        ocultarErrorDeFormato(input);
    }
    
    return true;
}

function mostrarErrorDeFormato(input, mensaje){
    const error = input.parentElement.querySelector(".mensaje-error");
    error.textContent = `${mensaje}`;
}

function ocultarErrorDeFormato(input){
    const error = input.parentElement.querySelector(".mensaje-error");
    error.textContent = "";
}

function mostrarIndicacionCampoObligatorio(input){
    const error = input.parentElement.querySelector(".mensaje-error");
    error.textContent = "Este campo es obligatorio";
}

function ocultarIndicacionCampoObligatorio(input){
    const error = input.parentElement.querySelector(".mensaje-error");
    error.textContent = "";  
}