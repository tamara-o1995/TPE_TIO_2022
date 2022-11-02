document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() { 
    "use strict";

    const url = "https://62ae2c6c645d00a28a0597f1.mockapi.io/api/v1/alumnos";
    let promo = "Kundalini Yoga"; 
    let page = 1;
    let aviso = document.querySelector("#aviso");
    aviso.innerHTML="";
    mostrarTabla();

    document.querySelector("#selectFiltro").addEventListener("click", filtrar);
    document.querySelector("#add").addEventListener("click", agregar);
    document.querySelector("#add_more").addEventListener("click", agregarVarios);

    async function agregar(event) {
        event.preventDefault();
        try {
            let alumno = {
                "thing": {
                    "alumno": document.querySelector("#alumno").value,
                    "actividad": document.querySelector("#actividad").value,
                    "telefono": document.querySelector("#telefono").value,
                    "email": document.querySelector("#email").value
                }
            };
            if (alumno.thing.actividad && alumno.thing.alumno && alumno.thing.telefono && alumno.thing.email != "") {
                let response = await fetch(url, {
                    "method": "POST",
                    "mode": 'cors',
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify(alumno) 
                });
                console.log(response);
                if (!response.ok) {
                    aviso.innerHTML = "Error"; 
                } else {
                    mostrarTabla();
                    aviso.innerHTML = "Se agregó con éxito"; 
                };
            }
            else {
                aviso.innerHTML = "Campos Incompletos"; 
            }
        } catch (response) {
            aviso.innerHTML = "Sin Conexión";  
        }
    }

    function agregarVarios(event) {
        event.preventDefault();
        let varios = document.querySelector("#cantidad").value;
        for (let i = 0; i < varios; i++) {
            agregar(event);
        }
        mostrarTabla();
    }

    function filtrar() {
        let filtro = document.querySelector("#selectFiltro");
        let filas = document.querySelectorAll("#table_body tr");

        for (let i = 0; i < filas.length; i++) {

            if (filtro.value === "conDescuento") {

                if (filas[i].classList.contains('resaltar')) {
                    filas[i].classList.remove("ocultarFila");
                }
                else {
                    filas[i].classList.add("ocultarFila");
                }
            }
            else if (filtro.value === "sinDescuento") {

                if (filas[i].classList.contains('resaltar')) {
                    filas[i].classList.add("ocultarFila");
                }
                else {
                    filas[i].classList.remove("ocultarFila");
                }
            }
            else if (filtro.value === "tablaCompleta") {
                filas[i].classList.remove("ocultarFila");
            }
        }
    }

    document.querySelector("#prev").addEventListener("click", anterior);
    document.querySelector("#next").addEventListener("click", siguiente);

    function anterior() {
        page--;
        mostrarTabla();
    }

    function siguiente() {
        page++;
        mostrarTabla();
    }
    
    async function mostrarTabla() {       
        let tabla = document.querySelector("#table_body");
        document.querySelector("#aviso").innerHTML = "";  
        try {
            let response = await fetch(url + "?page=" + page + "&limit=10");
            let json = await response.json();
           
            if (!response.ok) {
                console.log("Error");
            } else {
                if (page > 1) {
                    document.querySelector("#prev").classList.remove("ocultar");
                } else {
                    document.querySelector("#prev").classList.add("ocultar");
                }
                if (json.length >= 10) {
                    document.querySelector("#next").classList.remove("ocultar");
                } else {
                    document.querySelector("#next").classList.add("ocultar");
                }

                tabla.innerHTML = ""; 
                for (let dato of json) {
                    let act = dato.thing.actividad;
                    let tr;
                    if (act == promo) {
                        tr = `<tr class="resaltar">`;
                    } else {
                        tr = `<tr>`;
                    }
                    tabla.innerHTML +=
                        `${tr}
                                <td>${dato.thing.alumno}</td>
                                <td>${dato.thing.actividad}</td>
                                <td>${dato.thing.telefono}</td>   
                                <td class="emailMobile">${dato.thing.email}</td>
                                <td><button class="btnEditar" data-id= ${dato.id}><img src="images/edit.png" /></button></td>
                                <td><button class="btnBorrar" data-id= ${dato.id}><img src="images/delete.png" /></button></td>
                            </tr>`
                }
                obtener_IdBotonBorrar();
                obtener_IdBotonEditar();
                filtrar();
            }
        } catch (response) {
            console.log(response);
        };
    
    }

    function obtener_IdBotonEditar() {
        let botones = document.querySelectorAll(".btnEditar");
        for (let boton of botones) {
            boton.addEventListener("click", function () {
                let id = boton.dataset.id;
                editar(id);
            });
        }
    }

    async function editar(id) {
        try {
            let alumno = {
                "thing": {
                    "alumno": document.querySelector("#alumno").value,
                    "actividad": document.querySelector("#actividad").value,
                    "telefono": document.querySelector("#telefono").value,
                    "email": document.querySelector("#email").value
                }
            }

            if (alumno.thing.actividad && alumno.thing.alumno && alumno.thing.telefono && alumno.thing.email != "") {
                let response = await fetch(url + "/" + id, {
                    "method": "PUT",
                    "mode": "cors",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify(alumno)
                });
                if (!response.ok) {
                    aviso.innerHTML = "Error";
                } else {
                    mostrarTabla();
                    aviso.innerHTML = "Se editó con éxito";
                }
            }
        } catch (response) {
            aviso.innerHTML = "Sin conexión";
        }
    }
    
    function obtener_IdBotonBorrar() {
        let botones = document.querySelectorAll(".btnBorrar");
        for (let boton of botones) {
            boton.addEventListener("click", function () {
                let id = boton.dataset.id;
                borrar(id);
            });
        }
    }
    async function borrar(id) {
        try {
            let response = await fetch(url + "/" + id, {
                method: "DELETE",
                mode: "cors"
            });
            if (!response.ok) {
                aviso.innerHTML = "Error";
            } else {
                mostrarTabla();
                aviso.innerHTML = "Se borró con éxito";
            }
        } catch (response) {
            aviso.innerHTML = "Sin conexión";
        }
    }

    
}