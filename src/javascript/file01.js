"use strict";

const fmtUSD = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

async function cargarProductos() {
    const url = 'https://raw.githubusercontent.com/Danx111/datos/refs/heads/main/datos.json';
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        return datos;
    }
    catch (error) {
        console.error("Error al cargar los productos", error);
    }
}

function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function mostrarProductos(lista) {
    const contenedor = document.querySelector("#menu-contenedor"); // asegúrate que en el HTML exista .songs-grid
    if (!contenedor) return;
    contenedor.innerHTML = "";
    for (const producto of lista) {
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
const form = document.getElementById('orderForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const typeInput = document.getElementById('order-type'); // Campo select del formulario
const messageContainer = document.getElementById('confirmationMessage');
const API_URL_POST = 'https://jsonplaceholder.typicode.com/posts';

form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Detiene la recarga de la página
        const userName = nameInput.value;
        // 1. Recoger todos los datos del formulario en un objeto JSON
        const formData = {
            name: userName,
            email: emailInput.value,
            orderType: typeInput.value,
            message: document.getElementById('message').value, // Campo textarea
            timestamp: new Date().toISOString()
        };
        // 2. Ejecutar la solicitud FETCH con método POST
        try {
            messageContainer.innerHTML = '<p class="text-blue-600">Enviando solicitud...</p>';
            messageContainer.classList.remove('hidden'); 
            form.classList.add('opacity-50', 'pointer-events-none'); // Deshabilita el form mientras envía

            const response = await fetch(API_URL_POST, {
                method: 'POST', // Definimos el método HTTP
                headers: {
                    'Content-Type': 'application/json' // Indicamos que el cuerpo es JSON
                },
                body: JSON.stringify(formData) // Convertimos el objeto a una cadena JSON para el envío
            });
            // 3. Manejar la respuesta del servidor
            if (!response.ok) {
                // Si el estado HTTP no es 200-299, lanzar error.
                throw new Error(`Error HTTP: ${response.status}`);
            }
            // Opcional: Obtener la respuesta (el servidor JSONPlaceholder devuelve el objeto POST + un ID)
            const responseData = await response.json();
            // 4. Mostrar mensaje de éxito (Interacción con el usuario)
            const successMessage = `
                <h4 class="font-bold text-xl mb-2">¡Gracias por suscribirte, ${userName}!</h4>
                <p>Tu solicitud ha sido recibida con éxito (ID de simulación: ${responseData.id || 'N/A'}).</p>
                <p>Te hemos enviado un código de descuento a tu correo.</p>
            `;
            // Actualizar la UI
            messageContainer.classList.remove('bg-green-100', 'bg-red-100');
            messageContainer.classList.add('bg-green-100');
            messageContainer.innerHTML = successMessage;
            form.classList.add('hidden'); // Ocultar el formulario
            
        } catch (error) {
            // 5. Mostrar mensaje de error
            const errorMessage = `<p>Error al enviar la solicitud: ${error.message}. Por favor, inténtalo de nuevo.</p>`;
            messageContainer.classList.remove('bg-green-100', 'bg-red-100');
            messageContainer.classList.add('bg-red-100');
            messageContainer.innerHTML = errorMessage;
            
        } finally {
            // Asegurarse de que el formulario se restaure (si no se ocultó)
            form.classList.remove('opacity-50', 'pointer-events-none');
        }
    });

async function main() {
    const products = await cargarProductos();
    mostrarProductos(products);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    main();
});