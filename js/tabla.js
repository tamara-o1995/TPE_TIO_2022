document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() { 
    "use strict";

    const url = "https://62ae2c6c645d00a28a0597f1.mockapi.io/api/v1/alumnos";
    let promo = "Kundalini Yoga"; 
    let page = 1;
    let aviso = document.querySelector("#aviso");
    aviso.innerHTML="";
    mostrarTabla();


}