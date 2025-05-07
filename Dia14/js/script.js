document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'https://6818a31e5a4b07b9d1d01ad4.mockapi.io/api/v1/prb';
    const formulario = document.querySelector('form');
    const nuevoBtn = document.getElementById('nuevo');
    const cancelarBtn = document.getElementById('cancelar');
    const guardarBtn = document.getElementById('guardar');
    const campos = {
        nombrePersonaje: document.getElementById('nombre-personaje'),
        nombreActor: document.getElementById('nombreactor'),
        edadActor: document.getElementById('edadactor'),
        ubicacion: document.getElementById('ubicacion'),
        poster: document.getElementById('poster'),
        fecha: document.getElementById('fecha'),
        productora: document.getElementById('productora')
    };

    // Variable para el héroe que se está editando 
    let editando = false;
    let heroeId = null;

    // Función para obtener los héroes 
    async function obtenerHeroes() {
        const respuesta = await fetch(API_URL);
        const heroes = await respuesta.json();
        return heroes;
    }

    // Función para mostrar héroes 
    async function mostrarHeroes() {
        const heroes = await obtenerHeroes();
        console.log(heroes); 
    }

    // Función para guardar/actualizar héroe 
    async function guardarHeroe(event) {
        event.preventDefault();
        const heroeData = {
            nombrePersonaje: campos.nombrePersonaje.value,
            nombreActor: campos.nombreActor.value,
            edadActor: campos.edadActor.value,
            ubicacion: campos.ubicacion.value,
            poster: campos.poster.value,
            fecha: campos.fecha.value,
            productora: campos.productora.value
        };

        if (editando) {
            // Actualizar héroe 
            await fetch(`${API_URL}/${heroeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(heroeData)
            });
        } else {
            // Crear nuevo heroe 
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(heroeData)
            });
        }

        // Limpiar y actualizar 
        limpiarFormulario();
        await mostrarHeroes();
    }

    // Función para eliminar héroe 
    async function eliminarHeroe(id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        await mostrarHeroes();
    }

    // Función para editar héroe 
    async function editarHeroe(id) {
        const respuesta = await fetch(`${API_URL}/${id}`);
        const heroe = await respuesta.json();
        
        // Rellenar formulario
        campos.nombrePersonaje.value = heroe.nombrePersonaje;
        campos.nombreActor.value = heroe.nombreActor;
        campos.edadActor.value = heroe.edadActor;
        campos.ubicacion.value = heroe.ubicacion;
        campos.poster.value = heroe.poster;
        campos.fecha.value = heroe.fecha;
        campos.productora.value = heroe.productora;
        
        // Establecer que estamos editando
        editando = true;
        heroeId = id;
    }

    // Función para limpiar formulario 
    function limpiarFormulario() {
        formulario.reset();
        editando = false;
        heroeId = null;
    }
    guardarBtn.addEventListener('click', guardarHeroe);
    cancelarBtn.addEventListener('click', limpiarFormulario);
    nuevoBtn.addEventListener('click', limpiarFormulario);

    mostrarHeroes();
});