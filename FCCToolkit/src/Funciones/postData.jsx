import { BACKEND_URL } from '../Configs/DefaultServer';

export async function postData(route, data) {
    const url = BACKEND_URL + route;
    let formData = new FormData(); // Cambia 'const' a 'let'

    // Comprueba si data es una instancia de FormData
    if (data instanceof FormData) {
        // Si es una instancia de FormData, simplemente la usamos
        formData = data;
    } else {
        // Si no es una instancia de FormData, procedemos como antes
        if (Array.isArray(data.file)) {
            data.file.forEach((file, index) => {
                formData.append('files', file);
            });
        } else {
            formData.append('file', data.file);
        }
        formData.append('message', data.message);
    }

    console.log('URL:', url); // Imprime la URL
    console.log('Files:', data.file); // Imprime los datos del archivo
    console.log('Message:', data.message); // Imprime el mensaje

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log('Response:', jsonResponse); // Imprime la respuesta del servidor

    return jsonResponse;
}