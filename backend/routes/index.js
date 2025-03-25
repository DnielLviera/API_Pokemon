const { Router } = require("express");
const router = Router();
const Pokemon = require("../../models/pokemon.model");

router.get("/", (req, res) => {
    res.send("Hola mundo desde la API para consultar Pokemon");
});

// Agregar Pokemon
router.post("/pokemon/agregar", async (req, res) => {
    const { id, name, types, sprite } = req.body;

    if (id && name && types && sprite) {
        try {
            const nuevoPokemon = new Pokemon(req.body);
            await nuevoPokemon.save();
            res.json({
                message: "Pokémon agregado correctamente",
                pokemon: nuevoPokemon,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Datos incompletos" });
    }
});

// Eliminar Pokemon
router.delete("/pokemon/delete/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre.toLowerCase();
        const pokemon = await Pokemon.findOneAndDelete({ name: nombre });
        
        if (pokemon) {
            res.send(`Pokémon ${nombre} eliminado correctamente`);
        } else {
            res.status(404).json({ error: "No se encontró el pokemon" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Actualizar Pokemon
router.put("/pokemon/update/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre.toLowerCase();
        const pokemonActualizado = await Pokemon.findOneAndUpdate(
            { name: nombre },
            req.body,
            { new: true }
        );
        
        if (pokemonActualizado) {
            res.json(pokemonActualizado);
        } else {
            res.status(404).json({ error: "No se encontró el pokemon" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mostrar todos los Pokemones en formato JSON
router.get("/pokemon", async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json({ pokemon: pokemons });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mostrar Pokemon especifico
router.get("/pokemon/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre.toLowerCase();
        const pokemon = await Pokemon.findOne({ name: nombre });
        
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({ error: "No se encontró el pokemon" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mostrar Pokemon especifico por id
router.get("/pokemon/id/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await Pokemon.findOne({ id: id });
        
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).json({ error: "No se encontró el pokemon" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
