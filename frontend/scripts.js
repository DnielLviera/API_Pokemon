// Escuchar el evento click del botón "Buscar Pokemon"
document.getElementById("buscar").addEventListener("click", function () {
    try{
        const idPokemon = parseInt(document
            .getElementById("entrada")
            .value.trim());
        const nombrePokemon = document
            .getElementById("entrada")
            .value.trim()
            .toLowerCase();
        if (idPokemon) {
            buscarPokemonId(idPokemon); // Llama a la función para buscar el Pokémon
        } else if (nombrePokemon) {
            buscarPokemon(nombrePokemon); // Llama a la función para buscar el Pokémon
        } else {
            alert("Por favor, ingresa el nombre o id de un Pokémon.");
        }
    } catch (error) {
        alert("Hubo un error al cargar los datos.");
    }
});

async function agregarPokemon() {
    try {
        const nombre = document.getElementById("nombre").value.trim().toLowerCase();
        const id = document.getElementById("id").value;
        const types = document.getElementById("tipo1").value.split(",").map((tipo) => tipo.trim());
        const sprite = document.getElementById("imagen").value;

        const datosPokemon = {
            id: parseInt(id),
            name: nombre,
            types: types,
            sprite: sprite,
        };

        const response = await fetch("http://localhost:3000/api/pokemon/agregar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosPokemon),
        });

        if (response.ok) {
            alert("Pokémon agregado correctamente");
            // Limpiar campos después de agregar
            document.getElementById("nombre").value = "";
            document.getElementById("id").value = "";
            document.getElementById("tipo1").value = "";
            document.getElementById("imagen").value = "";
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || 'No se pudo agregar el Pokémon'}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al agregar el Pokémon");
    }
}


async function eliminarPokemon() {
    try {
        const nombre = document.getElementById('entrada').value.trim().toLowerCase();
        
        const response = await fetch(`http://localhost:3000/api/pokemon/delete/${nombre}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert("Pokémon eliminado correctamente");
            document.getElementById('entrada').value = "";
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || 'No se pudo eliminar el Pokémon'}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al eliminar el Pokémon");
    }
}

async function updatePokemon() {
    try {
        const nombreViejo = document.getElementById("entrada").value.trim().toLowerCase();
        const nombre = document.getElementById("nombre").value.trim().toLowerCase();
        const id = document.getElementById("id").value;
        const types = document.getElementById("tipo1").value.split(",").map((tipo) => tipo.trim());
        const sprite = document.getElementById("imagen").value;

        const datosPokemon = {
            id: parseInt(id),
            name: nombre,
            types: types,
            sprite: sprite,
        };

        const response = await fetch(`http://localhost:3000/api/pokemon/update/${nombreViejo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosPokemon),
        });

        if (response.ok) {
            alert("Pokémon actualizado correctamente");
            // Limpiar campos después de actualizar
            document.getElementById("entrada").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("id").value = "";
            document.getElementById("tipo1").value = "";
            document.getElementById("imagen").value = "";
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || 'No se pudo actualizar el Pokémon'}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al actualizar el Pokémon");
    }
}


// Función para buscar un Pokémon por nombre
async function buscarPokemon(nombre) {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/pokemon/${nombre}`);
        
        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.error || "Pokémon no encontrado");
        }
        
        const datos = await respuesta.json();

        // Mostrar el nombre del Pokémon
        document.getElementById("nombre_pokemon").textContent = datos.name.toUpperCase();

        // Mostrar el id del pokemon
        document.getElementById("id_pokemon").textContent = `ID: ${datos.id}`;

        // Mostrar la imagen del Pokémon
        const imagenPokemon = document.getElementById("imagen_pokemon");
        imagenPokemon.src = datos.sprite;
        imagenPokemon.alt = datos.name;

        // Mostrar los tipos del Pokémon
        const tipoPokemon = document.getElementById("tipos");
        tipoPokemon.innerHTML = "";

        datos.types.forEach((tipo) => {
            const tipo_texto = document.createElement("div");
            tipo_texto.textContent = tipo.toUpperCase();
            tipo_texto.classList.add(`tipo-${tipo.toLowerCase()}`);
            tipoPokemon.appendChild(tipo_texto);
        });
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("nombre_pokemon").textContent = error.message;
        document.getElementById("id_pokemon").textContent = "";
        document.getElementById("imagen_pokemon").src = "img/silueta.png";
        document.getElementById("tipos").innerHTML = `
            <div class="silueta"></div>
            <div class="silueta"></div>
        `;
    }
}


async function buscarPokemonId(id) {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/pokemon/id/${id}`);
        
        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.error || "Pokémon no encontrado");
        }
        
        const datos = await respuesta.json();

        // Mostrar el nombre del Pokémon
        document.getElementById("nombre_pokemon").textContent = datos.name.toUpperCase();

        // Mostrar el id del pokemon
        document.getElementById("id_pokemon").textContent = `ID: ${datos.id}`;

        // Mostrar la imagen del Pokémon
        const imagenPokemon = document.getElementById("imagen_pokemon");
        imagenPokemon.src = datos.sprite;
        imagenPokemon.alt = datos.name;

        // Mostrar los tipos del Pokémon
        const tipoPokemon = document.getElementById("tipos");
        tipoPokemon.innerHTML = "";

        datos.types.forEach((tipo) => {
            const tipo_texto = document.createElement("div");
            tipo_texto.textContent = tipo.toUpperCase();
            tipo_texto.classList.add(`tipo-${tipo.toLowerCase()}`);
            tipoPokemon.appendChild(tipo_texto);
        });
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("nombre_pokemon").textContent = error.message;
        document.getElementById("id_pokemon").textContent = "";
        document.getElementById("imagen_pokemon").src = "img/silueta.png";
        document.getElementById("tipos").innerHTML = `
            <div class="silueta"></div>
            <div class="silueta"></div>
        `;
    }
}