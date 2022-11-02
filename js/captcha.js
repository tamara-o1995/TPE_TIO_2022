document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {

    "use strict";

    let random; 
    document.querySelector('#send').addEventListener("click", verificarFormulario);

    generarCaptcha(); 

    function generarCaptcha() {
        random = Math.floor(Math.random() * (900000) + 100000);
        document.querySelector('#captcha').innerHTML = random; 
    }

    function verificarFormulario(event) {
        event.preventDefault()

        let error = 0;
        let name = document.querySelector('#name');
        let lastName = document.querySelector('#lastName');
        let email = document.querySelector('#email');
        let query = document.querySelector('#query');
        let msg = document.querySelector('#msg');
        let age = document.querySelector('#age');
        let adress = document.querySelector('#adress');
        let type = document.querySelector('#type');
        let msgSend = document.querySelector('#msgSend');
        let captchaInput = document.querySelector('#captchaInput');
        msgSend.innerHTML = ''; 

        if (name.value == "") {
            name.classList.add("error");
            error = 1;
        } else { 
            name.classList.remove("error");
        }
        if (lastName.value == "") {
            lastName.classList.add("error");
            error = 1;
        } else {
            lastName.classList.remove("error");
        }
        if (email.value == "") {
            email.classList.add("error");
            error = 1;
        } else {
            email.classList.remove("error");
        }
        if (query.value == "") {
            query.classList.add("error");
            error = 1;
        } else {
            query.classList.remove("error");
        }

        if (error == 1) { 
            generarCaptcha();
            msg.innerHTML = "Campos incompletos";
        }
        else if (captchaInput.value != random) { 

            name.classList.remove("error");
            lastName.classList.remove("error");
            email.classList.remove("error");
            query.classList.remove("error");
            captchaInput.classList.add("error");
            msg.innerHTML = "Captcha incorrecto";
            generarCaptcha();
        } else {
            name.classList.remove("error");
            lastName.classList.remove("error");
            email.classList.remove("error");
            query.classList.remove("error");
            captchaInput.classList.remove("error");
            name.value = '';
            lastName.value = '';
            email.value = '';
            query.value = '';
            captchaInput.value = '';
            msg.innerHTML = '';
            age.value = '';
            adress.value = '';
            type.value = '';
            msgSend.innerHTML = "¡Gracias por su consulta!";
            generarCaptcha();
        }
    }
}