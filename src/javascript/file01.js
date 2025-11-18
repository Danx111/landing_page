"use strict";



const fmtUSD = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });


async function cargarProductos() {
    const url = 'https://raw.githubusercontent.com/Danx111/datos/refs/heads/main/datos.json';
    try{
        const respuesta = await fetch(url);
        if(!respuesta.ok){
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        return datos;
    }
    catch(error){
        console.error("Error al cargar los productos",error);
    }
}

function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function mostrarProductos(lista){
    const contenedor = document.querySelector("#menu-contenedor"); // asegúrate que en el HTML exista .songs-grid
    if(!contenedor) return;
    contenedor.innerHTML = "";
    for (const producto of lista){
        const div = document.createElement("div");
        div.className = "flex  rounded-xl shadow-lg overflow-hidden";
        div.innerHTML = `<img src="${producto.imagen_url}" alt="Cheesecake" class="w-1/3 h-40 object-cover">
                    <div class="p-4 w-2/3 text-white">
                        <div class="menu-item-content">
                            <p class="producto">${escapeHTML(producto.nombre)}</p>
                            <p class="descripcion">${escapeHTML(producto.descripcion)}
                            </p>
                            <div class="price">${fmtUSD.format(escapeHTML(producto.precio))}</div>
                        </div>
                    </div>`
        contenedor.appendChild(div);
    }
}

async function main() {
    const products = await cargarProductos();
    mostrarProductos(products);
}

document.addEventListener("DOMContentLoaded",  () => {
    console.log("DOM fully loaded and parsed");
    main();
});