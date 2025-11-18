import { initializeApp } from "https://www.gstatic.com/firebasejs/x.y.z/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/x.y.z/firebase-database.js";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const saveVote = async (productID) => {
    try {
        // i. Obtener una referencia a la colección 'votes'
        const votesRef = ref(db, 'votes');
        
        // ii. Crear una nueva referencia única para el voto (simulando un nuevo usuario) con push()
        const newVoteRef = push(votesRef); 

        // iii. Define los datos a guardar (productID y la fecha actual)
        const voteData = {
            product: productID,
            timestamp: new Date().toISOString() // Almacena la fecha y hora actual como string ISO
        };

        // iii. Guarda los datos en la base de datos con set(). Esto devuelve una Promesa.
        await set(newVoteRef, voteData);

        // iv. Si set() tiene éxito (la promesa se resuelve)
        return {
            status: 'success',
            message: `Voto guardado con éxito para el producto ID: ${productID}.`
        };

    } catch (error) {
        // iv. Si set() falla (la promesa se rechaza)
        console.error("Error al guardar el voto en Firebase:", error);
        return {
            status: 'error',
            message: `Error al guardar el voto: ${error.message}`
        };
    }
};

const getVotes = async () => {
    try {
        // i. Obtenga una referencia a la colección 'votes' de la base de datos
        const votesRef = ref(db, 'votes');

        // ii. Utilice la función get para esperar por los datos de la colección
        const snapshot = await get(votesRef);

        // iii. Si existen datos, retorne el estado y los datos
        if (snapshot.exists()) {
            return {
                status: 'success',
                data: snapshot.val() // Utiliza val() para obtener el objeto JavaScript de los datos
            };
        } else {
            // Si no existen datos
            return {
                status: 'empty',
                message: 'No se encontraron votos en la base de datos.'
            };
        }
    } catch (error) {
        // Manejo de errores de la promesa
        console.error("Error al obtener los votos de Firebase:", error);
        return {
            status: 'error',
            message: `Error al leer los datos: ${error.message}`
        };
    }
};


export {
    db, set, push, ref, get, child,
    saveVote, getVotes
};