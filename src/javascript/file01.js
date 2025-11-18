"use strict";
// 1. Importa la función saveVote desde js/firebase.js
import { saveVote, getVotes } from './firebase.js';

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


// d. Invoca la función enableForm en la función de autoejecución.
// Función de autoejecución (IIFE - Immediately Invoked Function Expression)
(() => {
    // Se asegura de que la funcionalidad de escucha del formulario se active
    enableForm();
    // Llama a displayVotes para mostrar los votos al cargar la página
    displayVotes();
})();