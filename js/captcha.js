"use strict";

let random; 
document.querySelector('#send').addEventListener("click", verificarFormulario);

generarCaptcha(); 

function generarCaptcha() {
    random = Math.floor(Math.random() * (900000) + 100000);
    document.querySelector('#captcha').innerHTML = random; 
}