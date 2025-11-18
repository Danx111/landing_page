"use strict";
// 1. Importa la función saveVote desde js/firebase.js
/*import { saveVote, getVotes } from './firebase.js';

// 2. Implementa la siguiente funcionalidad:

// a. Define la función flecha enableForm (antes de la función de autoejecución)
const enableForm = () => {
    // b. Obtenga una referencia al formulario HTML con el identificador 'form_voting'
    const votingForm = document.getElementById('form_voting');

    // Verifica que el formulario exista antes de intentar agregar el listener
    if (votingForm) {
        // c. Utilice addEventListener para el evento 'submit'
        votingForm.addEventListener('submit', async (e) => {
            // c.i. Use preventDefault para prevenir el comportamiento por defecto del formulario
            e.preventDefault();

            // c.ii. Obtenga la referencia al elemento 'select_product' y extraiga el valor
            const selectProduct = document.getElementById('select_product');
            const productID = selectProduct ? selectProduct.value : null;

            if (!productID) {
                alert('Error: Selecciona un producto antes de enviar.');
                return;
            }

            // c.iii. Llama a la función saveVote con el valor obtenido del campo de texto.
            // Maneja la promesa y muestra el resultado con un mensaje de alerta.
            try {
                const result = await saveVote(productID);
                alert(`${result.status.toUpperCase()}: ${result.message}`);
                
                // Opcional: Reinicia el formulario después de un éxito
                if (result.status === 'success') {
                    votingForm.reset();
                }
            } catch (error) {
                alert(`ERROR FATAL: No se pudo conectar con Firebase. Detalle: ${error.message}`);
            }
        });
    } else {
        console.error("El formulario con ID 'form_voting' no se encontró en el DOM.");
    }
};

const displayVotes = async () => {
    // b. Dentro de la función, usa la función getVotes y espera por los votos.
    const resultElement = document.getElementById('results');
    
    // Limpia el contenido previo
    if (resultElement) {
        resultElement.innerHTML = '<h2>Cargando resultados...</h2>';
    }

    const voteResult = await getVotes();

    if (voteResult.status === 'success') {
        const votes = voteResult.data; // Objeto de votos (e.g., {key1: {product: 'A', ...}, key2: {...}})
        
        // c. Iterar sobre los votos obtenidos y crear una tabla

        // 1. Contar el total de votos por producto
        const productCounts = {};
        for (const key in votes) {
            if (votes.hasOwnProperty(key)) {
                const product = votes[key].product;
                productCounts[product] = (productCounts[product] || 0) + 1;
            }
        }
        
        // 2. Construir la tabla
        let tableHTML = '<h2>Resultados de Votación</h2>';
        tableHTML += '<table>';
        tableHTML += '<thead><tr><th>Producto Votado</th><th>Total de Votos</th></tr></thead>';
        tableHTML += '<tbody>';

        for (const productID in productCounts) {
            if (productCounts.hasOwnProperty(productID)) {
                tableHTML += `
                    <tr>
                        <td>${productID}</td>
                        <td>${productCounts[productID]}</td>
                    </tr>
                `;
            }
        }

        tableHTML += '</tbody></table>';

        // d. Insertar la tabla en el elemento HTML con el identificador 'results'.
        if (resultElement) {
            resultElement.innerHTML = tableHTML;
        }

    } else if (voteResult.status === 'empty') {
        if (resultElement) {
            resultElement.innerHTML = `<h2>Resultados de Votación</h2><p>${voteResult.message}</p>`;
        }
    } else {
        // Manejo de error
        if (resultElement) {
            resultElement.innerHTML = `<h2>Error al Cargar Resultados</h2><p>${voteResult.message}</p>`;
        }
    }
};


(() => {
    enableForm();
    displayVotes();
})();
*/
let formatter = new Intl.NumberFormat($locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

let card_producto = `<div class="flex  rounded-xl shadow-lg overflow-hidden">
                    <img src="src/imagenes/menu/chesscake1.jpg" alt="Cheesecake" class="w-1/3 h-40 object-cover">
                    <div class="p-4 w-2/3 text-white">
                        <div class="menu-item-content">
                            <p class="producto">Cheesecake</p>
                            <p class="descripcion">Nuestro postre estrella: cremoso, suave y hecho en casa.
                            </p>
                            <div class="price">$3.00</div>
                        </div>
                    </div>
                </div>`

async function cargarProductos() {
    const url = 'public/menu_data.json';
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

function mostrarCanciones(lista){
    const contenedor = document.querySelector("#menu-contenedor"); // asegúrate que en el HTML exista .songs-grid
    if(!contenedor) return;
    contenedor.innerHTML = "";
    for (const producto of lista){
        const div = document.createElement("div");
        div.className = "flex  rounded-xl shadow-lg overflow-hidden";
        div.innerHTML = `<img src="src/imagenes/menu/chesscake1.jpg" alt="Cheesecake" class="w-1/3 h-40 object-cover">
                    <div class="p-4 w-2/3 text-white">
                        <div class="menu-item-content">
                            <p class="producto">Cheesecake</p>
                            <p class="descripcion">Nuestro postre estrella: cremoso, suave y hecho en casa.
                            </p>
                            <div class="price">$3.00</div>
                        </div>
                    </div>`
        article.className = "song-card";
       
    }
}